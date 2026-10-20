import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { getCareerSummary } from '../src/features/career-dashboard/career-summary.ts';
import { getReportCareerRecommendations } from '../src/features/career-dashboard/report-recommendations.ts';

const data = JSON.parse(fs.readFileSync(new URL('../public/data/career-dashboard.v1.json', import.meta.url), 'utf8'));
test('every banner shows the sheet day_to_day text', () => {
    for (const career of data.careers) {
        for (const isVietnamese of [true, false]) assert.equal(getCareerSummary(career, isVietnamese), career.dayToDay, career.slug);
    }
});
test('no report means no invented recommended careers', () => {
    assert.deepEqual(getReportCareerRecommendations(data.careers, null), { careers: [], unmappedNames: [] });
});
test('report priority, deduplication and English/Vietnamese matching are preserved', () => {
    const [first, second, third] = data.careers;
    const result = getReportCareerRecommendations(data.careers, {
        job_top_5: [second.name.en.toUpperCase(), first.name.vi],
        job_zone_rec: { zone_5: [second.name.en, third.name.en], zone_4: [first.name.en], zone_3: [] },
    });
    assert.deepEqual(result.careers.map((career) => career.slug), [second.slug, first.slug, third.slug]);
    assert.deepEqual(result.unmappedNames, []);
});
test('report careers absent from dashboard remain visible as unavailable', () => {
    const result = getReportCareerRecommendations(data.careers, { job_top_5: ['Unmapped occupation'], job_zone_rec: {} });
    assert.equal(result.careers.length, 0);
    assert.deepEqual(result.unmappedNames, ['Unmapped occupation']);
});
test('report names from the survey catalogue reach their dashboard careers', () => {
    const slugs = new Set(data.careers.map((career) => career.slug));
    const result = getReportCareerRecommendations(data.careers, {
        job_top_5: ['Dentist', 'Nurse', 'Therapist', 'Health Safety Specialists', 'Pharmacists'], job_zone_rec: {},
    });
    assert.deepEqual(result.careers.map((career) => career.slug), [
        'dentists-and-associated-professions', 'nursing-professionals',
        'environmental-and-occupational-health-and-hygiene-professionals', 'pharmacists-and-associated-professions',
    ]);
    assert.deepEqual(result.unmappedNames, ['Therapist']);
    const source = fs.readFileSync(new URL('../src/features/career-dashboard/report-recommendations.ts', import.meta.url), 'utf8');
    for (const [, slug] of source.matchAll(/": "([a-z0-9-]+)",/g)) assert.ok(slugs.has(slug), slug);
});
