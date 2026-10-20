"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Stand-in for the app's locale-aware <Link>. Nothing outside the dashboard
 * is deployed here, so in-app links (survey, profile, report) are rendered as
 * inert anchors rather than 404s.
 */
export function Link({ href, ...props }: Omit<ComponentProps<typeof NextLink>, "href"> & { href: unknown }) {
    return <NextLink {...props} href="#" onClick={(event) => event.preventDefault()} />;
}
export type LocaleOptions = "vi" | "en";
