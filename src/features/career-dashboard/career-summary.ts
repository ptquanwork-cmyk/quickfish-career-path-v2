import type { CareerRecord } from "./types";

// Banner copy comes from the sheet's day_to_day column. The sheet has it in
// English only, so Vietnamese falls back to it rather than to invented text.
export function getCareerSummary(career: CareerRecord, isVietnamese: boolean): string {
    return career.dayToDay || (isVietnamese
        ? `Khám phá công việc, kỹ năng và lộ trình phát triển của nghề ${career.name.vi}.`
        : `Explore the work, skills and development pathways for ${career.name.en}.`);
}
