"use client";

/**
 * DEMO STUB of the app's AuthProvider hooks. Signed in as the local demo
 * account with its real latest test (Smarty Salmon) so fit, report
 * recommendations and the fish theme render as they do for a real user.
 * Add `?guest=1` to the URL to see the signed-out state.
 */
import { useSearchParams } from "next/navigation";
import type { User } from "@/core/models/user";
import demoUser from "@/demo/demo-user.json";

export function useUser(): User | null {
    return useSearchParams().get("guest") === "1" ? null : (demoUser as unknown as User);
}

export function useAuthActions() {
    return { refetchUser: async () => undefined };
}

export function useIsAuthenticated(): boolean {
    return useUser() !== null;
}
