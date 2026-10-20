"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@/i18n/routing";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import {
    ArrowDownUp,
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    Fish,
    Heart,
    Home,
    MapPin,
    Search,
    SlidersHorizontal,
    User,
    X,
} from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import type { CareerRecord } from "./types";
import { getCareerSummary } from "./career-summary";

const covers: Record<string, string> = {
    "Arts & Communications": "arts",
    "Business & Management": "business",
    "Green Economy & Sustainability": "green",
    "Healthcare & Medicine": "health",
    "Law & Public Safety": "law",
    "Science & Research": "science",
    "Social Sciences & Education": "education",
    "Technology & Engineering": "technology",
    "Transportation & Logistics": "logistics",
};
export function careerCover(career: CareerRecord) {
    return `/assets/career-deck/${covers[career.jobGroup] || "technology"}.png`;
}

type Props = {
    careers: CareerRecord[];
    selected: CareerRecord;
    groups: string[];
    fishImage: string;
    onSelect: (slug: string) => void;
    search: string;
    onSearch: (value: string) => void;
    filters: string[];
    onFilters: Array<(value: string) => void>;
    onClear: () => void;
    recommendations: ReactNode;
    children: ReactNode;
    saved: boolean;
    savePending: boolean;
    onSave: () => void;
    vietnamese: boolean;
    total: number;
    fit: { score: number; label: string } | null;
    /** Avatar link or sign-in button for the concept app header. */
    account: ReactNode;
};

const TREND_KEYS = ["strong-growth", "top-growth", "growth", "stable", "decline"] as const;
const TREND_LABELS: Record<string, [string, string]> = {
    "strong-growth": ["Tăng mạnh", "Strong growth"],
    "top-growth": ["Top tăng", "Top growth"],
    growth: ["Đang tăng", "Growth"],
    stable: ["Ổn định", "Stable"],
    decline: ["Đang giảm", "Decline"],
};
const trendLabel = (status: string, vi: boolean) => TREND_LABELS[status]?.[vi ? 0 : 1] ?? status;

function SwipeCard({
    children,
    vertical,
    direction,
    canSwipe,
    onSwipe,
    onDragTime,
}: {
    children: ReactNode;
    vertical: boolean;
    direction: number;
    canSwipe: boolean;
    onSwipe: (direction: number) => void;
    onDragTime: () => void;
}) {
    const reduced = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-240, 0, 240], [-12, 0, 12]);
    return (
        <motion.div
            className="qf-discovery-card"
            drag={vertical ? "y" : "x"}
            dragMomentum={false}
            custom={{ vertical, direction }}
            variants={{
                enter: ({ vertical, direction }) => ({
                    x: vertical ? 0 : direction * 60,
                    y: vertical ? direction * 50 : 14,
                    opacity: 0,
                    scale: 0.92,
                    zIndex: 1,
                }),
                exit: ({ vertical, direction }) => ({
                    x: vertical ? 0 : -direction * 460,
                    y: vertical ? -direction * 560 : 40,
                    rotate: vertical ? 0 : -direction * 14,
                    opacity: 0,
                    scale: 0.94,
                    zIndex: 2,
                    transition: { type: "spring", stiffness: 220, damping: 28 },
                }),
            }}
            initial={reduced ? false : "enter"}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1, zIndex: 1 }}
            exit="exit"
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
            dragElastic={0.85}
            whileTap={reduced ? undefined : { scale: 0.985 }}
            style={{ x, y, rotate: vertical || reduced ? 0 : rotate, touchAction: vertical ? "pan-x" : "pan-y" }}
            onDragStart={onDragTime}
            onDragEnd={(_, info) => {
                onDragTime();
                const distance = vertical ? info.offset.y : info.offset.x;
                const speed = vertical ? info.velocity.y : info.velocity.x;
                if (canSwipe && (Math.abs(distance) > 55 || Math.abs(speed) > 450)) onSwipe(distance < 0 ? 1 : -1);
                else {
                    animate(x, 0, { type: "spring", stiffness: 380, damping: 30 });
                    animate(y, 0, { type: "spring", stiffness: 380, damping: 30 });
                }
            }}
        >
            {children}
        </motion.div>
    );
}

export default function MobileCareerDeck(p: Props) {
    const [open, setOpen] = useState(false);
    const [vertical, setVertical] = useState(false);
    const [related, setRelated] = useState(false);
    const [direction, setDirection] = useState(1);
    const lastDrag = useRef(0);
    const vi = p.vietnamese;
    const name = (c: CareerRecord) => c.name[vi ? "vi" : "en"];
    const relatedRows = p.careers.filter((c) => c.slug === p.selected.slug || p.selected.similarCareerSlugs.includes(c.slug));
    const rows = related ? relatedRows : p.careers;
    const selectedIndex = rows.findIndex((c) => c.slug === p.selected.slug);
    const index = selectedIndex < 0 ? 0 : selectedIndex;
    const card = rows[index];
    const next = rows.length > 1 ? rows[(index + 1) % rows.length] : undefined;
    const step = (direction: number) => {
        if (!rows.length) return;
        setDirection(direction);
        if (typeof navigator !== "undefined") navigator.vibrate?.(8);
        p.onSelect(rows[(index + direction + rows.length) % rows.length].slug);
    };
    const inspect = () => {
        if (Date.now() - lastDrag.current < 400) return;
        if (card) {
            p.onSelect(card.slug);
            setOpen(true);
        }
    };
    return (
        <section className="qf-mobile-discovery" aria-label={vi ? "Khám phá nghề bằng thẻ" : "Discover career cards"}>
            <div className="qf-deck-apphead">
                <img src="/assets/logos/main_logo.svg" alt="QuickFish" />
                <div>{p.account}</div>
            </div>
            <div className="qf-deck-heading qf-deck-heading--concept">
                <div>
                    <p>{vi ? "KHÁM PHÁ NGHỀ NGHIỆP" : "CAREER DISCOVERY"}</p>
                    <h1>{vi ? "Tìm hướng đi của bạn" : "Find your direction"}</h1>
                    <span>
                        {p.total} {vi ? "nghề" : "careers"} · {p.groups.length} {vi ? "nhóm nghề" : "job groups"}
                    </span>
                </div>
            </div>
            <label className="qf-deck-search">
                <Search size={18} />
                <input
                    aria-label={vi ? "Tìm nghề trên mobile" : "Search mobile careers"}
                    placeholder={vi ? "Bạn muốn khám phá nghề gì?" : "Find a career…"}
                    value={p.search}
                    onChange={(e) => p.onSearch(e.target.value)}
                />
                {p.search && (
                    <button aria-label={vi ? "Xóa tìm kiếm" : "Clear search"} onClick={() => p.onSearch("")}>
                        <X size={16} />
                    </button>
                )}
            </label>
            <details className="qf-deck-filters">
                <summary>
                    <>
                        <span className="qf-deck-filterpill">
                            <SlidersHorizontal size={16} />
                            {vi ? "Bộ lọc" : "Filters"}
                            <ChevronDown size={15} />
                        </span>
                        <span className="qf-deck-count">
                            {p.careers.length} {vi ? "nghề" : "careers"}
                            <ChevronDown size={15} />
                        </span>
                    </>
                </summary>
                <div>
                    <label>
                        {vi ? "Nhóm nghề" : "Career family"}
                        <select value={p.filters[0]} onChange={(e) => p.onFilters[0](e.target.value)}>
                            <option value="all">{vi ? "Tất cả nhóm" : "All families"}</option>
                            {p.groups.map((g) => (
                                <option key={g}>{g}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        RIASEC
                        <select value={p.filters[1]} onChange={(e) => p.onFilters[1](e.target.value)}>
                            <option value="all">{vi ? "Tất cả sở thích" : "All interests"}</option>
                            {["R", "I", "A", "S", "E", "C"].map((g) => (
                                <option key={g}>{g}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        {vi ? "Xu hướng" : "Trend"}
                        <select value={p.filters[2]} onChange={(e) => p.onFilters[2](e.target.value)}>
                            <option value="all">{vi ? "Tất cả xu hướng" : "All trends"}</option>
                            {TREND_KEYS.map((g) => (
                                <option key={g} value={g}>
                                    {trendLabel(g, vi)}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button onClick={p.onClear}>{vi ? "Đặt lại bộ lọc" : "Reset filters"}</button>
                </div>
            </details>
            <div className="qf-deck-options">
                <div>
                    <button aria-pressed={!related} onClick={() => setRelated(false)}>
                        {vi ? "Tất cả nghề" : "All careers"}
                    </button>
                    <button aria-pressed={related} onClick={() => setRelated(true)}>
                        {vi ? "Nghề liên quan" : "Related"}
                    </button>
                </div>
                <button className="qf-deck-axis" aria-pressed={vertical} onClick={() => setVertical(!vertical)}>
                    <ArrowDownUp size={14} />
                    {vertical ? (vi ? "Vuốt dọc" : "Vertical") : vi ? "Vuốt ngang" : "Horizontal"}
                </button>
            </div>
            {card ? (
                <>
                    <div className={`qf-deck-stack ${vertical ? "is-vertical" : ""}`}>
                        <div className="qf-deck-back qf-deck-back--far" aria-hidden="true" />
                        <div className="qf-deck-back" aria-hidden="true">
                            {next && (
                                <motion.img
                                    key={next.slug}
                                    src={careerCover(next)}
                                    alt=""
                                    initial={{ opacity: 0, scale: 1.08 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                />
                            )}
                        </div>
                        <AnimatePresence mode="sync" initial={false} custom={{ vertical, direction }}>
                            <SwipeCard
                                key={card.slug}
                                vertical={vertical}
                                direction={direction}
                                canSwipe={rows.length > 1}
                                onSwipe={step}
                                onDragTime={() => {
                                    lastDrag.current = Date.now();
                                }}
                            >
                                <button
                                    className="qf-card-open"
                                    onClick={inspect}
                                    aria-label={`${vi ? "Xem chi tiết" : "View details"}: ${name(card)}`}
                                >
                                    <div className="qf-card-art">
                                        <img className="qf-card-cover" src={careerCover(card)} alt="" draggable={false} />
                                        <span className="qf-card-category">{card.jobGroup}</span>
                                        <img className="qf-card-fish" src={p.fishImage} alt="" draggable={false} />
                                    </div>
                                    <div className="qf-card-copy">
                                        <>
                                            <p className="qf-card-number">
                                                #{String(card.id).padStart(3, "0")} · RIASEC {card.riasec.code}
                                            </p>
                                            <h2>{name(card)}</h2>
                                            <p className="qf-card-summary">{getCareerSummary(card, vi)}</p>
                                            <div className="qf-card-stats qf-card-stats--concept">
                                                <span>
                                                    {vi ? "Lương tại Việt Nam" : "Vietnam salary"}
                                                    <strong>
                                                        {vi
                                                            ? card.salary.vietnam.replace(/\s*million VND\/month$/i, " triệu")
                                                            : card.salary.vietnam.replace(/\s*VND\/month$/i, "")}
                                                    </strong>
                                                    <small>{vi ? "VNĐ / tháng" : "VND / month"}</small>
                                                </span>
                                                <span>
                                                    {vi ? "Hạng phổ biến" : "Popularity"}
                                                    <strong>
                                                        #{card.trend.rank ?? "—"} · {trendLabel(card.trend.status, vi)}
                                                    </strong>
                                                </span>
                                            </div>
                                        </>
                                        <span className={`qf-card-detail-link ${"qf-card-cta"}`}>
                                            {vi ? "Khám phá nghề này" : "Explore this career"}
                                            <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </button>
                                {card.slug === p.selected.slug ? (
                                    <button
                                        className="qf-card-heart"
                                        onClick={p.onSave}
                                        disabled={p.savePending}
                                        aria-pressed={p.saved}
                                        aria-label={p.saved ? (vi ? "Bỏ lưu nghề" : "Unsave career") : vi ? "Lưu nghề" : "Save career"}
                                    >
                                        <Heart size={20} fill={p.saved ? "currentColor" : "none"} />
                                    </button>
                                ) : null}
                            </SwipeCard>
                        </AnimatePresence>
                    </div>
                    <div className="qf-deck-navigation">
                        <button onClick={() => step(-1)} disabled={rows.length < 2} aria-label={vi ? "Nghề trước" : "Previous career"}>
                            <ArrowLeft size={19} />
                        </button>
                        <span aria-live="polite">
                            {index + 1} / {rows.length}
                            <small>{vi ? (vertical ? "Vuốt lên / xuống" : "Vuốt trái / phải") : "Swipe to explore"}</small>
                        </span>
                        <button onClick={() => step(1)} disabled={rows.length < 2} aria-label={vi ? "Nghề tiếp theo" : "Next career"}>
                            <ArrowRight size={19} />
                        </button>
                    </div>
                    {next && (
                        <button className="qf-deck-next" onClick={() => step(1)}>
                            <img src={careerCover(next)} alt="" />
                            <span>
                                <small>{vi ? "Tiếp trong bộ thẻ" : "Up next"}</small>
                                <strong>{name(next)}</strong>
                            </span>
                            <ArrowRight size={16} />
                        </button>
                    )}
                </>
            ) : (
                <div className="qf-deck-empty">
                    <Search size={28} />
                    <h2>{vi ? "Chưa tìm thấy nghề" : "No careers found"}</h2>
                    <p>{vi ? "Thử từ khóa khác hoặc mở rộng bộ lọc." : "Try another search or broader filters."}</p>
                    <button onClick={p.onClear}>{vi ? "Xem tất cả nghề" : "Show all careers"}</button>
                </div>
            )}
            <details className="qf-mobile-recommendations">
                <summary>
                    {vi ? "Nghề đề xuất từ báo cáo" : "Report recommendations"}
                    <ChevronDown size={16} />
                </summary>
                {p.recommendations}
            </details>
            <Link className="qf-deck-test-link" href="/survey">
                {vi ? "Làm bài test của bạn / làm lại" : "Take or retake your test"}
                <ArrowRight size={15} />
            </Link>
            <nav className="qf-deck-bottomnav" aria-label={vi ? "Điều hướng" : "Navigation"}>
                <Link href="/">
                    <Home size={20} />
                    {vi ? "Trang chủ" : "Home"}
                </Link>
                <Link href="/fish-tank">
                    <Fish size={20} />
                    {vi ? "Bể Cá" : "Fish tank"}
                </Link>
                <Link href="/career-path" aria-current="page">
                    <MapPin size={20} />
                    {vi ? "Lộ trình" : "Path"}
                </Link>
                <Link href="/profile">
                    <User size={20} />
                    {vi ? "Hồ sơ" : "Profile"}
                </Link>
            </nav>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="qf-mobile-overlay" />
                    <Dialog.Content className="qf-mobile-detail" aria-describedby="qf-mobile-detail-description">
                        <header>
                            <Dialog.Close aria-label={vi ? "Đóng chi tiết" : "Close details"}>
                                <ArrowLeft size={19} />
                            </Dialog.Close>
                            <span>{vi ? "Chi tiết nghề" : "Career details"}</span>
                            <button
                                onClick={p.onSave}
                                disabled={p.savePending}
                                aria-pressed={p.saved}
                                aria-label={p.saved ? (vi ? "Bỏ lưu nghề" : "Unsave career") : vi ? "Lưu nghề" : "Save career"}
                            >
                                <Heart size={18} fill={p.saved ? "currentColor" : "none"} />
                            </button>
                        </header>
                        <div className="qf-mobile-detail-scroll">
                            <motion.div
                                className="qf-mobile-detail-cover"
                                style={{ touchAction: "pan-y" }}
                                onPanEnd={(_, info) => {
                                    if (Math.abs(info.offset.x) > 55) step(info.offset.x < 0 ? 1 : -1);
                                }}
                            >
                                <img src={careerCover(p.selected)} alt="" draggable={false} />
                                <img src={p.fishImage} alt="" draggable={false} />
                            </motion.div>
                            <div className="qf-mobile-detail-intro">
                                <p>
                                    {p.selected.jobGroup} · {p.selected.riasec.code}
                                </p>
                                <Dialog.Title>{name(p.selected)}</Dialog.Title>
                                <p id="qf-mobile-detail-description">{getCareerSummary(p.selected, vi)}</p>
                                <div className="qf-mobile-detail-navigation">
                                    <button onClick={() => step(-1)} disabled={rows.length < 2}>
                                        <ArrowLeft size={15} />
                                        {vi ? "Trước" : "Previous"}
                                    </button>
                                    <span>
                                        {index + 1}/{rows.length}
                                    </span>
                                    <button onClick={() => step(1)} disabled={rows.length < 2}>
                                        {vi ? "Tiếp" : "Next"}
                                        <ArrowRight size={15} />
                                    </button>
                                </div>
                            </div>
                            <div className="qf-mobile-panels">{p.children}</div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </section>
    );
}
