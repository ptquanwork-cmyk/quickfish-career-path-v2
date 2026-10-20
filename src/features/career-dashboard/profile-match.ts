import type { ProfileMatch, RiasecKey, RiasecScores } from "./types";

const keys: RiasecKey[] = ["R", "I", "A", "S", "E", "C"];

export function calculateProfileMatch(
    userScores?: Partial<Record<RiasecKey, number | null>> | null,
    careerScores?: RiasecScores | null,
): ProfileMatch {
    if (!userScores || !careerScores) {
        return { score: null, correlation: null, label: "unavailable", topSharedTraits: [] };
    }

    const user = keys.map((key) => Number(userScores[key]));
    const career = keys.map((key) => Number(careerScores[key]));
    if (user.some((value) => !Number.isFinite(value)) || career.some((value) => !Number.isFinite(value))) {
        return { score: null, correlation: null, label: "unavailable", topSharedTraits: [] };
    }

    const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
    const userMean = mean(user);
    const careerMean = mean(career);
    const numerator = user.reduce(
        (sum, value, index) => sum + (value - userMean) * (career[index] - careerMean),
        0,
    );
    const userDeviation = Math.sqrt(user.reduce((sum, value) => sum + (value - userMean) ** 2, 0));
    const careerDeviation = Math.sqrt(
        career.reduce((sum, value) => sum + (value - careerMean) ** 2, 0),
    );

    if (!userDeviation || !careerDeviation) {
        return { score: null, correlation: null, label: "unavailable", topSharedTraits: [] };
    }

    const correlation = Math.max(-1, Math.min(1, numerator / (userDeviation * careerDeviation)));
    const score = Math.round(((correlation + 1) / 2) * 100);
    const label = score >= 75 ? "strong" : score >= 60 ? "promising" : score >= 40 ? "explore" : "low";
    const topSharedTraits = keys
        .map((key, index) => ({ key, value: user[index] * career[index] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3)
        .map((item) => item.key);

    return { score, correlation, label, topSharedTraits };
}
