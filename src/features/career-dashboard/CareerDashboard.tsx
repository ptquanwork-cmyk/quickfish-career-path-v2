"use client";

import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useAuthActions, useUser } from "@/core/providers/AuthProvider";
import useAuthDialogStore from "@/core/stores/auth-dialog-store";
import { getJungTypologyData } from "@/components/survey/utils/jung-typology-mapping-utils";
import { Link } from "@/i18n/routing";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    AlertTriangle,
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    Bell,
    Bookmark,
    Briefcase,
    Building2,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    CircleHelp,
    Clock3,
    Compass,
    Database,
    FlaskConical,
    Globe2,
    GraduationCap,
    Heart,
    HeartPulse,
    Info,
    Landmark,
    Palette,
    Plane,
    Search,
    Share2,
    Sparkles,
    Target,
    TrendingDown,
    TrendingUp,
    Users,
    X,
    type LucideIcon,
} from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Cell,
    LabelList,
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip as ChartTooltip,
    XAxis,
    YAxis,
} from "recharts";
import { careerChartPalette, careerDashboardCssVariables, careerMotion } from "./design/theme";
import { defaultCoralVars, getFishTheme } from "./design/fish-theme";
import MobileCareerDeck, { careerCover } from "./MobileCareerDeck";
import { ALL_FISH } from "./FishSwitcher";
import DetailReportedRepository from "@/components/survey-history/repositories/detail-reported";
import RoadmapPanel from "./RoadmapPanel";
import ZoomTile from "./ZoomTile";
import { calculateProfileMatch } from "./profile-match";
import { getCareerSummary } from "./career-summary";
import { getReportCareerRecommendations } from "./report-recommendations";
import { savedCareersRepository } from "./saved-careers-repository";
import type { CareerDashboardData, CareerRecord, ProfileMatch, Provenance, RiasecKey, TrendStatus } from "./types";
import "./career-dashboard.css";
import "./career-deck.css";
import "./career-versions.css";

type TabKey = "overview" | "skills" | "market" | "education" | "path";
type SortKey = "popular" | "growth" | "az" | "fit";

const UI = {
    en: {
        product: "Career Intelligence",
        careers: "careers",
        horizon: "WEF 2025–2030",
        greeting: "Hi there,",
        heroTitle: "Your QuickFish profile",
        heroSubtitle: "Explore your potential, find the right career, swim further with us.",
        completion: "Profile completion",
        completionHint: "Add more to get sharper recommendations!",
        bubble: "Good careers brighter tomorrows!",
        quote: "“Different fish brighter futures.”",
        takeTest: "Take the test",
        exploreFish: "Discover your fish type",
        openReport: "Open your report",
        yourFish: "Your fish type",
        tabOverview: "Overview",
        tabSkills: "Skills",
        tabMarket: "Market",
        tabAi: "AI & future",
        tabEducation: "Majors",
        tabPath: "Pathway",
        detailMarket: "Job opportunities",
        detailEducation: "Related majors",
        detailPath: "Growth pathway",
        salary: "Starting salary",
        salaryRef: "Reference salary",
        low: "Low",
        mid: "Median",
        high: "High",
        vsFiveYears: "vs. five years ago",
        globalOutlook: "Career outlook",
        noForecast: "No forecast",
        wefRank: "Popularity rank / 132",
        countryContext: "Country context",
        topSkill: "Most-wanted skill",
        ofEmployers: "of employers",
        departments: "Study departments",
        similarCareers: "Similar careers",
        structuralChurn: "Structural churn",
        aiExposure: "AI exposure",
        profileFit: "Profile fit",
        fitHigh: "Strong fit",
        fitMedium: "Promising fit",
        fitExplore: "Worth exploring",
        fitLow: "Lower fit",
        fitSkills: "Skills",
        fitExperience: "Experience",
        fitInterest: "Interest",
        fitValues: "Values",
        fitNoteHeading: "How this is derived",
        fitNoteBody:
            "Interest is your RIASEC correlation with this career. Skills, Experience and Values are views of the same alignment. Not a prediction of success.",
        unlockFit: "Take the test to unlock your personal fit.",
        search: "Search {n} careers",
        allGroups: "All job groups",
        allRiasec: "All RIASEC",
        allTrends: "All trends",
        sortPopular: "Sort: Popular",
        sortGrowth: "Sort: Growth",
        sortAz: "Sort: A–Z",
        sortFit: "Sort: Best fit",
        noResults: "No careers match these filters.",
        clearFilters: "Clear filters",
        save: "Save career",
        saved: "Saved",
        share: "Share",
        shareCopied: "Link copied",
        mascotNote: "Small steps\nBig careers",
        riasec: "RIASEC",
        jobGroup: "Career family",
        experience: "Min. experience",
        years: "yrs",
        aiImpact: "AI impact",
        veryHigh: "Very high",
        highLevel: "High",
        moderate: "Moderate",
        demand: "Talent demand (Viet Nam)",
        careerTrend: "Career trend",
        vsPeriod: "vs. the 2020–2025 period",
        keySkills: "Key skills",
        keySkillsNote: "Share of employers rating each skill",
        careerRadar: "Career RIASEC profile",
        yourRadar: "Your report",
        notAvailable: "Not available",
        occupationSkills: "Occupation-specific skills",
        noSkills: "The source has no validated occupation-specific skills for this career.",
        dayToDay: "Day-to-day work",
        trendRank: "Popularity rank",
        globalNet: "Global net growth",
        vietnamNet: "Viet Nam net growth",
        mentions: "WEF mentions",
        skillsChanging: "Skills changing",
        macrotrend: "Leading macrotrend",
        criticalCareer: "Leading transformation role",
        humanMachine: "Human–technology task shift",
        now: "Now",
        by2030: "2030",
        humanLed: "Human-led",
        technologyLed: "Technology-led",
        aiAssessment: "Occupation AI assessment",
        aiUnavailable:
            "No validated occupation-level AI exposure score is available in the source; this shows the selected economy's exposure.",
        majors: "Related majors",
        coreSubjects: "Core subjects",
        noEducation: "No mapped major or admissions block is available.",
        careerPath: "Career progression",
        noPath: "No validated career ladder is available.",
        recommended: "Recommended by your report",
        loading: "Building your career intelligence view…",
        error: "Career data could not be loaded.",
        retry: "Try again",
        reviewed: "Reviewed source",
        localSrc: "Local supplement",
        draft: "Needs review",
        derived: "Derived",
        unavailable: "Unavailable",
        sourceLanguage: "Source text · English",
        signIn: "Sign in",
        signInToSave: "Sign in to save careers",
        compareEconomies: "Structural churn across economies",
        clickToSwitch: "Click a bar to switch economy",
        examBlock: "Admissions block",
        majorsCount: "majors",
        completionCta: "See what is missing",
        milestone: "Milestone",
        salaryVn: "Salary · VN",
        salaryUsLabel: "Salary · US",
        skillsToBuild: "Skills to build here",
        outlook: "Outlook",
        youAreHere: "start here",
        level: "Level",
        fitFlat: "Your RIASEC scores came out even, so there is no pattern to match against yet.",
        retake: "Retake the test",
        zoom: "Zoom in",
        moreSkills: "more skills",
        aiIndustryScope: "AI adoption in this career's industry",
        aiEconomyScope: "AI exposure for the selected economy",
    },
    vi: {
        product: "Career Intelligence",
        careers: "nghề",
        horizon: "WEF 2025–2030",
        greeting: "Xin chào,",
        heroTitle: "Hồ sơ QuickFish của bạn",
        heroSubtitle: "Khám phá tiềm năng, tìm đúng nghề, cùng bạn bơi xa hơn.",
        completion: "Hoàn thiện hồ sơ",
        completionHint: "Bổ sung thêm để nhận gợi ý chính xác hơn!",
        bubble: "Good careers brighter tomorrows!",
        quote: "“Different fish brighter futures.”",
        takeTest: "Làm bài test",
        exploreFish: "Khám phá fish type của bạn",
        openReport: "Mở báo cáo của bạn",
        yourFish: "Fish type",
        tabOverview: "Tổng quan",
        tabSkills: "Kỹ năng",
        tabMarket: "Thị trường",
        tabAi: "AI & tương lai",
        tabEducation: "Ngành học",
        tabPath: "Lộ trình",
        detailMarket: "Cơ hội việc làm",
        detailEducation: "Ngành học liên quan",
        detailPath: "Lộ trình phát triển",
        salary: "Lương khởi điểm",
        salaryRef: "Mức lương tham khảo",
        low: "Thấp",
        mid: "Trung bình",
        high: "Cao",
        vsFiveYears: "so với 5 năm trước",
        globalOutlook: "Xu hướng nghề",
        noForecast: "Chưa có dự báo",
        wefRank: "Hạng phổ biến / 132",
        countryContext: "Bối cảnh quốc gia",
        topSkill: "Kỹ năng được cần nhất",
        ofEmployers: "nhà tuyển dụng",
        departments: "Khối ngành đào tạo",
        similarCareers: "Nghề tương tự",
        structuralChurn: "Dịch chuyển cơ cấu",
        aiExposure: "Mức độ ảnh hưởng AI",
        profileFit: "Độ hợp hồ sơ",
        fitHigh: "Phù hợp cao",
        fitMedium: "Khá phù hợp",
        fitExplore: "Đáng khám phá",
        fitLow: "Ít phù hợp",
        fitSkills: "Kỹ năng",
        fitExperience: "Kinh nghiệm",
        fitInterest: "Sở thích",
        fitValues: "Giá trị cá nhân",
        fitNoteHeading: "Cách tính",
        fitNoteBody:
            "Sở thích là độ tương quan RIASEC của bạn với nghề này. Kỹ năng, Kinh nghiệm và Giá trị là các góc nhìn của cùng mức tương quan này. Đây không phải dự đoán thành công.",
        unlockFit: "Làm bài test để mở khóa độ hợp cá nhân.",
        search: "Tìm trong {n} nghề",
        allGroups: "Tất cả nhóm nghề",
        allRiasec: "Tất cả RIASEC",
        allTrends: "Tất cả xu hướng",
        sortPopular: "Sắp xếp: Phổ biến",
        sortGrowth: "Sắp xếp: Tăng trưởng",
        sortAz: "Sắp xếp: A–Z",
        sortFit: "Sắp xếp: Hợp nhất",
        noResults: "Không có nghề phù hợp với bộ lọc.",
        clearFilters: "Xóa bộ lọc",
        save: "Lưu nghề",
        saved: "Đã lưu",
        share: "Chia sẻ",
        shareCopied: "Đã sao chép link",
        mascotNote: "Small steps\nBig careers",
        riasec: "RIASEC",
        jobGroup: "Nhóm nghề",
        experience: "Kinh nghiệm tối thiểu",
        years: "năm",
        aiImpact: "Mức độ ảnh hưởng AI",
        veryHigh: "Rất cao",
        highLevel: "Cao",
        moderate: "Trung bình",
        demand: "Nhu cầu nhân lực (Việt Nam)",
        careerTrend: "Xu hướng nghề",
        vsPeriod: "so với giai đoạn 2020–2025",
        keySkills: "Kỹ năng quan trọng",
        keySkillsNote: "Tỷ lệ nhà tuyển dụng đánh giá kỹ năng",
        careerRadar: "Hồ sơ RIASEC của nghề",
        yourRadar: "Báo cáo của bạn",
        notAvailable: "Chưa có dữ liệu",
        occupationSkills: "Kỹ năng riêng của nghề",
        noSkills: "Nguồn chưa có bộ kỹ năng riêng đã kiểm chứng cho nghề này.",
        dayToDay: "Công việc hằng ngày",
        trendRank: "Hạng phổ biến",
        globalNet: "Tăng trưởng ròng toàn cầu",
        vietnamNet: "Tăng trưởng ròng Việt Nam",
        mentions: "Hồ sơ WEF nhắc đến",
        skillsChanging: "Kỹ năng thay đổi",
        macrotrend: "Xu hướng vĩ mô chính",
        criticalCareer: "Nghề chuyển đổi nổi bật",
        humanMachine: "Dịch chuyển nhiệm vụ người–máy",
        now: "Hiện tại",
        by2030: "2030",
        humanLed: "Người làm chính",
        technologyLed: "Công nghệ làm chính",
        aiAssessment: "Đánh giá AI theo nghề",
        aiUnavailable: "Nguồn chưa có điểm AI exposure ở cấp nghề; đây là mức của nền kinh tế đang chọn.",
        majors: "Ngành học liên quan",
        coreSubjects: "Môn cốt lõi",
        noEducation: "Chưa có ngành học hoặc khối xét tuyển được ánh xạ.",
        careerPath: "Tiến trình nghề nghiệp",
        noPath: "Chưa có lộ trình nghề nghiệp đã kiểm chứng.",
        recommended: "Báo cáo của bạn gợi ý",
        loading: "Đang dựng bản phân tích nghề nghiệp…",
        error: "Không thể tải dữ liệu nghề nghiệp.",
        retry: "Thử lại",
        reviewed: "Nguồn đã duyệt",
        localSrc: "Dữ liệu local bổ sung",
        draft: "Cần kiểm duyệt",
        derived: "Dữ liệu suy ra",
        unavailable: "Chưa có",
        sourceLanguage: "Nội dung nguồn · Tiếng Anh",
        signIn: "Đăng nhập",
        signInToSave: "Đăng nhập để lưu nghề",
        compareEconomies: "Dịch chuyển cơ cấu giữa các nền kinh tế",
        clickToSwitch: "Bấm vào cột để đổi nền kinh tế",
        examBlock: "Khối xét tuyển",
        majorsCount: "ngành",
        completionCta: "Xem còn thiếu gì",
        milestone: "Cột mốc",
        salaryVn: "Lương · VN",
        salaryUsLabel: "Lương · US",
        skillsToBuild: "Kỹ năng cần xây ở bậc này",
        outlook: "Triển vọng",
        youAreHere: "bắt đầu ở đây",
        level: "Cấp độ",
        fitFlat: "Điểm RIASEC của bạn đồng đều nên chưa có khuôn mẫu để so khớp.",
        retake: "Làm lại bài test",
        zoom: "Phóng to",
        moreSkills: "kỹ năng khác",
        aiIndustryScope: "Mức áp dụng AI trong ngành của nghề này",
        aiEconomyScope: "Mức ảnh hưởng AI của nền kinh tế đang chọn",
    },
} as const;

type UiText = { [Key in keyof (typeof UI)["en"]]: string };

const riasecLabels: Record<RiasecKey, { en: string; vi: string }> = {
    R: { en: "Realistic", vi: "Thực tế" },
    I: { en: "Investigative", vi: "Nghiên cứu" },
    A: { en: "Artistic", vi: "Sáng tạo" },
    S: { en: "Social", vi: "Xã hội" },
    E: { en: "Enterprising", vi: "Lãnh đạo" },
    C: { en: "Conventional", vi: "Quy trình" },
};

const trendConfig: Record<TrendStatus, { color: string; icon: LucideIcon; en: string; vi: string }> = {
    "strong-growth": { color: "#3FA45B", icon: TrendingUp, en: "Strong growth", vi: "Tăng mạnh" },
    "top-growth": { color: "#3FA45B", icon: TrendingUp, en: "Top growth", vi: "Top tăng" },
    growth: { color: "#3B93C4", icon: TrendingUp, en: "Growing", vi: "Đang tăng" },
    stable: { color: "#E09B1E", icon: BarChart3, en: "Stable", vi: "Ổn định" },
    decline: { color: "#D0564B", icon: TrendingDown, en: "Declining", vi: "Đang giảm" },
    "not-covered": { color: "#98A2B3", icon: CircleHelp, en: "Not covered", vi: "Chưa có dự báo" },
};

const tabKeys: TabKey[] = ["overview", "skills", "market", "education", "path"];
const riasecOrder: RiasecKey[] = ["R", "I", "A", "S", "E", "C"];
const ORANGE = "#F5A524";
const AMBER = "#FBBF24";
const GREEN = "#3FA45B";
const BLUE = "#3B93C4";

/** Chart ink. `main`/`soft` follow the user's fish; GREEN/BLUE stay semantic. */
type Accent = { main: string; soft: string };
const DEFAULT_ACCENT: Accent = { main: ORANGE, soft: AMBER };
type Density = "roomy" | "normal" | "tight" | "compact";

function careerName(career: CareerRecord, isVietnamese: boolean) {
    return isVietnamese ? career.name.vi || career.name.en : career.name.en;
}

function groupIcon(group: string): LucideIcon {
    if (group.includes("Technology")) return Database;
    if (group.includes("Healthcare")) return HeartPulse;
    if (group.includes("Arts")) return Palette;
    if (group.includes("Law")) return Landmark;
    if (group.includes("Science")) return FlaskConical;
    if (group.includes("Social")) return Users;
    if (group.includes("Transportation")) return Plane;
    if (group.includes("Green")) return Globe2;
    return Building2;
}

function formatPercent(value: number | null, fallback: string) {
    if (value === null || value === undefined) return fallback;
    return `${value > 0 ? "+" : ""}${value}%`;
}

/** "12–20 million VND/month" → low/mid/high labels for the range bar. */
function parseSalaryRange(text: string | null | undefined) {
    if (!text) return null;
    const numbers = text.match(/[\d.,]+/g)?.map((value) => Number(value.replace(/,/g, ""))) ?? [];
    if (numbers.length < 2) return null;
    const [low, high] = numbers;
    if (!Number.isFinite(low) || !Number.isFinite(high) || high <= low) return null;
    const mid = (low + high) / 2;
    const compact = (value: number) => `${Math.round(value * 10) / 10}M`;
    return { midValue: Math.round(mid * 10) / 10, lowLabel: compact(low), midLabel: compact(mid), highLabel: compact(high) };
}

function provenanceLabel(provenance: Provenance, t: UiText) {
    if (provenance === "md-reviewed") return t.reviewed;
    if (provenance === "legacy-local") return t.localSrc;
    if (provenance === "claude-draft") return t.draft;
    if (provenance === "derived") return t.derived;
    return t.unavailable;
}

function ProvenanceBadge({ provenance, t }: { provenance: Provenance; t: UiText }) {
    const tone =
        provenance === "md-reviewed"
            ? "qf-badge--success"
            : provenance === "claude-draft"
              ? "qf-badge--warning"
              : provenance === "unavailable"
                ? "qf-badge--muted"
                : "qf-badge--info";
    return (
        <span className={`qf-badge ${tone}`}>
            {provenance === "md-reviewed" ? <CheckCircle2 className="h-3 w-3" /> : <CircleHelp className="h-3 w-3" />}
            {provenanceLabel(provenance, t)}
        </span>
    );
}

function TrendBadge({ status, isVietnamese }: { status: TrendStatus; isVietnamese: boolean }) {
    const config = trendConfig[status];
    const Icon = config.icon;
    return (
        <span className="qf-trend" style={{ color: config.color, backgroundColor: `${config.color}1F` }}>
            <Icon className="h-3.5 w-3.5" />
            {isVietnamese ? config.vi : config.en}
        </span>
    );
}

function MeterRow({ label, value, color, icon, hint }: { label: string; value: number; color: string; icon?: boolean; hint?: string }) {
    const percent = Math.max(0, Math.min(100, value));
    return (
        <div className="qf-meter">
            <span className="qf-meter-label" title={hint}>
                {icon ? <Sparkles className="h-3 w-3 shrink-0" style={{ color }} /> : null}
                <span>{label}</span>
            </span>
            <span className="qf-meter-track">
                <span className="qf-meter-fill" style={{ ["--qf-meter-offset" as string]: `-${100 - percent}%`, background: color }} />
            </span>
            <span className="qf-meter-value">{Math.round(value)}%</span>
        </div>
    );
}

const chartTooltipStyle = {
    borderRadius: 10,
    border: 0,
    background: careerChartPalette.tooltip.bg,
    color: careerChartPalette.tooltip.fg,
    fontSize: 11,
    padding: "6px 10px",
} as const;

/* ─────────────────────────── Detail tab panels ─────────────────────────── */

function OverviewPanel({
    career,
    data,
    profileMatch,
    userScores,
    accent,
    density,
    t,
    isVietnamese,
    reducedMotion,
}: {
    career: CareerRecord;
    data: CareerDashboardData;
    profileMatch: ProfileMatch;
    userScores?: Record<string, number>;
    accent: Accent;
    density: Density;
    t: UiText;
    isVietnamese: boolean;
    reducedMotion: boolean;
}) {
    const salary = parseSalaryRange(career.salary.vietnam);
    const hasUser = Boolean(userScores) && profileMatch.score !== null;
    const demand = career.trend.vietnamNetGrowth ?? career.trend.globalNetGrowth;
    // WEF publishes skills and AI adoption per industry, so say which industry.
    const industries = career.industrySignal?.wefIndustries ?? [];
    const industryLabel = industries.length ? industries.slice(0, 2).join(" · ") : t.keySkillsNote;

    const demandSeries = [2020, 2021, 2022, 2023, 2024, 2025].map((year, index) => ({
        year: String(year),
        value: Number((100 + ((demand ?? 0) / 5) * index).toFixed(1)),
    }));

    const radarData = riasecOrder.map((key) => ({
        trait: key,
        career: Math.max(0, Math.min(100, ((Number(career.riasec.scores[key]) || 0) / 7) * 100)),
        user: Math.max(0, Math.min(100, ((Number(userScores?.[key]) || 0) / 5) * 100)),
    }));

    const allSkills = career.skillSignals;
    // Row count follows the measured room, so nothing is ever clipped. The
    // remainder is counted under the list and shown in full when zoomed.
    const skillRows = density === "roomy" ? 4 : density === "normal" ? 3 : 2;
    const skills = allSkills.slice(0, skillRows);
    const hiddenSkills = allSkills.length - skills.length;
    const skillColors = [accent.main, accent.main, accent.soft, accent.soft, accent.soft];

    const fitNote =
        hasUser && profileMatch.topSharedTraits.length
            ? isVietnamese
                ? `Phù hợp với hồ sơ của bạn ở nhóm ${profileMatch.topSharedTraits.map((key) => riasecLabels[key].vi).join(", ")} — đây là những đặc điểm bạn và nghề này cùng mạnh.`
                : `Aligns with your report on ${profileMatch.topSharedTraits.map((key) => riasecLabels[key].en).join(", ")} — the traits you and this career share.`
            : career.description || career.dayToDay || t.notAvailable;

    return (
        <div className="qf-bento">
            <ZoomTile className="qf-tile--salary" label={t.salaryRef} zoomLabel={t.zoom}>
                <p className="qf-tile-title">{t.salaryRef}</p>
                <p className="qf-figure-sm mt-1.5">{career.salary.vietnam}</p>
                <p className="qf-caption mt-0.5">US {career.salary.unitedStates}</p>
                {salary ? (
                    <>
                        <div className="qf-range-bar mt-3" aria-hidden="true" />
                        <div className="qf-range-ticks">
                            <span>
                                <b>{t.low}</b>
                                {salary.lowLabel}
                            </span>
                            <span>
                                <b>{t.mid}</b>
                                {salary.midLabel}
                            </span>
                            <span>
                                <b>{t.high}</b>
                                {salary.highLabel}
                            </span>
                        </div>
                    </>
                ) : null}
            </ZoomTile>
            <section className="qf-tile qf-tile--stat">
                <p className="qf-tile-title">
                    <Compass className="h-3.5 w-3.5" />
                    {t.riasec}
                </p>
                <p className="qf-figure-sm mt-2">{career.riasec.code || "—"}</p>
                <p className="qf-caption">
                    (
                    {career.riasec.code
                        ? career.riasec.code
                              .split("")
                              .map((key) => (isVietnamese ? riasecLabels[key as RiasecKey]?.vi : riasecLabels[key as RiasecKey]?.en))
                              .filter(Boolean)
                              .join(" - ")
                        : t.notAvailable}
                    )
                </p>
            </section>
            <section className="qf-tile qf-tile--stat">
                <p className="qf-tile-title">
                    <Target className="h-3.5 w-3.5" />
                    {t.jobGroup}
                </p>
                <p className="qf-figure-sm mt-2 qf-clamp-2">{career.jobGroup}</p>
            </section>
            {career.minimumExperienceYears !== null ? (
                <section className="qf-tile qf-tile--stat">
                    <p className="qf-tile-title">
                        <Clock3 className="h-3.5 w-3.5" />
                        {t.experience}
                    </p>
                    <p className="qf-figure-sm mt-2">
                        {career.minimumExperienceYears} {t.years}
                    </p>
                </section>
            ) : (
                // The sheet has no experience years; its popularity rank fills the slot.
                <section className="qf-tile qf-tile--stat">
                    <p className="qf-tile-title">
                        <BarChart3 className="h-3.5 w-3.5" />
                        {t.trendRank}
                    </p>
                    <p className="qf-figure-sm mt-2">{career.trend.rank ? `#${career.trend.rank}` : "—"}</p>
                    <p className="qf-caption">/ {data.metadata.totalCareers}</p>
                </section>
            )}
            <section className="qf-tile qf-tile--ai">
                <p className="qf-tile-title">
                    <Building2 className="h-3.5 w-3.5" />
                    {t.departments}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {career.departments.length ? (
                        career.departments.map((department) => (
                            <span key={department} className="qf-chip qf-chip--sm">
                                {department}
                            </span>
                        ))
                    ) : (
                        <span className="qf-caption">{t.notAvailable}</span>
                    )}
                </div>
            </section>
            <ZoomTile className="qf-tile--demand" label={t.demand} zoomLabel={t.zoom}>
                <p className="qf-tile-title">{demand === null ? t.careerTrend : t.demand}</p>
                {demand === null ? (
                    <div className="my-auto text-center">
                        <TrendBadge status={career.trend.status} isVietnamese={isVietnamese} />
                    </div>
                ) : (
                    <>
                        <p className="qf-delta mt-1">
                            <TrendingUp className="h-4 w-4" />
                            {formatPercent(demand, "—")}
                        </p>
                        <p className="qf-caption">{t.vsPeriod}</p>
                        <div className="qf-mini-chart">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={demandSeries} margin={{ top: 6, right: 16, bottom: 0, left: 16 }}>
                                    <defs>
                                        <linearGradient id="qf-demand" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={GREEN} stopOpacity={0.26} />
                                            <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="year"
                                        tick={{ fill: "#98A2B3", fontSize: 9 }}
                                        axisLine={false}
                                        tickLine={false}
                                        interval={0}
                                        padding={{ left: 8, right: 8 }}
                                    />
                                    <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                                    <ChartTooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value}`, "index"]} />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={GREEN}
                                        strokeWidth={2}
                                        fill="url(#qf-demand)"
                                        dot={{ r: 2.5, fill: "#FFFFFF", stroke: GREEN, strokeWidth: 2 }}
                                        isAnimationActive={!reducedMotion}
                                        animationDuration={700}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
            </ZoomTile>
            <ZoomTile className="qf-tile--skills" label={t.keySkills} zoomLabel={t.zoom}>
                <p className="qf-tile-title">{t.keySkills}</p>
                <p className="qf-caption">{industryLabel}</p>
                <div className="qf-meter-list mt-2">
                    {skills.map((skill, index) => (
                        <MeterRow
                            key={skill.name}
                            label={skill.name}
                            value={skill.percent}
                            color={skillColors[index] || AMBER}
                            hint={skill.source}
                        />
                    ))}
                    <div className="qf-zoom-only">
                        {allSkills.slice(skills.length).map((skill, index) => (
                            <MeterRow
                                key={skill.name}
                                label={skill.name}
                                value={skill.percent}
                                color={skillColors[(index + skills.length) % skillColors.length] || AMBER}
                                hint={skill.source}
                            />
                        ))}
                    </div>
                </div>
                {hiddenSkills > 0 ? (
                    <p className="qf-more qf-hide-on-zoom">
                        +{hiddenSkills} {t.moreSkills}
                    </p>
                ) : null}
            </ZoomTile>
            <ZoomTile className="qf-tile--radar" label={t.careerRadar} zoomLabel={t.zoom}>
                <p className="qf-tile-title">{t.careerRadar}</p>
                {hasUser ? (
                    <span className="qf-legend">
                        <i style={{ background: accent.main }} />
                        {t.riasec}
                        <i style={{ background: BLUE }} />
                        {t.yourRadar}
                    </span>
                ) : null}
                <div className="qf-radar">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData} outerRadius="52%" margin={{ top: 14, right: 16, bottom: 16, left: 16 }}>
                            <PolarGrid stroke="#EDE4D5" />
                            <PolarAngleAxis dataKey="trait" tick={{ fill: "#64748B", fontSize: 10, fontWeight: 700 }} />
                            <Radar
                                name={t.careerRadar}
                                dataKey="career"
                                stroke={accent.main}
                                strokeWidth={2}
                                fill={accent.main}
                                fillOpacity={0.25}
                                isAnimationActive={!reducedMotion}
                                animationDuration={700}
                            />
                            {hasUser ? (
                                <Radar
                                    name={t.yourRadar}
                                    dataKey="user"
                                    stroke={BLUE}
                                    strokeWidth={2}
                                    fill={BLUE}
                                    fillOpacity={0.14}
                                    isAnimationActive={!reducedMotion}
                                    animationDuration={700}
                                />
                            ) : null}
                            <ChartTooltip formatter={(value: number) => `${Math.round(value)}/100`} contentStyle={chartTooltipStyle} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </ZoomTile>
            <ZoomTile className="qf-tile--note" label={t.careerRadar} zoomLabel={t.zoom}>
                <p className="qf-note-text">{fitNote}</p>
                {isVietnamese && !hasUser && (career.description || career.dayToDay) ? (
                    <p className="qf-caption mt-2">{t.sourceLanguage}</p>
                ) : null}
            </ZoomTile>
        </div>
    );
}

function SkillsPanel({ career, accent, reducedMotion, t }: { career: CareerRecord; accent: Accent; reducedMotion: boolean; t: UiText }) {
    const skillBars = career.skillSignals.slice(0, 7);
    const industries = career.industrySignal?.wefIndustries ?? [];
    return (
        <div className="qf-split">
            <section className="qf-tile">
                <div className="qf-tile-head">
                    <p className="qf-tile-title">{t.occupationSkills}</p>
                    <ProvenanceBadge provenance={career.skills.length ? "md-reviewed" : "unavailable"} t={t} />
                </div>
                {career.skills.length ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {career.skills.map((skill) => (
                            <span key={skill} className="qf-chip">
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="qf-empty mt-2">{t.noSkills}</p>
                )}
                {career.dayToDay ? (
                    <>
                        <p className="qf-tile-title mt-4">{t.dayToDay}</p>
                        <p className="qf-body mt-1.5 line-clamp-6">{career.dayToDay}</p>
                    </>
                ) : null}
            </section>

            <section className="qf-tile flex min-w-0 flex-col">
                <div className="qf-tile-head">
                    <p className="qf-tile-title">{t.keySkills}</p>
                    <ProvenanceBadge provenance="md-reviewed" t={t} />
                </div>
                <p className="qf-caption">{industries.length ? industries.join(" · ") : t.keySkillsNote}</p>
                <div className="qf-chart mt-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={skillBars}
                            layout="vertical"
                            margin={{ left: 2, right: 42, top: 6, bottom: 2 }}
                            barCategoryGap="26%"
                        >
                            <XAxis type="number" hide domain={[0, 100]} />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={128}
                                tick={{ fill: "#64748B", fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value: string) => (value.length > 22 ? `${value.slice(0, 21)}…` : value)}
                            />
                            <ChartTooltip
                                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                                formatter={(
                                    value: number,
                                    _n: string,
                                    entry: { payload?: { source?: string; growth?: number | null } },
                                ) => [
                                    `${value}% · ${entry?.payload?.source ?? ""}${entry?.payload?.growth ? ` · net +${entry.payload.growth}` : ""}`,
                                    t.keySkills,
                                ]}
                                contentStyle={chartTooltipStyle}
                            />
                            <Bar
                                dataKey="percent"
                                radius={[0, 7, 7, 0]}
                                maxBarSize={16}
                                isAnimationActive={!reducedMotion}
                                animationDuration={700}
                            >
                                {skillBars.map((row, index) => (
                                    <Cell key={row.name} fill={index < 2 ? accent.main : accent.soft} />
                                ))}
                                <LabelList
                                    dataKey="percent"
                                    position="right"
                                    formatter={(value: number) => `${value}%`}
                                    fill="#16202E"
                                    fontSize={10.5}
                                    fontWeight={700}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
}

function MarketPanel({
    career,
    careers,
    onSelectCareer,
    accent,
    t,
    isVietnamese,
    reducedMotion,
}: {
    career: CareerRecord;
    careers: CareerRecord[];
    onSelectCareer: (slug: string) => void;
    accent: Accent;
    t: UiText;
    isVietnamese: boolean;
    reducedMotion: boolean;
}) {
    const groupCareers = careers.filter((item) => item.jobGroup === career.jobGroup);
    const groupTrends = (Object.keys(trendConfig) as TrendStatus[])
        .map((status) => ({
            status,
            label: isVietnamese ? trendConfig[status].vi : trendConfig[status].en,
            count: groupCareers.filter((item) => item.trend.status === status).length,
        }))
        .filter((row) => row.count > 0);

    const bySlug = new Map(careers.map((item) => [item.slug, item]));
    const similar = career.similarCareerSlugs.map((slug) => bySlug.get(slug)).filter((item): item is CareerRecord => Boolean(item));

    return (
        <div className="flex h-full min-h-0 flex-col gap-2.5">
            <div className="qf-stat-strip">
                <div className="qf-stat">
                    <span>
                        <BarChart3 className="h-3.5 w-3.5" />
                        {t.trendRank}
                    </span>
                    <b>{career.trend.rank ? `#${career.trend.rank} / ${careers.length}` : "—"}</b>
                </div>
                <div className="qf-stat">
                    <span>
                        <TrendingUp className="h-3.5 w-3.5" />
                        {t.careerTrend}
                    </span>
                    <b>
                        <TrendBadge status={career.trend.status} isVietnamese={isVietnamese} />
                    </b>
                </div>
            </div>

            <div className="qf-split flex-1">
                <section className="qf-tile flex min-w-0 flex-col">
                    <div className="qf-tile-head">
                        <p className="qf-tile-title">{t.globalOutlook}</p>
                        <TrendBadge status={career.trend.status} isVietnamese={isVietnamese} />
                    </div>
                    {/* Trend mix of this career's job group (sheet data). */}
                    <p className="qf-caption">
                        {career.jobGroup} · {groupCareers.length} {t.careers}
                    </p>
                    <div className="qf-chart">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={groupTrends}
                                layout="vertical"
                                margin={{ left: 4, right: 32, top: 8, bottom: 4 }}
                                barCategoryGap="26%"
                            >
                                <XAxis type="number" hide allowDecimals={false} domain={[0, "dataMax"]} />
                                <YAxis
                                    type="category"
                                    dataKey="label"
                                    width={92}
                                    tick={{ fill: "#64748B", fontSize: 11, fontWeight: 600 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <ChartTooltip
                                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                                    formatter={(value: number) => [`${value} ${t.careers}`, career.jobGroup]}
                                    contentStyle={chartTooltipStyle}
                                />
                                <Bar
                                    dataKey="count"
                                    radius={[0, 8, 8, 0]}
                                    maxBarSize={22}
                                    isAnimationActive={!reducedMotion}
                                    animationDuration={700}
                                >
                                    {groupTrends.map((row) => (
                                        <Cell
                                            key={row.status}
                                            fill={row.status === career.trend.status ? accent.main : accent.soft}
                                            fillOpacity={row.status === career.trend.status ? 1 : 0.55}
                                        />
                                    ))}
                                    <LabelList dataKey="count" position="right" fill="#16202E" fontSize={11} fontWeight={700} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="qf-caption mt-2">{career.trend.sourceLabel}</p>
                </section>

                <section className="qf-tile flex min-w-0 flex-col">
                    <p className="qf-tile-title">{t.similarCareers}</p>
                    <div className="qf-similar-list qf-scroll mt-2">
                        {similar.map((item) => (
                            <button key={item.slug} type="button" className="qf-similar-row" onClick={() => onSelectCareer(item.slug)}>
                                <span className="qf-similar-name">{isVietnamese ? item.name.vi : item.name.en}</span>
                                <span className="qf-caption">#{item.trend.rank}</span>
                                <TrendBadge status={item.trend.status} isVietnamese={isVietnamese} />
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

function EducationPanel({ career, accent, reducedMotion, t }: { career: CareerRecord; accent: Accent; reducedMotion: boolean; t: UiText }) {
    if (!career.education.length) return <p className="qf-empty">{t.noEducation}</p>;
    // How often each admissions block opens a door into this career.
    const blockCounts = new Map<string, number>();
    career.education.forEach((item) => {
        item.examBlocks
            .filter((block) => block.length <= 14 && !block.includes(" "))
            .forEach((block) => blockCounts.set(block, (blockCounts.get(block) ?? 0) + 1));
    });
    const blockBars = [...blockCounts.entries()]
        .map(([block, count]) => ({ block, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
    return (
        <section className="qf-tile qf-tile--edu">
            <div className="qf-tile-head">
                <p className="qf-tile-title">{t.majors}</p>
                <ProvenanceBadge provenance="md-reviewed" t={t} />
            </div>
            {blockBars.length > 1 && new Set(blockBars.map((bar) => bar.count)).size > 1 ? (
                <div className="qf-chart-xs mt-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={blockBars} margin={{ left: 0, right: 0, top: 12, bottom: 0 }} barCategoryGap="30%">
                            <XAxis
                                dataKey="block"
                                tick={{ fill: "#64748B", fontSize: 9.5, fontWeight: 600 }}
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                            />
                            <YAxis hide domain={[0, "dataMax + 1"]} allowDecimals={false} />
                            <ChartTooltip
                                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                                formatter={(value: number) => [`${value} ${t.majorsCount}`, t.examBlock]}
                                contentStyle={chartTooltipStyle}
                            />
                            <Bar
                                dataKey="count"
                                radius={[5, 5, 0, 0]}
                                maxBarSize={26}
                                fill={accent.main}
                                isAnimationActive={!reducedMotion}
                                animationDuration={700}
                            >
                                <LabelList dataKey="count" position="top" fill="#64748B" fontSize={9.5} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : null}
            <div className="qf-edu-grid qf-scroll mt-2.5">
                {career.education.slice(0, 6).map((item) => {
                    // The source mixes real admissions codes ("A00") with free-text
                    // caveats in the same array — only the codes belong on chips.
                    const codes = item.examBlocks.filter((block) => block.length <= 14 && !block.includes(" "));
                    const notes = item.examBlocks.filter((block) => !codes.includes(block));
                    return (
                        <div key={`${item.department}-${item.name}`} className="qf-edu-card">
                            <p className="qf-h3">{item.name}</p>
                            <p className="qf-caption">{item.department}</p>
                            <p className="qf-overline mt-2.5">{t.coreSubjects}</p>
                            <p className="qf-body-sm">{item.coreSubjects.join(" · ") || t.notAvailable}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                                {codes.length ? (
                                    codes.map((block) => (
                                        <span key={block} className="qf-chip qf-chip--sm">
                                            {block}
                                        </span>
                                    ))
                                ) : (
                                    <span className="qf-caption">{t.notAvailable}</span>
                                )}
                            </div>
                            {notes.length ? <p className="qf-caption mt-1.5">{notes.join(" · ")}</p> : null}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

/* ──────────────────────────────── Page ─────────────────────────────────── */

function DashboardSkeleton({ t }: { t: UiText }) {
    return (
        <div className="qf-dash grid place-items-center" style={careerDashboardCssVariables}>
            <div className="text-center">
                <div className="relative mx-auto mb-5 h-14 w-14">
                    <div className="absolute inset-0 animate-ping rounded-full bg-[#F5A524]/20" />
                    <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-[#F5A524] text-white shadow-lg">
                        <Compass className="h-6 w-6" />
                    </div>
                </div>
                <p className="qf-body">{t.loading}</p>
            </div>
        </div>
    );
}

export default function CareerDashboard() {
    const locale = useLocale();
    const isVietnamese = locale === "vi";
    const t: UiText = UI[isVietnamese ? "vi" : "en"];
    const user = useUser();
    const openLoginDialog = useAuthDialogStore((state) => state.setAuthDialogOpen);
    const { refetchUser } = useAuthActions();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const reducedMotion = Boolean(useReducedMotion());

    const [careerOverride, setCareerOverride] = useState<string | null>(null);
    useEffect(() => setCareerOverride(null), [searchParams]);
    const [data, setData] = useState<CareerDashboardData | null>(null);
    const [error, setError] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [activeTab, setActiveTab] = useState<TabKey>("overview");
    const [search, setSearch] = useState("");
    const deferredSearch = useDeferredValue(search.trim().toLowerCase());
    const [groupFilter, setGroupFilter] = useState("all");
    const [riasecFilter, setRiasecFilter] = useState("all");
    const [trendFilter, setTrendFilter] = useState("all");
    const [sortKey, setSortKey] = useState<SortKey>("popular");
    const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set());
    const [savePending, setSavePending] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    /** Temporary theme preview; never written back to the survey. */
    const [previewFish, setPreviewFish] = useState<string | null>(null);
    const view = searchParams.get("view") || "auto";
    // ?v=2 / ?v=3 are the ImageGen layout concepts; anything else is the original v1.
    const [conceptMore, setConceptMore] = useState({ recs: false, skills: false, rung: 0, all: false });
    const [reportPending, setReportPending] = useState(false);
    // V2/V3 are laid out on the concept's own canvas and zoomed to fit the screen, so they
    // match the mockup at any size without overlap or page scroll.
    useEffect(() => {
        const host = document.querySelector<HTMLElement>(".qf-career-host");
        const dash = host?.querySelector<HTMLElement>(".qf-dash");
        if (!host || !dash) return;
        const [width, height, padX, padY] = [1310, 950, 56, 42];
        const fit = () => {
            const availableWidth = host.clientWidth - padX;
            const availableHeight = host.clientHeight - padY;
            const scale = Math.max(0.4, Math.min(availableWidth / width, availableHeight / height, 1.35));
            dash.style.setProperty("--c-scale", String(scale));
            dash.style.setProperty("--c-w", `${Math.floor(availableWidth / scale)}px`);
            dash.style.setProperty("--c-h", `${Math.floor(availableHeight / scale)}px`);
        };
        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(host);
        return () => observer.disconnect();
    }, [view, data]);

    const activeFishType = previewFish ?? user?.latest_survey?.fish_type ?? null;
    const fishTheme = useMemo(() => getFishTheme(activeFishType), [activeFishType]);
    const fishData = useMemo(
        () => (user?.latest_survey?.fish_type ? getJungTypologyData(user.latest_survey.fish_type) : null),
        [user?.latest_survey?.fish_type],
    );
    const fishImage = fishTheme?.image || "/assets/fishes/clownfish.png";
    const themeVars = useMemo(() => ({ ...careerDashboardCssVariables, ...defaultCoralVars, ...(fishTheme?.vars ?? {}) }), [fishTheme]);
    const accent: Accent = fishTheme ? { main: fishTheme.primary, soft: fishTheme.header } : DEFAULT_ACCENT;
    /**
     * Viewport-height media queries only approximate how much room the detail
     * pane actually has — the sidebar, zoom level and browser chrome all move
     * it. Measuring the pane itself is exact, so content density is driven from
     * here and the stylesheet keys off `data-density`.
     */
    const detailBodyRef = useRef<HTMLDivElement | null>(null);
    const [density, setDensity] = useState<Density>("normal");

    useEffect(() => {
        let active = true;
        setError(false);
        fetch("/data/career-dashboard.v1.json")
            .then((response) => {
                if (!response.ok) throw new Error(`Career data request failed: ${response.status}`);
                return response.json();
            })
            .then((payload: CareerDashboardData) => {
                if (active) setData(payload);
            })
            .catch(() => {
                if (active) setError(true);
            });
        return () => {
            active = false;
        };
    }, [reloadKey]);

    // Saved careers live on the backend, so they survive reloads and devices.
    const userId = user?.id;
    useEffect(() => {
        if (!userId) return;
        const refreshProfile = () => {
            if (document.visibilityState === "visible") void refetchUser();
        };
        window.addEventListener("focus", refreshProfile);
        document.addEventListener("visibilitychange", refreshProfile);
        return () => {
            window.removeEventListener("focus", refreshProfile);
            document.removeEventListener("visibilitychange", refreshProfile);
        };
    }, [userId, refetchUser]);

    useEffect(() => {
        if (!userId) {
            setSavedSlugs(new Set());
            return;
        }
        let active = true;
        const refreshSaved = () => {
            if (document.visibilityState !== "visible") return;
            savedCareersRepository
                .list()
                .then((payload) => {
                    if (active) setSavedSlugs(new Set(payload.slugs));
                })
                .catch(() => undefined);
        };
        refreshSaved();
        window.addEventListener("focus", refreshSaved);
        document.addEventListener("visibilitychange", refreshSaved);
        return () => {
            active = false;
            window.removeEventListener("focus", refreshSaved);
            document.removeEventListener("visibilitychange", refreshSaved);
        };
    }, [userId]);

    /**
     * The zoom card portals to <body>, outside .qf-dash, so it would inherit
     * none of the theme variables and render transparent. Mirroring them onto
     * :root keeps every portal on the same palette as the dashboard.
     */
    useEffect(() => {
        const root = document.documentElement;
        const entries = Object.entries(themeVars).filter(([key]) => key.startsWith("--"));
        entries.forEach(([key, value]) => root.style.setProperty(key, String(value)));
        return () => entries.forEach(([key]) => root.style.removeProperty(key));
    }, [themeVars]);

    useEffect(() => {
        const element = detailBodyRef.current;
        if (!element || typeof ResizeObserver === "undefined") return;
        const observer = new ResizeObserver(() => {
            const height = element.clientHeight;
            setDensity(height >= 430 ? "roomy" : height >= 350 ? "normal" : height >= 280 ? "tight" : "compact");
        });
        observer.observe(element);
        return () => observer.disconnect();
        // The pane only exists once the data has replaced the skeleton, so the
        // observer has to be attached on that render, not on mount.
    }, [data]);

    useEffect(() => {
        if (!toast) return;
        const timer = window.setTimeout(() => setToast(null), 2400);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const careersBySlug = useMemo(() => new Map(data?.careers.map((career) => [career.slug, career]) || []), [data]);

    const survey = user?.latest_survey ?? null;
    const surveyScores = survey?.riasec_scores as Record<RiasecKey, number> | undefined;

    /** Occupation names the report recommends, best first. */
    const reportRecommendations = useMemo(() => getReportCareerRecommendations(data?.careers || [], survey), [data, survey]);
    const recommendedSlugs = useMemo(() => new Set(reportRecommendations.careers.map((career) => career.slug)), [reportRecommendations]);

    const selectedCareer = useMemo(() => {
        if (!data) return null;
        const requested = careerOverride || searchParams.get("career");
        if (requested && careersBySlug.has(requested)) return careersBySlug.get(requested)!;
        const firstRecommended = [...recommendedSlugs][0];
        if (firstRecommended) return careersBySlug.get(firstRecommended)!;
        return careersBySlug.get("ai-and-machine-learning-specialists") || data.careers[0];
    }, [data, searchParams, careerOverride, careersBySlug, recommendedSlugs]);

    const updateQuery = useCallback(
        (updates: Record<string, string>) => {
            if (updates.career) setCareerOverride(updates.career);
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, value]) => params.set(key, value));
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [searchParams, router, pathname],
    );
    useEffect(() => {
        if (!filteredCareers.length || !selectedCareer) return;
        if (!filteredCareers.some((career) => career.slug === selectedCareer.slug)) updateQuery({ career: filteredCareers[0].slug });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupFilter, riasecFilter, trendFilter]);

    const filteredCareers = useMemo(() => {
        if (!data) return [];
        const rows = data.careers.filter((career) => {
            const matchesSearch =
                !deferredSearch ||
                career.name.en.toLowerCase().includes(deferredSearch) ||
                career.name.vi.toLowerCase().includes(deferredSearch) ||
                career.jobGroup.toLowerCase().includes(deferredSearch);
            const matchesGroup = groupFilter === "all" || career.jobGroup === groupFilter;
            const matchesRiasec = riasecFilter === "all" || career.riasec.code.includes(riasecFilter);
            const matchesTrend = trendFilter === "all" || career.trend.status === trendFilter;
            return matchesSearch && matchesGroup && matchesRiasec && matchesTrend;
        });

        const growthOf = (career: CareerRecord) => career.trend.globalNetGrowth ?? -999;
        if (sortKey === "growth") return [...rows].sort((a, b) => growthOf(b) - growthOf(a));
        if (sortKey === "az") return [...rows].sort((a, b) => careerName(a, isVietnamese).localeCompare(careerName(b, isVietnamese)));
        if (sortKey === "fit" && surveyScores) {
            return [...rows].sort(
                (a, b) =>
                    (calculateProfileMatch(surveyScores, b.riasec.scores).score ?? 0) -
                    (calculateProfileMatch(surveyScores, a.riasec.scores).score ?? 0),
            );
        }
        // "Popular" surfaces the report's own recommendations first.
        return [...rows].sort((a, b) => Number(recommendedSlugs.has(b.slug)) - Number(recommendedSlugs.has(a.slug)));
    }, [data, deferredSearch, groupFilter, riasecFilter, trendFilter, sortKey, isVietnamese, surveyScores, recommendedSlugs]);

    const clearFilters = () => {
        setSearch("");
        setGroupFilter("all");
        setRiasecFilter("all");
        setTrendFilter("all");
    };

    const toggleSave = async () => {
        if (!selectedCareer) return;
        if (!userId) {
            openLoginDialog("login");
            setToast(t.signInToSave);
            return;
        }
        const slug = selectedCareer.slug;
        const wasSaved = savedSlugs.has(slug);
        setSavePending(true);
        // Optimistic: the row flips immediately and reverts if the call fails.
        setSavedSlugs((current) => {
            const next = new Set(current);
            if (wasSaved) next.delete(slug);
            else next.add(slug);
            return next;
        });
        try {
            const result = await savedCareersRepository.toggle(slug, careerName(selectedCareer, isVietnamese));
            setSavedSlugs((current) => {
                const next = new Set(current);
                if (result.saved) next.add(slug);
                else next.delete(slug);
                return next;
            });
            setToast(result.saved ? t.saved : t.save);
        } catch {
            setSavedSlugs((current) => {
                const next = new Set(current);
                if (wasSaved) next.add(slug);
                else next.delete(slug);
                return next;
            });
            setToast(t.error);
        } finally {
            setSavePending(false);
        }
    };

    const shareCareer = async () => {
        if (typeof window === "undefined") return;
        try {
            await navigator.clipboard.writeText(window.location.href);
            setToast(t.shareCopied);
        } catch {
            setToast(t.error);
        }
    };

    if (!data && !error) return <DashboardSkeleton t={t} />;
    if (error || !data) {
        return (
            <div className="qf-dash grid place-items-center" style={careerDashboardCssVariables}>
                <div className="max-w-sm rounded-3xl bg-white p-8 text-center shadow-xl">
                    <AlertTriangle className="mx-auto mb-4 h-8 w-8 text-[#D0564B]" />
                    <p className="font-semibold text-[#16202E]">{t.error}</p>
                    <button onClick={() => setReloadKey((value) => value + 1)} className="qf-btn-primary mt-5">
                        {t.retry}
                    </button>
                </div>
            </div>
        );
    }
    if (!selectedCareer) return null;

    const profileMatch = calculateProfileMatch(surveyScores, selectedCareer.riasec.scores);
    const SelectedGroupIcon = groupIcon(selectedCareer.jobGroup);
    const reportHref = survey?.id ? `/survey/results/${survey.id}` : "/survey";
    const hasReport = Boolean(survey);
    const growth = selectedCareer.trend.globalNetGrowth;
    const isSaved = savedSlugs.has(selectedCareer.slug);

    const fitScore = profileMatch.score ?? 0;
    const fitLabel =
        profileMatch.label === "strong"
            ? t.fitHigh
            : profileMatch.label === "promising"
              ? t.fitMedium
              : profileMatch.label === "explore"
                ? t.fitExplore
                : t.fitLow;
    // Sub-scores are derived views of one correlation, not independent claims:
    // Interest is the raw RIASEC alignment; Experience is tempered by required
    // years when the source states them. The tooltip says so; see fitNoteBody.
    const expWeight = selectedCareer.minimumExperienceYears ? 1 - Math.min(0.35, selectedCareer.minimumExperienceYears * 0.06) : 1;
    const fitBreakdown = [
        { label: t.fitSkills, value: Math.round(fitScore), color: GREEN },
        { label: t.fitExperience, value: Math.round(fitScore * expWeight), color: GREEN },
        { label: t.fitInterest, value: Math.round(fitScore), color: accent.soft },
        { label: t.fitValues, value: Math.round(fitScore * 0.94), color: accent.soft },
    ];

    const outlookSeries = [2025, 2026, 2027, 2028, 2029, 2030].map((year, index) => ({
        year: String(year),
        value: Number((100 + ((growth ?? 0) / 5) * index).toFixed(1)),
    }));

    const roadmapCopy = {
        careerPath: t.careerPath,
        noPath: t.noPath,
        milestone: t.milestone,
        yearsIn: t.years,
        now: t.now,
        salaryVn: t.salaryVn,
        salaryUs: t.salaryUsLabel,
        skillsToBuild: t.skillsToBuild,
        dayToDay: t.dayToDay,
        outlook: t.outlook,
        youAreHere: t.youAreHere,
        notAvailable: t.notAvailable,
        level: t.level,
    };

    const topTabLabel: Record<TabKey, string> = {
        overview: t.tabOverview,
        skills: t.tabSkills,
        market: t.tabMarket,
        education: t.tabEducation,
        path: t.tabPath,
    };
    const detailTabLabel: Record<TabKey, string> = {
        overview: t.tabOverview,
        skills: t.tabSkills,
        market: t.detailMarket,
        education: t.detailEducation,
        path: t.detailPath,
    };

    const recommendations = (
        <aside
            className="qf-hero-recommendations"
            aria-label={isVietnamese ? "Nghề đề xuất từ báo cáo" : "Careers recommended by your report"}
        >
            <div className="qf-recommendations-head">
                <span className="qf-recommendations-icon">
                    <Sparkles className="h-4 w-4" />
                </span>
                <div>
                    <h2>{isVietnamese ? "Nghề đề xuất" : "Recommended careers"}</h2>
                    <p>{isVietnamese ? "Từ báo cáo chi tiết của bạn" : "From your detailed report"}</p>
                </div>
                {reportRecommendations.careers.length ? (
                    <span className="qf-recommendations-count">{reportRecommendations.careers.length}</span>
                ) : null}
            </div>
            <div className="qf-list qf-scroll">
                {reportRecommendations.careers.map((career, index) => {
                    const active = selectedCareer.slug === career.slug;
                    const Icon = groupIcon(career.jobGroup);
                    return (
                        <motion.button
                            key={career.slug}
                            onClick={() => updateQuery({ career: career.slug })}
                            whileTap={reducedMotion ? undefined : { scale: 0.985 }}
                            className={`qf-row qf-recommendation-row ${active ? "is-active" : ""}`}
                            aria-current={active ? "true" : undefined}
                        >
                            {active ? (
                                <motion.span
                                    layoutId={reducedMotion ? undefined : "qf-row-bg"}
                                    className="qf-row-bg"
                                    transition={careerMotion.pill as never}
                                />
                            ) : null}
                            <span className="qf-row-icon">
                                <Icon className="h-4 w-4" />
                            </span>
                            <span className="qf-row-text">
                                <span className="qf-row-name">{careerName(career, isVietnamese)}</span>
                                <span className="qf-row-meta">
                                    {career.riasec.code} · #{career.trend.rank ?? "—"}
                                </span>
                                {active ? (
                                    <span className="qf-recommendation-active">
                                        <CheckCircle2 className="h-3 w-3" />
                                        {isVietnamese ? "Đang xem" : "Selected"}
                                    </span>
                                ) : null}
                            </span>
                            <span className="qf-row-id">
                                {savedSlugs.has(career.slug) ? <Bookmark className="h-3 w-3 fill-current" /> : null}
                                <span className="qf-recommendation-rank">{index + 1}</span>
                            </span>
                        </motion.button>
                    );
                })}
                {reportRecommendations.unmappedNames.map((name) => (
                    <div key={name} className="qf-recommendation-unmapped">
                        <p>{name}</p>
                        <span>
                            {isVietnamese ? "Chưa có dữ liệu chi tiết trong dashboard" : "Details are not available in this dashboard"}
                        </span>
                    </div>
                ))}
                {!reportRecommendations.careers.length && !reportRecommendations.unmappedNames.length ? (
                    <div className="qf-recommendations-empty">
                        <Target className="h-8 w-8" />
                        <h3>
                            {hasReport
                                ? isVietnamese
                                    ? "Báo cáo chưa có nghề đề xuất"
                                    : "No career recommendations yet"
                                : isVietnamese
                                  ? "Khám phá nghề phù hợp với bạn"
                                  : "Discover careers that fit you"}
                        </h3>
                        <p>
                            {hasReport
                                ? isVietnamese
                                    ? "Bạn vẫn có thể tìm và chọn nghề ở thanh phía trên."
                                    : "You can still find and select careers above."
                                : isVietnamese
                                  ? "Hoàn thành bài test để xem các nghề được đề xuất từ báo cáo của bạn."
                                  : "Take the test to see recommendations from your report."}
                        </p>
                        <Link href={(hasReport ? reportHref : "/survey") as never} className="qf-btn-primary">
                            {hasReport ? t.openReport : t.takeTest}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                ) : (
                    <Link href={reportHref as never} className="qf-recommendations-report">
                        {t.openReport}
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                )}
            </div>
        </aside>
    );
    const detailPanels = (mobile = false) => (
        <Tabs.Root
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabKey)}
            className="relative z-[1] flex h-full min-h-0 flex-col"
        >
            <Tabs.List className="qf-detail-tabs qf-scroll" aria-label={t.product}>
                {tabKeys.map((key) => (
                    <Tabs.Trigger key={key} value={key} className="qf-detail-tab">
                        {detailTabLabel[key]}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>

            <div
                className="qf-detail-body qf-scroll"
                ref={mobile ? undefined : detailBodyRef}
                data-density={mobile || true ? "roomy" : density}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={`${selectedCareer.slug}-${activeTab}`}
                        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, y: -5 }}
                        transition={reducedMotion ? { duration: 0 } : (careerMotion.panel as never)}
                        className="h-full min-h-0"
                    >
                        <Tabs.Content value={activeTab} forceMount className="h-full min-h-0">
                            {activeTab === "overview" && !mobile ? conceptOverview : null}
                            {activeTab === "overview" && mobile ? (
                                <OverviewPanel
                                    career={selectedCareer}
                                    data={data}
                                    profileMatch={profileMatch}
                                    userScores={surveyScores}
                                    accent={accent}
                                    density={mobile || true ? "roomy" : density}
                                    t={t}
                                    isVietnamese={isVietnamese}
                                    reducedMotion={reducedMotion}
                                />
                            ) : null}
                            {activeTab === "skills" && !mobile ? conceptSkillsTab : null}
                            {activeTab === "skills" && !!mobile ? (
                                <SkillsPanel career={selectedCareer} accent={accent} reducedMotion={reducedMotion} t={t} />
                            ) : null}
                            {activeTab === "market" && !mobile ? conceptMarketTab : null}
                            {activeTab === "market" && !!mobile ? (
                                <MarketPanel
                                    career={selectedCareer}
                                    careers={data.careers}
                                    onSelectCareer={(slug) => updateQuery({ career: slug })}
                                    accent={accent}
                                    t={t}
                                    isVietnamese={isVietnamese}
                                    reducedMotion={reducedMotion}
                                />
                            ) : null}
                            {activeTab === "education" && !mobile ? conceptEducationTab : null}
                            {activeTab === "education" && !!mobile ? (
                                <EducationPanel career={selectedCareer} accent={accent} reducedMotion={reducedMotion} t={t} />
                            ) : null}
                            {activeTab === "path" && !mobile ? conceptPathTab : null}
                            {activeTab === "path" && !!mobile ? (
                                <RoadmapPanel career={selectedCareer} accent={accent} reducedMotion={reducedMotion} copy={roadmapCopy} />
                            ) : null}
                        </Tabs.Content>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Tabs.Root>
    );

    const salaryParts = (() => {
        // Sheet salary reads "13–30 million VND/month"; split figure from unit for the large display.
        const match = selectedCareer.salary.vietnam.match(/^(.*?)\s*million VND\/month$/i);
        if (!match) return { value: selectedCareer.salary.vietnam, unit: "" };
        return isVietnamese ? { value: `${match[1]} triệu`, unit: "VNĐ / tháng" } : { value: `${match[1]} million`, unit: "VND / month" };
    })();
    const sharedTraits = hasReport
        ? profileMatch.topSharedTraits.map((key) => (isVietnamese ? riasecLabels[key].vi : riasecLabels[key].en))
        : [];
    const topSkill = selectedCareer.skillSignals[0];
    const groupCount = data.metadata.totalJobGroups;
    const countLine = `${data.metadata.totalCareers} ${t.careers} · ${groupCount} ${isVietnamese ? "nhóm nghề" : "job groups"}`;
    const riasecCaption = selectedCareer.riasec.code
        .split("")
        .map((key) => (isVietnamese ? riasecLabels[key as RiasecKey]?.vi : riasecLabels[key as RiasecKey]?.en))
        .filter(Boolean)
        .join(" · ");
    const recCareers = reportRecommendations.careers;

    const careerSelect = (
        <select
            value={selectedCareer.slug}
            onChange={(event) => updateQuery({ career: event.target.value })}
            aria-label={isVietnamese ? "Chuyển nghề" : "Switch career"}
        >
            {!filteredCareers.some((career) => career.slug === selectedCareer.slug) ? (
                <option value={selectedCareer.slug}>{careerName(selectedCareer, isVietnamese)}</option>
            ) : null}
            {filteredCareers.map((career) => (
                <option key={career.slug} value={career.slug}>
                    {careerName(career, isVietnamese)}
                </option>
            ))}
        </select>
    );
    const conceptFilters = (
        [
            [
                Building2,
                isVietnamese ? "Nhóm nghề" : "Career family",
                groupFilter,
                setGroupFilter,
                data.jobGroups.map((group) => [group, group] as const),
            ],
            [
                Target,
                t.allRiasec,
                riasecFilter,
                setRiasecFilter,
                riasecOrder.map((key) => [key, `${key} · ${isVietnamese ? riasecLabels[key].vi : riasecLabels[key].en}`] as const),
            ],
            [
                TrendingUp,
                t.allTrends,
                trendFilter,
                setTrendFilter,
                (Object.keys(trendConfig) as TrendStatus[])
                    .filter((status) => data.metadata.trendCounts[status])
                    .map((status) => [status, isVietnamese ? trendConfig[status].vi : trendConfig[status].en] as const),
            ],
        ] as Array<[LucideIcon, string, string, (value: string) => void, ReadonlyArray<readonly [string, string]>]>
    )
        .slice(0, 3)
        .map(([Icon, label, value, setValue, options]) => (
            <label key={label} className="qf-c-select">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="qf-c-select-text">
                    {value === "all" ? label : (options.find(([optionValue]) => optionValue === value)?.[1] ?? value)}
                </span>
                <select className="qf-c-select-native" value={value} onChange={(event) => setValue(event.target.value)} aria-label={label}>
                    <option value="all">{label}</option>
                    {options.map(([optionValue, optionLabel]) => (
                        <option key={optionValue} value={optionValue}>
                            {optionLabel}
                        </option>
                    ))}
                </select>
                <ChevronDown className="h-4 w-4 shrink-0" />
            </label>
        ));
    const searchBox = (
        <label className="qf-c-search">
            <Search className="h-[18px] w-[18px] shrink-0" />
            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" && filteredCareers[0]) {
                        updateQuery({ career: filteredCareers[0].slug });
                        setSearch("");
                    }
                }}
                placeholder={t.search.replace("{n}", String(data.metadata.totalCareers))}
                aria-label={t.search.replace("{n}", String(data.metadata.totalCareers))}
            />
            {search ? (
                <button onClick={() => setSearch("")} aria-label={t.clearFilters}>
                    <X className="h-3.5 w-3.5" />
                </button>
            ) : null}
        </label>
    );
    const accountTools = (
        <div className="qf-c-account">
            <details className="qf-c-fishpick">
                <summary className="qf-c-fishchip" aria-label={isVietnamese ? "Đổi theme theo cá" : "Change fish theme"}>
                    {fishTheme ? <Image src={fishTheme.image} alt="" width={26} height={26} /> : <Sparkles className="h-4 w-4" />}
                    {fishTheme ? fishTheme.fishName : isVietnamese ? "Chọn cá" : "Pick a fish"}
                    {fishTheme && false ? " ·" : ""}
                    {fishTheme ? <b>{fishTheme.code}</b> : null}
                    <ChevronDown className="h-3.5 w-3.5" />
                </summary>
                <div>
                    {ALL_FISH.map((fishType) => {
                        const theme = getFishTheme(fishType);
                        if (!theme) return null;
                        return (
                            <button
                                key={fishType}
                                aria-pressed={activeFishType === fishType}
                                onClick={(event) => {
                                    setPreviewFish(fishType);
                                    event.currentTarget.closest("details")?.removeAttribute("open");
                                }}
                            >
                                <Image src={theme.image} alt="" width={32} height={32} />
                                <span>{theme.fishName}</span>
                                <i style={{ background: theme.primary }} />
                            </button>
                        );
                    })}
                    <button
                        className="qf-c-fishreset"
                        disabled={!previewFish}
                        onClick={(event) => {
                            setPreviewFish(null);
                            event.currentTarget.closest("details")?.removeAttribute("open");
                        }}
                    >
                        {survey?.fish_type
                            ? isVietnamese
                                ? `Về kết quả thật (${survey.fish_type})`
                                : `Back to my result (${survey.fish_type})`
                            : isVietnamese
                              ? "Bỏ xem thử"
                              : "Clear preview"}
                    </button>
                </div>
            </details>
            <span className="qf-c-bell" aria-hidden="true">
                <Bell className="h-[18px] w-[18px]" />
                {hasReport ? <i /> : null}
            </span>
            {user ? (
                <Link href="/profile" className="qf-c-avatar" aria-label={user.name || user.username}>
                    <span>{(user.name || user.username || "QF").slice(0, 2).toUpperCase()}</span>
                    <ChevronDown className="h-4 w-4" />
                </Link>
            ) : (
                <button onClick={() => openLoginDialog("login")} className="qf-v2-save">
                    {t.signIn}
                </button>
            )}
        </div>
    );
    const saveButton = (
        <button onClick={toggleSave} disabled={savePending} className={`qf-v2-save ${isSaved ? "is-on" : ""}`}>
            <Heart className={`h-[18px] w-[18px] ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? t.saved : t.save}
        </button>
    );
    const fitRing =
        hasReport && profileMatch.score !== null ? (
            <div className="qf-c-ring">
                <span className="qf-c-ring-dial" style={{ ["--fit" as string]: fitScore }}>
                    <b>{fitScore}%</b>
                </span>
                <span className="qf-v2-fit-label">{fitLabel}</span>
            </div>
        ) : (
            <Link href="/survey" className="qf-v2-unlock">
                <Sparkles className="h-3.5 w-3.5" />
                {t.takeTest}
            </Link>
        );
    const openDetailReport = async () => {
        if (!survey?.id) {
            if (user) window.location.assign(`/${locale}/survey`);
            else openLoginDialog("login");
            return;
        }
        if (reportPending) return;
        // Open the tab now (inside the click) so the browser does not block it, then point it at the PDF.
        const tab = window.open("", "_blank");
        setReportPending(true);
        try {
            const result = await new DetailReportedRepository().generateDetailReport(String(survey.id), {
                language: locale as never,
                timeout: 180000,
            });
            if (!result?.pdf_url) throw new Error("No report URL");
            if (tab) tab.location.href = result.pdf_url;
            else window.location.assign(result.pdf_url);
        } catch {
            tab?.close();
            setToast(isVietnamese ? "Chưa tạo được báo cáo chi tiết, thử lại sau" : "Could not create the detailed report, try again");
        } finally {
            setReportPending(false);
        }
    };

    const filtersActive = groupFilter !== "all" || riasecFilter !== "all" || trendFilter !== "all" || Boolean(search);
    const conceptRecs = (limit: number) => {
        const listAll = conceptMore.all || filtersActive || !recCareers.length;
        const source = listAll ? filteredCareers : recCareers;
        const rows = listAll || conceptMore.recs ? source : source.slice(0, limit);
        return (
            <section className="qf-c-panel qf-c-recs">
                <div className="qf-c-head">
                    <span className="qf-c-icon">
                        <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                        <h2>
                            {listAll ? (isVietnamese ? "Tất cả nghề" : "All careers") : isVietnamese ? "Nghề đề xuất" : "Recommended"}
                            {""}
                            <span className="qf-c-badge">{source.length}</span>
                        </h2>
                        <p>
                            {listAll
                                ? isVietnamese
                                    ? `Từ file ALLJOBs · ${filtersActive ? "đang lọc" : "132 nghề"}`
                                    : `From the ALLJOBs sheet${filtersActive ? " · filtered" : ""}`
                                : isVietnamese
                                  ? "Từ báo cáo chi tiết của bạn"
                                  : "From your detailed report"}
                        </p>
                    </div>
                    <div className="qf-c-listmode" role="group" aria-label={isVietnamese ? "Danh sách" : "List"}>
                        <button
                            aria-pressed={!listAll}
                            disabled={!recCareers.length || filtersActive}
                            onClick={() => setConceptMore((value) => ({ ...value, all: false }))}
                        >
                            {isVietnamese ? "Đề xuất" : "For you"}
                        </button>
                        <button aria-pressed={listAll} onClick={() => setConceptMore((value) => ({ ...value, all: true }))}>
                            {isVietnamese ? "Tất cả" : "All"}
                        </button>
                    </div>
                </div>
                {source.length ? (
                    <div className="qf-c-reclist qf-scroll">
                        {rows.map((career) => {
                            const active = career.slug === selectedCareer.slug;
                            const Icon = groupIcon(career.jobGroup);
                            return (
                                <button
                                    key={career.slug}
                                    className={`qf-c-rec ${active ? "is-active" : ""}`}
                                    onClick={() => updateQuery({ career: career.slug })}
                                    aria-current={active ? "true" : undefined}
                                >
                                    <span className="qf-c-rec-icon">
                                        {active ? (
                                            <Image src={fishImage} alt="" width={28} height={28} />
                                        ) : (
                                            <Icon className="h-[18px] w-[18px]" />
                                        )}
                                    </span>
                                    <span className="qf-c-rec-name">{careerName(career, isVietnamese)}</span>
                                    <ChevronRight className="h-4 w-4 shrink-0" />
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <button className="qf-c-more" onClick={clearFilters}>
                        {isVietnamese ? "Không có nghề khớp bộ lọc · Đặt lại" : "No careers match · Reset filters"}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                )}
                {!listAll && recCareers.length > limit ? (
                    <button className="qf-c-more" onClick={() => setConceptMore((value) => ({ ...value, recs: !value.recs }))}>
                        {conceptMore.recs ? (isVietnamese ? "Thu gọn" : "Show less") : isVietnamese ? "Xem tất cả" : "See all"}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                ) : null}
            </section>
        );
    };

    const conceptSkills = selectedCareer.skillSignals;
    const shownSkills = conceptMore.skills ? conceptSkills : conceptSkills.slice(0, 3);
    const conceptRadar = riasecOrder.map((key) => ({
        trait: key,
        career: Math.max(0, Math.min(100, ((Number(selectedCareer.riasec.scores[key]) || 0) / 7) * 100)),
        user: Math.max(0, Math.min(100, ((Number(surveyScores?.[key]) || 0) / 5) * 100)),
    }));
    const conceptOverview = (
        <div className="qf-c-overview">
            <section className="qf-c-panel qf-c-skills">
                <div className="qf-c-head">
                    <span className="qf-c-icon">
                        <BarChart3 className="h-5 w-5" />
                    </span>
                    <div>
                        <h2>{t.keySkills}</h2>
                        <p>{t.keySkillsNote}</p>
                    </div>
                </div>
                <div className="qf-c-bars qf-scroll">
                    {shownSkills.map((skill, index) => (
                        <div key={skill.name} className="qf-c-bar">
                            <span>{skill.name}</span>
                            <i>
                                <b style={{ width: `${skill.percent}%`, animationDelay: `${index * 80}ms` }} />
                            </i>
                            <em>{skill.percent}%</em>
                        </div>
                    ))}
                </div>
                {conceptSkills.length > 3 ? (
                    <button className="qf-c-more" onClick={() => setConceptMore((value) => ({ ...value, skills: !value.skills }))}>
                        {conceptMore.skills
                            ? isVietnamese
                                ? "Thu gọn"
                                : "Show less"
                            : isVietnamese
                              ? `Xem thêm ${conceptSkills.length - 3} kỹ năng`
                              : `${conceptSkills.length - 3} more skills`}
                        <ChevronDown className={`h-4 w-4 transition-transform ${conceptMore.skills ? "rotate-180" : ""}`} />
                    </button>
                ) : null}
            </section>
            <section className="qf-c-panel qf-c-radar">
                <div className="qf-c-head">
                    <span className="qf-c-icon">
                        <Target className="h-5 w-5" />
                    </span>
                    <div>
                        <h2>{isVietnamese ? "Hồ sơ RIASEC" : "RIASEC profile"}</h2>
                    </div>
                    <span className="qf-c-legend">
                        <span>
                            <i style={{ background: accent.main }} />
                            {isVietnamese ? "Nghề này" : "This career"}
                        </span>
                        {surveyScores ? (
                            <span>
                                <i style={{ background: BLUE }} />
                                {isVietnamese ? "Hồ sơ của bạn" : "Your profile"}
                            </span>
                        ) : null}
                    </span>
                </div>
                <div className="qf-c-radar-chart">
                    <RadarChart
                        width={400}
                        height={196}
                        data={conceptRadar}
                        outerRadius="84%"
                        margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
                    >
                        <PolarGrid stroke="#E9DDEA" />
                        <PolarAngleAxis dataKey="trait" tick={{ fill: "#475467", fontSize: 12, fontWeight: 600 }} />
                        <Radar
                            dataKey="career"
                            stroke={accent.main}
                            strokeWidth={2}
                            fill={accent.main}
                            fillOpacity={0.18}
                            isAnimationActive={!reducedMotion}
                            animationDuration={800}
                        />
                        {surveyScores ? (
                            <Radar
                                dataKey="user"
                                stroke={BLUE}
                                strokeWidth={2}
                                fill={BLUE}
                                fillOpacity={0.1}
                                isAnimationActive={!reducedMotion}
                                animationDuration={800}
                            />
                        ) : null}
                        <ChartTooltip formatter={(value: number) => `${Math.round(value)}/100`} contentStyle={chartTooltipStyle} />
                    </RadarChart>
                </div>
                <p className="qf-c-caption">{riasecCaption}</p>
            </section>
        </div>
    );

    // Compact tab panels for the concept views: each is laid out to fit the space the
    // concept gives the tab area, so no tab is cut off or needs a page scroll.
    const conceptSimilar = selectedCareer.similarCareerSlugs
        .map((slug) => careersBySlug.get(slug))
        .filter((item): item is CareerRecord => Boolean(item));
    const conceptGroup = data.careers.filter((item) => item.jobGroup === selectedCareer.jobGroup);
    const conceptGroupTrends = (Object.keys(trendConfig) as TrendStatus[])
        .map((status) => ({
            status,
            label: isVietnamese ? trendConfig[status].vi : trendConfig[status].en,
            count: conceptGroup.filter((item) => item.trend.status === status).length,
        }))
        .filter((row) => row.count > 0);
    const conceptGroupMax = Math.max(1, ...conceptGroupTrends.map((row) => row.count));
    const rung = Math.min(conceptMore.rung, Math.max(0, selectedCareer.careerPath.length - 1));
    const rungStage = selectedCareer.legacyStages[rung];

    const conceptSkillsTab = (
        <section className="qf-c-panel qf-c-tabpanel">
            <div className="qf-c-head">
                <span className="qf-c-icon">
                    <BarChart3 className="h-5 w-5" />
                </span>
                <div>
                    <h2>{isVietnamese ? "Tất cả kỹ năng" : "All skills"}</h2>
                    <p>{t.keySkillsNote}</p>
                </div>
            </div>
            <div className="qf-c-bars qf-c-bars--grid">
                {conceptSkills.map((skill, index) => (
                    <div key={skill.name} className="qf-c-bar">
                        <span>{skill.name}</span>
                        <i>
                            <b style={{ width: `${skill.percent}%`, animationDelay: `${index * 50}ms` }} />
                        </i>
                        <em>{skill.percent}%</em>
                    </div>
                ))}
            </div>
        </section>
    );

    const conceptMarketTab = (
        <div className="qf-c-tabgrid qf-c-tabgrid--market">
            <section className="qf-c-panel qf-c-tabpanel">
                <div className="qf-c-head">
                    <span className="qf-c-icon">
                        <TrendingUp className="h-5 w-5" />
                    </span>
                    <div>
                        <h2>{t.trendRank}</h2>
                        <p>{selectedCareer.trend.sourceLabel}</p>
                    </div>
                </div>
                <p className="qf-c-bignum">
                    #{selectedCareer.trend.rank ?? "—"}
                    <small> / {data.metadata.totalCareers}</small>
                </p>
                <TrendBadge status={selectedCareer.trend.status} isVietnamese={isVietnamese} />
            </section>
            <section className="qf-c-panel qf-c-tabpanel">
                <div className="qf-c-head">
                    <span className="qf-c-icon">
                        <BarChart3 className="h-5 w-5" />
                    </span>
                    <div>
                        <h2>{isVietnamese ? "Xu hướng trong nhóm nghề" : "Trend in this family"}</h2>
                        <p>
                            {selectedCareer.jobGroup} · {conceptGroup.length} {t.careers}
                        </p>
                    </div>
                </div>
                <div className="qf-c-hbars">
                    {conceptGroupTrends.map((row, index) => (
                        <div key={row.status} className={`qf-c-hbar ${row.status === selectedCareer.trend.status ? "is-current" : ""}`}>
                            <span>{row.label}</span>
                            <i>
                                <b style={{ width: `${(row.count / conceptGroupMax) * 100}%`, animationDelay: `${index * 60}ms` }} />
                            </i>
                            <em>{row.count}</em>
                        </div>
                    ))}
                </div>
            </section>
            <section className="qf-c-panel qf-c-tabpanel">
                <div className="qf-c-head">
                    <span className="qf-c-icon">
                        <Users className="h-5 w-5" />
                    </span>
                    <div>
                        <h2>{isVietnamese ? "Nghề tương tự" : "Similar careers"}</h2>
                        <p>
                            {conceptSimilar.length} {t.careers}
                        </p>
                    </div>
                </div>
                <div className="qf-c-chips">
                    {conceptSimilar.slice(0, 8).map((item) => (
                        <button key={item.slug} className="qf-c-chip" onClick={() => updateQuery({ career: item.slug })}>
                            {careerName(item, isVietnamese)}
                            <small>#{item.trend.rank}</small>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );

    const conceptEducationTab = selectedCareer.education.length ? (
        <div className="qf-c-tabgrid" style={{ gridTemplateColumns: `repeat(${selectedCareer.education.length}, minmax(0, 1fr))` }}>
            {selectedCareer.education.map((item) => (
                <section key={item.name} className="qf-c-panel qf-c-tabpanel">
                    <div className="qf-c-head">
                        <span className="qf-c-icon">
                            <GraduationCap className="h-5 w-5" />
                        </span>
                        <div>
                            <h2>{item.name}</h2>
                            <p>{item.department ?? selectedCareer.departments.join(" · ")}</p>
                        </div>
                    </div>
                    <p className="qf-c-label">{isVietnamese ? "Môn cốt lõi" : "Core subjects"}</p>
                    <p className="qf-c-text">{item.coreSubjects.join(" · ") || "—"}</p>
                    <div className="qf-c-chips qf-c-chips--blocks">
                        {item.examBlocks.map((block) => (
                            <span key={block} className="qf-c-chip">
                                {block}
                            </span>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    ) : (
        <section className="qf-c-panel qf-c-tabpanel">
            <p className="qf-c-text">{t.noEducation}</p>
        </section>
    );

    const conceptPathTab = (
        <section className="qf-c-panel qf-c-tabpanel qf-c-path">
            <ol className="qf-c-steps">
                {selectedCareer.careerPath.map((title, index) => (
                    <li key={title + index} className={index === rung ? "is-active" : index < rung ? "is-done" : ""}>
                        <button onClick={() => setConceptMore((value) => ({ ...value, rung: index }))}>
                            <span>{index + 1}</span>
                            <b>{title}</b>
                            {selectedCareer.legacyStages[index]?.level ? <small>{selectedCareer.legacyStages[index].level}</small> : null}
                        </button>
                    </li>
                ))}
            </ol>
            <div className="qf-c-stage">
                <p className="qf-c-label">{isVietnamese ? `Bậc ${rung + 1}: kỹ năng cần xây` : `Step ${rung + 1}: skills to build`}</p>
                <div className="qf-c-chips">
                    {rungStage?.skills?.length ? (
                        rungStage.skills.map((skill) => (
                            <span key={skill} className="qf-c-chip">
                                {skill}
                            </span>
                        ))
                    ) : (
                        <span className="qf-c-text">
                            {isVietnamese ? "Sheet chưa có kỹ năng cho bậc này" : "The sheet lists no skills for this step"}
                        </span>
                    )}
                </div>
            </div>
        </section>
    );

    const conceptHero2 = (
        <section key={`c2-hero-${selectedCareer.slug}`} className="qf-c2-hero qf-enter" aria-labelledby="qf-career-heading">
            <figure className="qf-c2-fish">
                <Image src={fishImage} alt={fishTheme?.fishName || "QuickFish"} width={200} height={180} priority />
                {fishTheme ? (
                    <figcaption>
                        {fishTheme.fishName} · <b>{fishTheme.code}</b>
                    </figcaption>
                ) : null}
            </figure>
            <div className="qf-c2-copy">
                <p className="qf-c2-eyebrow">
                    #{String(selectedCareer.id).padStart(3, "0")} · {selectedCareer.jobGroup}
                </p>
                <h1 id="qf-career-heading">{careerName(selectedCareer, isVietnamese)}</h1>
                <p className="qf-c-desc">{getCareerSummary(selectedCareer, isVietnamese)}</p>
                <div className="qf-c-actions">
                    <span className="qf-v2-pill">RIASEC {selectedCareer.riasec.code}</span>
                    {saveButton}
                    <button onClick={shareCareer} className="qf-v2-round" aria-label={t.share}>
                        <Share2 className="h-[18px] w-[18px]" />
                    </button>
                    <button className="qf-c2-report" onClick={openDetailReport} disabled={reportPending} aria-busy={reportPending}>
                        {reportPending ? <Clock3 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
                        {reportPending
                            ? isVietnamese
                                ? "Đang mở báo cáo…"
                                : "Opening report…"
                            : isVietnamese
                              ? "Báo cáo chi tiết"
                              : "Detailed report"}
                    </button>
                </div>
            </div>
            <img className="qf-c2-sticker" src={careerCover(selectedCareer)} alt="" />
        </section>
    );

    const desktopConcept = (
        <div className="qf-desktop-dashboard qf-c qf-c2">
            <header className="qf-c2-top">
                <div>
                    <p className="qf-c2-crumb">
                        {isVietnamese ? "Tài nguyên" : "Resources"}
                        <ChevronRight className="h-3.5 w-3.5" />
                        <b>{isVietnamese ? "Lộ trình nghề nghiệp" : "Career path"}</b>
                    </p>
                    <h1 className="qf-c2-pagetitle">{isVietnamese ? "Lộ trình nghề nghiệp" : "Career path"}</h1>
                    <p className="qf-c-sub">{countLine}</p>
                </div>
                {accountTools}
            </header>
            <section className="qf-c2-controls" aria-label={isVietnamese ? "Tìm và chuyển nghề" : "Find and switch careers"}>
                <label className="qf-c-select qf-c-career">
                    <span className="qf-c-career-icon">
                        <Briefcase className="h-4 w-4" />
                    </span>
                    <span className="qf-c-career-text">
                        <small>{isVietnamese ? "Đang khám phá" : "Exploring"}</small>
                        {careerSelect}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0" />
                </label>
                {searchBox}
                {conceptFilters}
            </section>
            <div className="qf-c2-body">
                <div className="qf-c2-main">
                    {conceptHero2}
                    <section key={`c2-strip-${selectedCareer.slug}`} className="qf-c2-strip">
                        <div>
                            <span className="qf-c-icon">
                                <Briefcase className="h-5 w-5" />
                            </span>
                            <p>{t.salary}</p>
                            <b>{salaryParts.value}</b>
                            <small>{salaryParts.unit}</small>
                        </div>
                        <div>
                            <span className="qf-c-icon">
                                <TrendingUp className="h-5 w-5" />
                            </span>
                            <p>{t.trendRank}</p>
                            <b>
                                #{selectedCareer.trend.rank ?? "—"}
                                <small> / {data.metadata.totalCareers}</small>
                            </b>
                            <TrendBadge status={selectedCareer.trend.status} isVietnamese={isVietnamese} />
                        </div>
                        <div>
                            <span className="qf-c-icon">
                                <Target className="h-5 w-5" />
                            </span>
                            <p>{isVietnamese ? "Kỹ năng nổi bật" : "Top skill"}</p>
                            <b>{topSkill?.name ?? "—"}</b>
                            {topSkill ? (
                                <small>
                                    {topSkill.percent}% {t.ofEmployers}
                                </small>
                            ) : null}
                        </div>
                    </section>
                    <div className="qf-c-tabs-area">{detailPanels()}</div>
                </div>
                <aside className="qf-c2-rail">
                    <section className="qf-c-panel qf-c-fit">
                        <div className="qf-c-head">
                            <span className="qf-c-icon qf-c-icon--green">
                                <Target className="h-5 w-5" />
                            </span>
                            <div>
                                <h2>{isVietnamese ? "Độ phù hợp" : "Profile fit"}</h2>
                            </div>
                            <Tooltip.Provider delayDuration={120}>
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                        <Info className="ml-auto h-[18px] w-[18px] shrink-0 cursor-help text-[#98A2B3]" />
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content className="qf-tooltip" sideOffset={6} collisionPadding={12}>
                                            <b>{t.fitNoteHeading}</b>
                                            <br />
                                            {t.fitNoteBody}
                                            <Tooltip.Arrow className="fill-[#1B2635]" />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            </Tooltip.Provider>
                        </div>
                        <div className="qf-c-fit-body">
                            {fitRing}
                            {hasReport && profileMatch.score !== null ? (
                                <div className="qf-c-fitbars">
                                    {fitBreakdown.map((row, index) => (
                                        <div key={row.label} className="qf-c-fitbar">
                                            <Sparkles className="h-4 w-4" style={{ color: row.color }} />
                                            <span>{row.label}</span>
                                            <em>{row.value}%</em>
                                            <i>
                                                <b
                                                    style={{
                                                        width: `${row.value}%`,
                                                        background: row.color,
                                                        animationDelay: `${index * 80}ms`,
                                                    }}
                                                />
                                            </i>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="qf-body-sm">{t.unlockFit}</p>
                            )}
                        </div>
                    </section>
                    {conceptRecs(5)}
                    {sharedTraits.length ? (
                        <p className="qf-v2-note">
                            <Image src={fishImage} alt="" width={64} height={58} />
                            <span>
                                {isVietnamese
                                    ? `${sharedTraits.join(" và ")} là những điểm giao nổi bật giữa bạn và nghề này.`
                                    : `${sharedTraits.join(" and ")} are where you and this career overlap most.`}
                            </span>
                        </p>
                    ) : null}
                </aside>
            </div>
        </div>
    );
    return (
        <div className="qf-dash qf-deck-version" data-view={view} data-version="2" style={themeVars}>
            <MobileCareerDeck
                account={
                    user ? (
                        <Link href="/profile" className="qf-c-avatar" aria-label={user.name || user.username}>
                            <span>{(user.name || user.username || "QF").slice(0, 2).toUpperCase()}</span>
                            <ChevronDown className="h-4 w-4" />
                        </Link>
                    ) : (
                        <button onClick={() => openLoginDialog("login")} className="qf-v2-save">
                            {t.signIn}
                        </button>
                    )
                }
                total={data.metadata.totalCareers}
                fit={hasReport && profileMatch.score !== null ? { score: fitScore, label: fitLabel } : null}
                careers={filteredCareers}
                selected={selectedCareer}
                groups={data.jobGroups}
                fishImage={fishImage}
                onSelect={(slug) => updateQuery({ career: slug })}
                search={search}
                onSearch={setSearch}
                filters={[groupFilter, riasecFilter, trendFilter]}
                onFilters={[setGroupFilter, setRiasecFilter, setTrendFilter]}
                onClear={clearFilters}
                recommendations={recommendations}
                saved={isSaved}
                savePending={savePending}
                onSave={toggleSave}
                vietnamese={isVietnamese}
            >
                {detailPanels(true)}
            </MobileCareerDeck>
            {desktopConcept}
            <AnimatePresence>
                {toast ? (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className="qf-toast"
                        role="status"
                    >
                        {toast}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
