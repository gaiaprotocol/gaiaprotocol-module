import { SupabaseDataRepository } from "@common-module/supabase";
import GameEntity from "./GameEntity.js";
declare class GameRepository extends SupabaseDataRepository<GameEntity> {
    constructor();
    insert(game: GameEntity): Promise<GameEntity>;
    update(game: GameEntity): Promise<GameEntity>;
    fetchById(id: number): Promise<GameEntity | undefined>;
    fetchBySlug(slug: string): Promise<GameEntity | undefined>;
    fetchByOwner(owner: string): Promise<GameEntity[]>;
}
declare const _default: GameRepository;
export default _default;
//# sourceMappingURL=GameRepository.d.ts.map