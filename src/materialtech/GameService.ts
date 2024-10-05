import { SupabaseService } from "@common-module/supabase";
import Game, { GameQuery } from "../db-interface/Game.js";

class GameService extends SupabaseService<Game> {
  constructor() {
    super("games", GameQuery);
  }

  public async fetchGame(id: string) {
    return await super.fetchSingle((b) => b.eq("id", id));
  }

  public async createGame(name: string) {
    return await super.insert({ name });
  }
}

export default new GameService();
