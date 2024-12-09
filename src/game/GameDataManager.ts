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

  public async getGameBySlug(slug: string): Promise<GameEntity | undefined> {
    const cachedGame = Array.from(this.gameCache.values()).find((game) =>
      game.slug === slug
    );
    if (cachedGame) return cachedGame;

    const game = await GameRepository.fetchBySlug(slug);
    if (game) this.setGame(game);
    return game;
  }

  public async getGamesByOwner(owner: string): Promise<GameEntity[]> {
    const games = await GameRepository.fetchByOwner(owner);
    games.forEach((game) => this.setGame(game));
    return games;
  }

  public async createGame(game: GameEntity): Promise<GameEntity> {
    const createdGame = await GameRepository.insert(game);
    this.setGame(createdGame);
    return createdGame;
  }

  public async updateGame(game: GameEntity): Promise<GameEntity> {
    const updatedGame = await GameRepository.update(game);
    console.log(updatedGame);
    this.setGame(updatedGame);
    return updatedGame;
  }
}

export default new GameDataManager();
