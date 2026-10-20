"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A dashboard tile that can be blown up to the centre of the screen.
 *
 * The compact tile trades completeness for fit — meters are capped, text is
 * clamped. Zooming lifts those limits (`data-zoom="on"` switches the clamps
 * off in CSS) so the full content is readable without leaving the dashboard.
 */
export default function ZoomTile({
    className = "",
    label,
    zoomLabel,
    children,
}: {
    className?: string;
    /** Accessible name for the expand control. */
    label: string;
    zoomLabel: string;
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <>
            <section className={`qf-tile qf-zoomable ${className}`}>
                <button
                    type="button"
                    className="qf-zoom-btn"
                    onClick={() => setOpen(true)}
                    aria-label={`${zoomLabel}: ${label}`}
                    title={zoomLabel}
                >
                    <Expand className="h-3 w-3" />
                </button>
                {children}
            </section>

            {mounted && open
                ? createPortal(
                    <AnimatePresence>
                        <motion.div
                            className="qf-zoom-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            onClick={() => setOpen(false)}
                            role="presentation"
                          >
                            <motion.div
                                className="qf-zoom-card"
                                data-zoom="on"
                                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                                transition={{ type: "spring", stiffness: 340, damping: 30, mass: 0.7 }}
                                onClick={(event) => event.stopPropagation()}
                                role="dialog"
                                aria-modal="true"
                                aria-label={label}
                              >
                                <button
                                    type="button"
                                    className="qf-zoom-close"
                                    onClick={() => setOpen(false)}
                                    aria-label="Đóng"
                                  >
                                    <X className="h-4 w-4" />
                                </button>
                                {children}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>,
                      document.body,
                  )
                : null}
        </>
    );
}
