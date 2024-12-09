import { SupabaseDataRepository } from "@common-module/supabase";
import GameEntity, { GameQuery } from "./GameEntity.js";

class GameRepository extends SupabaseDataRepository<GameEntity> {
  constructor() {
    super("games", GameQuery);
  }

  public async insert(game: GameEntity): Promise<GameEntity> {
    return await super.insert(game);
  }

  public async update(game: GameEntity): Promise<GameEntity> {
    return await super.update(game);
  }

  public async fetchById(id: number): Promise<GameEntity | undefined> {
    return await this.fetchSingle((b) => b.eq("id", id));
  }

  public async fetchBySlug(slug: string): Promise<GameEntity | undefined> {
    return await this.fetchSingle((b) => b.eq("slug", slug));
  }

  public async fetchByOwner(owner: string): Promise<GameEntity[]> {
    return await this.fetch((b) => b.eq("owner", owner));
  }
}

export default new GameRepository();
