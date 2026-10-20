import { AbstractRepository } from "@/core/repositories/abstract-repository";

export interface SavedCareerItem {
    career_slug: string;
    career_name: string;
    created_at: string;
}

export interface SavedCareerList {
    slugs: string[];
    items: SavedCareerItem[];
}

/**
 * Career bookmarks, persisted per user on the backend
 * (`/api/auth/profile/saved-careers/`).
 */
export class SavedCareersRepository extends AbstractRepository<SavedCareerList> {
    constructor() {
        super("auth/profile/saved-careers");
    }

    async list(): Promise<SavedCareerList> {
        return this.fetchOneWithoutId<SavedCareerList>();
    }

    /** Server-side toggle: returns the resulting state for that slug. */
    async toggle(
        careerSlug: string,
        careerName: string,
    ): Promise<{ saved: boolean; career_slug: string }> {
        return this.post<{ saved: boolean; career_slug: string }>({
            career_slug: careerSlug,
            career_name: careerName,
        });
    }
}

export const savedCareersRepository = new SavedCareersRepository();
