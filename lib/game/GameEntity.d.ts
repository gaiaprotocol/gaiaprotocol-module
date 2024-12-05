export default interface GameEntity {
    id?: number;
    slug: string;
    owner?: string;
    name: string;
    summary?: string;
    description?: string;
    thumbnail_url?: string;
    screenshots: string[];
    trailer_url?: string;
    is_public?: boolean;
    created_at?: string;
    updated_at?: string;
}
export declare const GameQuery = "*";
//# sourceMappingURL=GameEntity.d.ts.map