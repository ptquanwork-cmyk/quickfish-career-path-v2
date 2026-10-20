import language from "./design-language.json";
import layout from "./dashboard-layout.json";
import type { CSSProperties } from "react";

export const careerDesignLanguage = language;
export const careerDashboardLayout = layout;

const { color, radius, shadow } = language;

/**
 * The design-language JSON is the source of truth; this flattens the slice the
 * stylesheet needs into CSS custom properties so the two can never drift.
 */
export const careerDashboardCssVariables = {
    "--qf-orange": color.brand.orange,
    "--qf-orange-deep": color.brand.orangeDeep,
    "--qf-orange-ink": color.brand.orangeInk,
    "--qf-orange-soft": color.brand.orangeSoft,
    "--qf-orange-softer": color.brand.orangeSofter,
    "--qf-amber": color.brand.amber,
    "--qf-amber-soft": color.brand.amberSoft,
    "--qf-blue": color.brand.blue,
    "--qf-blue-soft": color.brand.blueSoft,

    "--qf-ink": color.ink["900"],
    "--qf-ink-800": color.ink["800"],

    "--qf-text": color.text.primary,
    "--qf-text-secondary": color.text.secondary,
    "--qf-text-muted": color.text.muted,

    "--qf-page": color.surface.page,
    "--qf-card": color.surface.card,
    "--qf-sand": color.surface.sand,
    "--qf-sand-deep": color.surface.sandDeep,

    "--qf-border": color.border.subtle,
    "--qf-border-strong": color.border.default,
    "--qf-border-dark": color.border.onDark,

    "--qf-success": color.semantic.success,
    "--qf-success-soft": color.semantic.successSoft,
    "--qf-warning": color.semantic.warning,
    "--qf-danger": color.semantic.danger,

    "--qf-gradient-sand": color.gradient.sand,
    "--qf-gradient-cta": color.gradient.cta,
    "--qf-gradient-orange-bars": color.gradient.orangeBars,
    "--qf-gradient-orange-meter": color.gradient.orangeMeter,

    "--qf-radius-md": `${radius.md}px`,
    "--qf-radius-card": `${radius.card}px`,
    "--qf-radius-banner": `${radius.banner}px`,

    "--qf-shadow-card": shadow.card,
    "--qf-shadow-raised": shadow.raised,
    "--qf-shadow-cta": shadow.cta,
} as CSSProperties;

export const careerChartPalette = language.charts;
export const careerMotion = language.motion;
