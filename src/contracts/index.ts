export type BaseContract<T = {}> = {
    id: number;
    created_at?: string;
    updated_at?: string;
} & T;
