import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(
    fs.readFileSync(path.join(root, "public", "data", "career-dashboard.v1.json"), "utf8"),
);

// Counts from ALLJOBs_slim.xlsx (2026-10-18); the sheet has no "not-covered" careers.
const expectedTrends = {
    "top-growth": 17,
    "strong-growth": 16,
    growth: 49,
    stable: 41,
    decline: 9,
};

function profileScore(user, career) {
    const keys = ["R", "I", "A", "S", "E", "C"];
    const left = keys.map((key) => user[key]);
    const right = keys.map((key) => career[key]);
    const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
    const leftMean = mean(left);
    const rightMean = mean(right);
    const numerator = left.reduce(
        (sum, value, index) => sum + (value - leftMean) * (right[index] - rightMean),
        0,
    );
    const leftDeviation = Math.sqrt(
        left.reduce((sum, value) => sum + (value - leftMean) ** 2, 0),
    );
    const rightDeviation = Math.sqrt(
        right.reduce((sum, value) => sum + (value - rightMean) ** 2, 0),
    );
    if (!leftDeviation || !rightDeviation) return null;
    const correlation = Math.max(
        -1,
        Math.min(1, numerator / (leftDeviation * rightDeviation)),
    );
    return Math.round(((correlation + 1) / 2) * 100);
}

test("dashboard dataset preserves the reviewed source contract", () => {
    assert.equal(data.metadata.version, "2.0.0");
    assert.equal(data.careers.length, 132);
    assert.deepEqual(Object.keys(data).sort(), ["careers", "jobGroups", "majors", "metadata"]);
    assert.equal(new Set(data.careers.map((career) => career.slug)).size, 132);
    assert.equal(new Set(data.careers.map((career) => career.jobGroup)).size, 9);
});

test("trend totals match the ALLJOBs sheet", () => {
    const totals = Object.fromEntries(Object.keys(expectedTrends).map((key) => [key, 0]));
    for (const career of data.careers) totals[career.trend.status] += 1;
    assert.deepEqual(totals, expectedTrends);
    assert.equal(totals["top-growth"] + totals["strong-growth"], 33);
});

test("every career exposes bounded related-career links", () => {
    const slugs = new Set(data.careers.map((career) => career.slug));
    for (const career of data.careers) {
        assert.equal(career.similarCareerSlugs.length, 8, career.slug);
        assert.equal(new Set(career.similarCareerSlugs).size, 8, career.slug);
        assert.ok(!career.similarCareerSlugs.includes(career.slug), career.slug);
        for (const slug of career.similarCareerSlugs) assert.ok(slugs.has(slug), slug);
    }
});

test("required fields and honest unavailable states are present", () => {
    for (const career of data.careers) {
        assert.ok(career.name.en && career.name.vi, career.slug);
        assert.ok(career.riasec.code, career.slug);
        assert.equal("jobZone" in career, false, career.slug);
        assert.ok(career.salary.vietnam, career.slug);
        assert.ok(career.salary.unitedStates, career.slug);
        assert.ok(career.evidence.some((item) => item.section === "ALLJOBs"), career.slug);
        assert.ok(["attention", "unassessed"].includes(career.aiImpact.level), career.slug);
        assert.ok(career.aiImpact.summary, career.slug);
        assert.equal(typeof career.aiImpact.horizon, "string", career.slug);
    }
});

test("Pearson compatibility maps identical, inverse, and zero-variance vectors", () => {
    const ascending = { R: 0, I: 1, A: 2, S: 3, E: 4, C: 5 };
    const descending = { R: 5, I: 4, A: 3, S: 2, E: 1, C: 0 };
    const flat = { R: 3, I: 3, A: 3, S: 3, E: 3, C: 3 };
    assert.equal(profileScore(ascending, ascending), 100);
    assert.equal(profileScore(ascending, descending), 0);
    assert.equal(profileScore(flat, ascending), null);
});

test("career records carry nothing beyond the ALLJOBs sheet", () => {
    for (const career of data.careers) {
        assert.equal(career.description, null, career.slug);
        assert.equal(career.industrySignal, null, career.slug);
        assert.equal(career.minimumExperienceYears, null, career.slug);
        assert.equal(career.trend.globalNetGrowth, null, career.slug);
        assert.equal(career.trend.vietnamNetGrowth, null, career.slug);
        assert.ok(career.skillSignals.every((skill) => skill.growth === null && skill.source === "ALLJOBs"), career.slug);
        assert.ok(career.legacyStages.every((stage) => stage.description === null && stage.salaryUs === null && stage.outlook === null), career.slug);
        assert.ok(career.dayToDay, career.slug);
    }
});
