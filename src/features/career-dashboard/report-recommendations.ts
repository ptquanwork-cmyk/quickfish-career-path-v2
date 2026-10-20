import type { LatestSurvey } from "@/core/models/user";
import type { CareerRecord } from "./types";

function normalizeName(value: string): string {
    return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/gi, "d").toLowerCase().replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, " ").trim();
}

/**
 * Survey report job names (backend survey/mappings/prod_job_filtered.csv) that
 * name the same occupation as a dashboard career under a different label.
 * Only clear one-to-one equivalents; ambiguous names (Teacher, Therapist,
 * Scientists, Artist…) stay unmapped and show as unavailable.
 * ponytail: hand-kept crosswalk, 104 backend names; replace with slugs from the backend once the report uses the 132-career catalogue.
 */
const REPORT_NAME_ALIASES: Record<string, string> = {
    "account manager": "relationship-managers",
    "actuaries": "mathematicians-actuaries-and-statisticians",
    "mathematicians": "mathematicians-actuaries-and-statisticians",
    "statisticians": "mathematicians-actuaries-and-statisticians",
    "administrative services managers": "business-services-and-administration-managers",
    "sales agent": "sales-and-purchasing-agents-and-brokers",
    "purchasing agents": "sales-and-purchasing-agents-and-brokers",
    "architects": "architects-and-surveyors",
    "blockchain engineers": "blockchain-developers",
    "compliance managers": "compliance-officers",
    "construction managers": "manufacturing-mining-construction-and-distribution-managers",
    "counselors": "social-work-and-counselling-professionals",
    "cybersecurity": "information-security-analysts",
    "data scientists": "data-analysts-and-scientists",
    "database administrators": "database-and-network-professionals",
    "dentist": "dentists-and-associated-professions",
    "developer": "software-and-applications-developers",
    "software developers": "software-and-applications-developers",
    "doctors": "generalist-medical-practitioners",
    "physicians": "generalist-medical-practitioners",
    "surgeons": "specialist-medical-practitioners",
    "electrical engineer": "electrotechnology-engineers",
    "mechanical engineer": "mechanical-engineers",
    "computer systems engineers": "system-engineers",
    "event planner": "event-managers",
    "financial advisor": "financial-and-investment-advisers",
    "financial investment analysts": "financial-analysts",
    "health safety specialists": "environmental-and-occupational-health-and-hygiene-professionals",
    "hr analyst": "human-resources-specialists",
    "it associate": "ict-operations-and-user-support-technicians",
    "journalists": "media-and-communication-workers",
    "legal associate": "paralegals-and-legal-assistants",
    "legislators": "legislators-and-officials",
    "logistics analysts engineers": "supply-chain-and-logistics-specialists",
    "supply chain managers": "supply-chain-and-logistics-specialists",
    "nurse": "nursing-professionals",
    "operation manager": "general-and-operations-managers",
    "pharmacists": "pharmacists-and-associated-professions",
    "pilots": "commercial-pilots",
    "project manager": "project-managers",
    "psychologists": "psychologists-and-psychiatrists",
    "neuropsychologists": "psychologists-and-psychiatrists",
    "public relations managers": "advertising-and-public-relations-professionals",
    "real estate brokers": "real-estate-sales-agents",
    "risk management": "risk-management-specialists",
    "sociologists": "social-scientists-and-related-workers",
    "political scientists": "social-scientists-and-related-workers",
    "geographers": "social-scientists-and-related-workers",
    "editors": "writers-and-authors",
    "technical writers": "writers-and-authors",
    "uxui designer": "ui-and-ux-designers",
};

export function getReportCareerRecommendations(careers: CareerRecord[], survey: LatestSurvey | null) {
    if (!survey) return { careers: [] as CareerRecord[], unmappedNames: [] as string[] };
    const zones = survey.job_zone_rec;
    const names = [
        ...(survey.job_top_5 || []),
        ...(zones?.zone_5 || []),
        ...(zones?.zone_4 || []),
        ...(zones?.zone_3 || []),
    ];
    const byName = new Map<string, CareerRecord>();
    const bySlug = new Map(careers.map((career) => [career.slug, career]));
    careers.forEach((career) => {
        byName.set(normalizeName(career.name.en), career);
        byName.set(normalizeName(career.name.vi), career);
    });
    const seen = new Set<string>();
    const recommended: CareerRecord[] = [];
    const unmappedNames: string[] = [];
    names.forEach((name) => {
        const key = normalizeName(name);
        if (!key || seen.has(key)) return;
        seen.add(key);
        const career = byName.get(key) ?? bySlug.get(REPORT_NAME_ALIASES[key]);
        if (career) {
            if (!recommended.some((item) => item.slug === career.slug)) recommended.push(career);
        } else unmappedNames.push(name);
    });
    return { careers: recommended, unmappedNames };
}
