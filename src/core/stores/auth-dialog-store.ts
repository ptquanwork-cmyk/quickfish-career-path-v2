"use client";

/** Review build: no login dialog to open. */
export type AuthDialogState = { login: boolean; signup: boolean };

export interface AuthDialogStore {
    authDialogIsOpen: AuthDialogState;
    setAuthDialogOpen: (type: keyof AuthDialogState) => void;
    closeAuthDialogs: () => void;
}

const store: AuthDialogStore = {
    authDialogIsOpen: { login: false, signup: false },
    setAuthDialogOpen: () => undefined,
    closeAuthDialogs: () => undefined,
};

export default function useAuthDialogStore<T>(selector: (state: AuthDialogStore) => T): T {
    return selector(store);
}
