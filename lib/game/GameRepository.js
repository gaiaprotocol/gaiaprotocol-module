import { SupabaseDataRepository } from "@common-module/supabase";
import { GameQuery } from "./GameEntity.js";
class GameRepository extends SupabaseDataRepository {
    constructor() {
        super("games", GameQuery);
    }
}
export default new GameRepository();
//# sourceMappingURL=GameRepository.js.map