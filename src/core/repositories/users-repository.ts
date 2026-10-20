import { AbstractRepository } from "@/core/repositories/abstract-repository";

export default class UsersRepository extends AbstractRepository {
    constructor() {
        super("users");
    }

    updateAuthUserProfile<R>(_body?: unknown): Promise<R> {
        return this.post<R>(_body);
    }
}
