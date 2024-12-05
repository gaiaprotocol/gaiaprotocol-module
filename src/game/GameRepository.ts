import { SupabaseDataRepository } from "@common-module/supabase";
import GameEntity, { GameQuery } from "./GameEntity.js";

class GameRepository extends SupabaseDataRepository<GameEntity> {
  constructor() {
    super("games", GameQuery);
  }

  public async createGame(game: GameEntity): Promise<GameEntity> {
    return await this.insert(game);
  }

  public async fetchBySlug(slug: string): Promise<GameEntity | undefined> {
    return await this.fetchSingle((b) => b.eq("slug", slug));
  }
}

export default new GameRepository();
