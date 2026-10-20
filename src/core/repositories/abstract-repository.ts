/**
 * DEMO STUB of the app's AbstractRepository. Only the saved-careers endpoint
 * is emulated (in localStorage) so "Lưu nghề" works without a backend; every
 * other call rejects and the dashboard already handles that.
 * Real endpoint: GET/POST /api/auth/profile/saved-careers/ (see backend/ in this repo).
 */
const SAVED_KEY = "qf-demo-saved-careers";
type SavedItem = { career_slug: string; career_name: string; created_at: string };

function readSaved(): SavedItem[] {
    try { return JSON.parse(window.localStorage.getItem(SAVED_KEY) || "[]"); } catch { return []; }
}

export class AbstractRepository<T = unknown> {
    constructor(protected readonly path: string) {}

    protected offline(): Promise<never> {
        return Promise.reject(new Error(`No backend in the demo build (${this.path})`));
    }

    fetchOneWithoutId<R>(): Promise<R> {
        if (this.path !== "auth/profile/saved-careers") return this.offline();
        const items = readSaved();
        return Promise.resolve({ slugs: items.map((item) => item.career_slug), items } as R);
    }

    post<R>(body?: unknown): Promise<R> {
        if (this.path !== "auth/profile/saved-careers") return this.offline();
        const { career_slug, career_name } = body as { career_slug: string; career_name: string };
        const items = readSaved();
        const exists = items.some((item) => item.career_slug === career_slug);
        const next = exists
            ? items.filter((item) => item.career_slug !== career_slug)
            : [{ career_slug, career_name, created_at: new Date().toISOString() }, ...items];
        try { window.localStorage.setItem(SAVED_KEY, JSON.stringify(next)); } catch { /* private mode */ }
        return Promise.resolve({ saved: !exists, career_slug } as R);
    }

    patch<R>(_body?: unknown): Promise<R> {
        return this.offline();
    }
}

export default AbstractRepository;
