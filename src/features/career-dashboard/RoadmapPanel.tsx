"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Check, Clock3, GraduationCap, TrendingUp } from "lucide-react";
import type { CareerRecord } from "./types";

type Accent = { main: string; soft: string };

export interface RoadmapCopy {
    careerPath: string;
    noPath: string;
    milestone: string;
    yearsIn: string;
    now: string;
    salaryVn: string;
    salaryUs: string;
    skillsToBuild: string;
    dayToDay: string;
    outlook: string;
    youAreHere: string;
    notAvailable: string;
    level: string;
}

/**
 * Turns a career ladder into a milestone roadmap.
 *
 * `careerPath` always exists (5 rungs for most careers); `legacyStages` adds
 * description / skills / salary for the 13 careers that have it. The track
 * renders from `careerPath` so every career gets a roadmap, and the detail card
 * fills in from `legacyStages` when the source actually carries it.
 */
export default function RoadmapPanel({
    career,
    accent,
    copy,
    reducedMotion,
}: {
    career: CareerRecord;
    accent: Accent;
    copy: RoadmapCopy;
    reducedMotion: boolean;
}) {
    const milestones = useMemo(() => {
        const total = career.careerPath.length;
        // Spread the stated minimum experience across the rungs so each
        // milestone carries a rough "years in" marker instead of a bare index.
        const span = career.minimumExperienceYears ?? Math.max(2, total - 1);
        return career.careerPath.map((title, index) => {
            const legacy = career.legacyStages[index];
            return {
                index,
                title,
                level: legacy?.level ?? null,
                description: legacy?.description ?? null,
                skills: legacy?.skills?.filter((s) => s.length > 2 && s.length < 44) ?? [],
                dayToDay: legacy?.dayToDay ?? null,
                salaryVietnam: legacy?.salaryVietnam ?? null,
                salaryUs: legacy?.salaryUs ?? null,
                outlook: legacy?.outlook ?? null,
                year: total > 1 ? Math.round((span / (total - 1)) * index) : 0,
            };
        });
    }, [career]);

    // Year markers are spread over the stated experience; without it they would be invented.
    const hasYears = career.minimumExperienceYears !== null;
    const [selected, setSelected] = useState(0);
    useEffect(() => setSelected(0), [career.slug]);

    if (!milestones.length) return <p className="qf-empty">{copy.noPath}</p>;

    const active = milestones[Math.min(selected, milestones.length - 1)];
    const progress = milestones.length > 1 ? (selected / (milestones.length - 1)) * 100 : 0;

    return (
        <section className="qf-roadmap">
            <div className="qf-roadmap-head">
                <p className="qf-tile-title">{copy.careerPath}</p>
                {hasYears ? (
                    <span className="qf-roadmap-legend">
                        <Clock3 className="h-3 w-3" />
                        {copy.yearsIn}
                    </span>
                ) : null}
            </div>

            <div className="qf-roadmap-track" role="tablist" aria-label={copy.careerPath}>
                <span className="qf-roadmap-rail" aria-hidden="true" />
                <motion.span
                    className="qf-roadmap-rail-fill"
                    style={{ background: accent.main }}
                    initial={reducedMotion ? false : { width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden="true"
                />
                {milestones.map((stone) => {
                    const isActive = stone.index === selected;
                    const isDone = stone.index < selected;
                    return (
                        <button
                            key={`${stone.title}-${stone.index}`}
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setSelected(stone.index)}
                            className={`qf-roadmap-node ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
                            style={isActive || isDone ? { ["--node" as string]: accent.main } : undefined}
                        >
                            <span className="qf-roadmap-dot">
                                {isDone ? <Check className="h-3 w-3" /> : stone.index + 1}
                            </span>
                            <span className="qf-roadmap-year">
                                {stone.index === 0 ? copy.now : hasYears ? `~${stone.year}${copy.yearsIn.slice(0, 1).toLowerCase() === "n" ? "n" : "y"}` : " "}
                            </span>
                            <span className="qf-roadmap-title">{stone.title}</span>
                            {stone.level ? <span className="qf-roadmap-level">{stone.level}</span> : null}
                        </button>
                    );
                })}
            </div>

            <motion.div
                key={`${career.slug}-${active.index}`}
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.22 }}
                className="qf-roadmap-detail"
            >
                <div className="qf-roadmap-detail-main">
                    <p className="qf-roadmap-step">
                        {copy.milestone} {active.index + 1}/{milestones.length}
                        {active.index === 0 ? <b style={{ background: `${accent.main}22`, color: accent.main }}>{copy.youAreHere}</b> : null}
                    </p>
                    <p className="qf-roadmap-detail-title">{active.title}</p>
                    {active.description ? <p className="qf-body-sm qf-roadmap-desc">{active.description}</p> : null}
                    {active.skills.length ? (
                        <>
                            <p className="qf-overline qf-roadmap-sub">{copy.skillsToBuild}</p>
                            <div className="qf-roadmap-skills">
                                {active.skills.slice(0, 6).map((skill) => (
                                    <span key={skill} className="qf-chip qf-chip--sm">{skill}</span>
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>

                <div className="qf-roadmap-stats">
                    <div className="qf-roadmap-stat">
                        <span><Briefcase className="h-3 w-3" />{copy.salaryVn}</span>
                        <b>{active.salaryVietnam ?? career.salary.vietnam ?? copy.notAvailable}</b>
                    </div>
                    <div className="qf-roadmap-stat">
                        <span><GraduationCap className="h-3 w-3" />{copy.salaryUs}</span>
                        <b>{active.salaryUs ?? career.salary.unitedStates ?? copy.notAvailable}</b>
                    </div>
                    <div className="qf-roadmap-stat">
                        <span><TrendingUp className="h-3 w-3" />{copy.outlook}</span>
                        <b>{active.outlook ?? copy.notAvailable}</b>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
