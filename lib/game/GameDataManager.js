import { EventContainer, ObjectUtils } from "@common-module/ts";
import GameRepository from "./GameRepository.js";
class GameDataManager extends EventContainer {
    gameCache = new Map();
    pendingRequests = new Map();
    setGame(game) {
        if (game.id) {
            const cachedGame = this.gameCache.get(game.id);
            if (!ObjectUtils.isEqual(cachedGame, game)) {
                this.gameCache.set(game.id, game);
                this.emit("gameUpdated", game);
            }
        }
    }
    async getGame(gameId) {
        const cachedGame = this.gameCache.get(gameId);
        if (cachedGame)
            return cachedGame;
        const pendingRequest = this.pendingRequests.get(gameId);
        if (pendingRequest)
            return pendingRequest;
        const game = await GameRepository.fetchById(gameId);
        if (game)
            this.setGame(game);
        return game;
    }
    async getGameBySlug(slug) {
        const cachedGame = Array.from(this.gameCache.values()).find((game) => game.slug === slug);
        if (cachedGame)
            return cachedGame;
        const game = await GameRepository.fetchBySlug(slug);
        if (game)
            this.setGame(game);
        return game;
    }
    async getGamesByOwner(owner) {
        const games = await GameRepository.fetchByOwner(owner);
        games.forEach((game) => this.setGame(game));
        return games;
    }
    async createGame(game) {
        const createdGame = await GameRepository.insert(game);
        this.setGame(createdGame);
        return createdGame;
    }
    async updateGame(game) {
        const updatedGame = await GameRepository.update(game);
        console.log(updatedGame);
        this.setGame(updatedGame);
        return updatedGame;
    }
}
export default new GameDataManager();
//# sourceMappingURL=GameDataManager.js.map