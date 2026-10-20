import { getJungTypologyData } from "@/components/survey/utils/jung-typology-mapping-utils";
import type { CSSProperties } from "react";

/**
 * Re-skins the dashboard around the fish a user's report produced.
 *
 * `jungTypologyMap` already carries a palette per fish (primary / header /
 * background), so the accent is derived from that rather than invented. The one
 * thing it does not carry is a text-safe shade: Clownfish's #F47A23 is 2.9:1 on
 * white, well under WCAG AA. `readableInk` darkens each primary until it clears
 * 4.5:1, which is the rule design-language.json states for accent text.
 */

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb {
    const value = hex.replace("#", "");
    const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
    return {
        r: parseInt(full.slice(0, 2), 16),
        g: parseInt(full.slice(2, 4), 16),
        b: parseInt(full.slice(4, 6), 16),
    };
}

function rgbToHex({ r, g, b }: Rgb): string {
    const channel = (value: number) => Math.round(Math.max(0, Math.min(255, value))).toString(16).padStart(2, "0");
    return `#${channel(r)}${channel(g)}${channel(b)}`;
}

/** Relative luminance per WCAG 2.1. */
function luminance({ r, g, b }: Rgb): number {
    const channel = (raw: number) => {
        const c = raw / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastOnWhite(rgb: Rgb): number {
    return 1.05 / (luminance(rgb) + 0.05);
}

/** Mixes `hex` toward white; amount 0 = untouched, 1 = white. */
function tint(hex: string, amount: number): string {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex({
        r: r + (255 - r) * amount,
        g: g + (255 - g) * amount,
        b: b + (255 - b) * amount,
    });
}

/** Mixes `hex` toward black; amount 0 = untouched, 1 = black. */
function shade(hex: string, amount: number): string {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex({ r: r * (1 - amount), g: g * (1 - amount), b: b * (1 - amount) });
}

/** Darkens until the colour is legible as text on white (>= 4.5:1). */
function readableInk(hex: string): string {
    let current = hex;
    for (let step = 0; step < 24; step += 1) {
        if (contrastOnWhite(hexToRgb(current)) >= 4.5) return current;
        current = shade(current, 0.08);
    }
    return current;
}

export interface FishTheme {
    fishType: string;
    fishName: string;
    /** Personality code, e.g. "ESF". */
    code: string;
    image: string;
    primary: string;
    header: string;
    ink: string;
    vars: CSSProperties;
}

export function getFishTheme(fishType: string | null | undefined): FishTheme | null {
    if (!fishType) return null;
    const data = getJungTypologyData(fishType);
    if (!data) return null;

    const primary = data.primary_color;
    const header = data.header_color;
    const ink = readableInk(primary);

    return {
        fishType,
        fishName: data.fish.fish_name,
        code: data.type,
        // next/image rejects SVG unless `dangerouslyAllowSVG` is on (it is not),
        // and every fish ships a .png sibling.
        image: data.fish.fish_img_path.replace(/\.svg$/, ".png"),
        primary,
        header,
        ink,
        vars: {
            "--qf-orange": primary,
            "--qf-orange-deep": shade(primary, 0.14),
            "--qf-orange-ink": ink,
            "--qf-orange-soft": tint(header, 0.78),
            "--qf-orange-softer": tint(header, 0.9),
            "--qf-amber": header,
            "--qf-amber-soft": tint(header, 0.45),
            "--qf-page": data.background_color,
            "--qf-sand": tint(header, 0.93),
            "--qf-sand-deep": tint(header, 0.86),
            "--qf-border": tint(header, 0.8),
            "--qf-border-strong": tint(header, 0.66),
            "--qf-gradient-sand": `linear-gradient(103deg, ${tint(header, 0.3)} 0%, ${tint(header, 0.42)} 46%, ${tint(header, 0.52)} 100%)`,
            "--qf-gradient-cta": `linear-gradient(135deg, ${tint(primary, 0.1)} 0%, ${shade(primary, 0.12)} 100%)`,
            "--qf-gradient-orange-bars": `linear-gradient(180deg, ${tint(primary, 0.35)} 0%, ${primary} 100%)`,
            "--qf-gradient-orange-meter": `linear-gradient(90deg, ${primary} 0%, ${header} 100%)`,
            "--qf-shadow-cta": `0 8px 20px ${primary}4D`,
            /** Consumed by the coral mask so the reef matches the fish. */
            "--qf-coral": tint(header, 0.34),
            "--qf-coral-deep": tint(header, 0.12),
        } as CSSProperties,
    };
}

/** Default reef colour when the visitor has no report yet. */
export const defaultCoralVars = {
    "--qf-coral": "#FBE3B0",
    "--qf-coral-deep": "#F7D291",
} as CSSProperties;
