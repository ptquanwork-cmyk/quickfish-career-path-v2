export interface LatestSurvey {
    fish_type?: string;
    riasec_scores?: Record<string, number>;
    ocean_scores?: Record<string, number | null>;
    job_top_5?: string[];
    job_zone_rec?: { zone_3?: string[]; zone_4?: string[]; zone_5?: string[] };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name?: string;
    username?: string;
    email?: string;
    avatar?: string | null;
    latest_survey: LatestSurvey | null;
    [key: string]: unknown;
}
