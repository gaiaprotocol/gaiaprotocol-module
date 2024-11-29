import { SupabaseDataRepository } from "@common-module/supabase";
import GameEntity, { GameQuery } from "./GameEntity.js";

class GameRepository extends SupabaseDataRepository<GameEntity> {
  constructor() {
    super("games", GameQuery);
  }
}

export default new GameRepository();
