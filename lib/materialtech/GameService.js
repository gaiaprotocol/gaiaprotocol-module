import { SupabaseService } from "@common-module/supabase";
import { GameQuery } from "../db-interface/Game.js";
class GameService extends SupabaseService {
    constructor() {
        super("games", GameQuery);
    }
    async fetchGame(id) {
        return await super.fetchSingle((b) => b.eq("id", id));
    }
    async createGame(name) {
        return await super.insert({ name });
    }
}
export default new GameService();
//# sourceMappingURL=GameService.js.map