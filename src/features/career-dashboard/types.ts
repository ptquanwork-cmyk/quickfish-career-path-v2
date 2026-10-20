export type Provenance =
    | "md-reviewed"
    | "legacy-local"
    | "claude-draft"
    | "derived"
    | "unavailable";

export type RiasecKey = "R" | "I" | "A" | "S" | "E" | "C";
export type RiasecScores = Record<RiasecKey, number | null>;
export type TrendStatus =
    | "strong-growth"
    | "top-growth"
    | "growth"
    | "stable"
    | "decline"
    | "not-covered";

export interface EvidenceRef {
    section: string;
    label: string;
    provenance: Provenance;
}

export interface CareerTrend {
    rank: number | null;
    globalNetGrowth: number | null;
    wefMentions: number | null;
    vietnamNetGrowth: number | null;
    status: TrendStatus;
    sourceLabel: string;
    provenance: Provenance;
}

export interface CareerEducation {
    name: string;
    department: string | null;
    coreSubjects: string[];
    examBlocks: string[];
    provenance: Provenance;
}

export interface CareerStage {
    level: string;
    title: string;
    description: string | null;
    skills: string[];
    dayToDay: string | null;
    salaryUs: string | null;
    salaryVietnam: string | null;
    outlook: string | null;
    provenance: Provenance;
}

export interface SkillSignal {
    name: string;
    percent: number;
    /** "industry" = the source names this industry; "global" = all-industry share. */
    scope: "industry" | "global";
    source: string;
    /** Net increase in importance 2025–2030 (Hình 3.4), all industries. */
    growth: number | null;
}

export interface IndustrySignal {
    wefIndustries: string[];
    aiAdoption: { percent: number; label: string } | null;
    risingRoles: string[];
}

export interface CareerRecord {
    id: number;
    slug: string;
    name: { en: string; vi: string };
    jobGroup: string;
    minimumExperienceYears: number | null;
    riasec: { code: string; scores: RiasecScores };
    salary: { vietnam: string; unitedStates: string; provenance: Provenance };
    description: string | null;
    /** Skill demand for this career's industries, each row tagged with its scope. */
    skillSignals: SkillSignal[];
    industrySignal: IndustrySignal | null;
    majors: string[];
    /** Study departments from the sheet, per career (not per major). */
    departments: string[];
    education: CareerEducation[];
    careerPath: string[];
    skills: string[];
    dayToDay: string | null;
    legacyStages: CareerStage[];
    trend: CareerTrend;
    aiImpact: {
        level: "attention" | "unassessed";
        summary: string;
        horizon: string;
        provenance: Provenance;
    };
    sourceTier: Provenance;
    evidence: EvidenceRef[];
    similarCareerSlugs: string[];
}

export interface CareerDashboardData {
    metadata: {
        version: string;
        generatedAt: string;
        totalCareers: number;
        totalJobGroups: number;
        totalMajors: number;
        trendCounts: Record<string, number>;
    };
    jobGroups: string[];
    careers: CareerRecord[];
}

export interface ProfileMatch {
    score: number | null;
    correlation: number | null;
    label: "strong" | "promising" | "explore" | "low" | "unavailable";
    topSharedTraits: RiasecKey[];
}
