"use client";

import { useSearchParams } from "next/navigation";

/**
 * Review build: the product app resolves the locale from the `/[locale]`
 * route segment. Here there is no such segment, so `?lang=en` picks English
 * and everything else falls back to the app's default locale, `vi`.
 */
export function useLocale(): string {
    return useSearchParams().get("lang") === "en" ? "en" : "vi";
}
