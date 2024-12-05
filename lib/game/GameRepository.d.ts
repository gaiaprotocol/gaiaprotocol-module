import { SupabaseDataRepository } from "@common-module/supabase";
import GameEntity from "./GameEntity.js";
declare class GameRepository extends SupabaseDataRepository<GameEntity> {
    constructor();
    createGame(game: GameEntity): Promise<GameEntity>;
    fetchBySlug(slug: string): Promise<GameEntity | undefined>;
}
declare const _default: GameRepository;
export default _default;
//# sourceMappingURL=GameRepository.d.ts.map