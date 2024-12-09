import { EventContainer, ObjectUtils } from "@common-module/ts";
import GameEntity from "./GameEntity.js";
import GameRepository from "./GameRepository.js";

class GameDataManager extends EventContainer<{
  gameUpdated: (game: GameEntity) => void;
}> {
  private gameCache = new Map<number, GameEntity>();
  private pendingRequests = new Map<number, Promise<GameEntity>>();

  public setGame(game: GameEntity) {
    if (game.id) {
      const cachedGame = this.gameCache.get(game.id);

      if (!ObjectUtils.isEqual(cachedGame, game)) {
        this.gameCache.set(game.id, game);
        this.emit("gameUpdated", game);
      }
    }
  }

  public async getGame(gameId: number): Promise<GameEntity | undefined> {
    const cachedGame = this.gameCache.get(gameId);
    if (cachedGame) return cachedGame;

    const pendingRequest = this.pendingRequests.get(gameId);
    if (pendingRequest) return pendingRequest;

    const game = await GameRepository.fetchById(gameId);
    if (game) this.setGame(game);
    return game;
  }
}

export default new GameDataManager();
