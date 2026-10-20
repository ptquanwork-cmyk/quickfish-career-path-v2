import { BaseContract } from "@/contracts";
import { Fish } from "@/core/models/fish";

export interface SurveyResult extends BaseContract {
    fish_type: string;
    riasec_scores: {
        R: number;
        I: number;
        A: number;
        S: number;
        E: number;
        C: number;
    };
    ocean_scores: {
        // Nullable: results scored before 2026-09-06 may be missing traits.
        // Never coerce null to 0 — 0 is not a reachable score (the floor is 20).
        O: number | null;
        C: number | null;
        E: number | null;
        A: number | null;
        N: number | null;
    };
    job_zone_rec: {
        zone_3: string[];
        zone_4: string[];
        zone_5: string[];
    };
}

export interface JungTypologyData {
    type: string;
    primary_color: string;
    header_color: string;
    background_color: string;
    orientation_label_color: string;
    orientation_likelihood_label_color: string;
    orientation_very_likely_scale_color: string;
    orientation_somewhat_likely_scale_color: string;
    orientation_indicator_color: string;
    traits: string[];
    quote: string;
    most_compatible: Array<Fish>;
    least_compatible: Array<Fish>;
    fun_fact: {
        number: number;
        text: string;
    };
    fish: Fish;
    jobs: string[];
    quick_intro: string[];
    their_thoughts: string[];
}
