"use client";

import { useSearchParams } from "next/navigation";

/**
 * Review-build only. The product app switches language through the `/[locale]`
 * route; this deployment has no such route, so the language rides on `?lang=`.
 */
export default function LocaleToggle() {
    const isEnglish = useSearchParams().get("lang") === "en";

    return (
        <div className="qf-locale-toggle">
            <a href="/" aria-current={!isEnglish} className={isEnglish ? "" : "is-active"}>VI</a>
            <a href="/?lang=en" aria-current={isEnglish} className={isEnglish ? "is-active" : ""}>EN</a>
        </div>
    );
}
