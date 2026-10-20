import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Caveat } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ["vietnamese"],
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/** Handwritten accent used by the career dashboard's mascot captions. */
const caveat = Caveat({
    subsets: ["latin"],
    display: "swap",
    weight: ["500", "600"],
    variable: "--font-handwritten",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: "Career Path V2 — QuickFish (demo)",
    description: "132 careers, market signals, education pathways. Data-only review deployment.",
    robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="vi">
            <body className={`${beVietnamPro.className} ${caveat.variable}`}>{children}</body>
        </html>
    );
}
