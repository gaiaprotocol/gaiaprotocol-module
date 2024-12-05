import { SupabaseDataRepository } from "@common-module/supabase";
import { GameQuery } from "./GameEntity.js";
class GameRepository extends SupabaseDataRepository {
    constructor() {
        super("games", GameQuery);
    }
    async createGame(game) {
        return await this.insert(game);
    }
    async fetchBySlug(slug) {
        return await this.fetchSingle((b) => b.eq("slug", slug));
    }
}
export default new GameRepository();
//# sourceMappingURL=GameRepository.js.map