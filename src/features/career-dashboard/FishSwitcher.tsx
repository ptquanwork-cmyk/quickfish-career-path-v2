"use client";

import Image from "next/image";
import { useState } from "react";
import { FlaskConical, X } from "lucide-react";
import { getFishTheme } from "./design/fish-theme";

/** Every fish the survey can produce, in the order the archetype screen shows. */
export const ALL_FISH = ["Clownfish", "Shark", "Dolphin", "Salmon", "Swordfish", "Seahorse"] as const;

/**
 * Temporary preview control: forces the dashboard theme onto any fish so the
 * six palettes can be compared without retaking the quiz six times.
 *
 * Preview only — it never writes to the survey, and the label says so. Delete
 * this component and its one render site to remove the feature entirely.
 */
export default function FishSwitcher({
    value,
    realFish,
    onChange,
}: {
    value: string | null;
    realFish: string | null;
    onChange: (fishType: string | null) => void;
}) {
    const [open, setOpen] = useState(false);

    if (!open) {
        return (
            <button className="qf-switcher-fab" onClick={() => setOpen(true)} title="Preview fish themes">
                <FlaskConical className="h-4 w-4" />
                <span>Xem thử cá</span>
            </button>
        );
    }

    return (
        <div className="qf-switcher" role="dialog" aria-label="Preview fish themes">
            <div className="qf-switcher-head">
                <p>
                    Xem thử theme theo cá
                    <b>preview</b>
                </p>
                <button onClick={() => setOpen(false)} aria-label="Đóng"><X className="h-3.5 w-3.5" /></button>
            </div>

            <div className="qf-switcher-grid">
                {ALL_FISH.map((fishType) => {
                    const theme = getFishTheme(fishType);
                    if (!theme) return null;
                    const active = value === fishType;
                    return (
                        <button
                            key={fishType}
                            onClick={() => onChange(fishType)}
                            className={`qf-switcher-fish ${active ? "is-active" : ""}`}
                            style={{ borderColor: active ? theme.primary : undefined, background: active ? `${theme.header}33` : undefined }}
                            title={theme.fishName}
                        >
                            <Image src={theme.image} alt="" width={40} height={40} />
                            <span style={{ color: theme.ink }}>{theme.fishName.split(" ").slice(-1)[0]}</span>
                            <i style={{ background: theme.primary }} />
                        </button>
                    );
                })}
            </div>

            <button className="qf-switcher-reset" onClick={() => onChange(null)} disabled={!value}>
                {realFish ? `Về kết quả thật (${realFish})` : "Bỏ xem thử"}
            </button>
        </div>
    );
}
