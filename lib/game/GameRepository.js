import { SupabaseDataRepository } from "@common-module/supabase";
import { GameQuery } from "./GameEntity.js";
class GameRepository extends SupabaseDataRepository {
    constructor() {
        super("games", GameQuery);
    }
    async insert(game) {
        return await this.safeInsert(game);
    }
    async update(game) {
        if (!game.id)
            throw new Error("Game must have an id to be updated");
        return await this.safeUpdate((b) => b.eq("id", game.id), {
            slug: game.slug,
            name: game.name,
            summary: game.summary,
            description: game.description,
            thumbnail_url: game.thumbnail_url,
            screenshots: game.screenshots,
            trailer_url: game.trailer_url,
        });
    }
    async fetchById(id) {
        return await this.fetchSingle((b) => b.eq("id", id));
    }
    async fetchBySlug(slug) {
        return await this.fetchSingle((b) => b.eq("slug", slug));
    }
    async fetchByOwner(owner) {
        return await this.fetch((b) => b.eq("owner", owner));
    }
}
export default new GameRepository();
//# sourceMappingURL=GameRepository.js.map