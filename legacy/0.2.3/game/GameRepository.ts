import { SupabaseDataRepository } from "@common-module/supabase";
import GameEntity, { GameQuery } from "./GameEntity.js";

class GameRepository extends SupabaseDataRepository<GameEntity> {
  constructor() {
    super("games", GameQuery);
  }

  public async insert(game: GameEntity): Promise<GameEntity> {
    return await this.safeInsert(game);
  }

  public async update(game: GameEntity): Promise<GameEntity> {
    if (!game.id) throw new Error("Game must have an id to be updated");

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
