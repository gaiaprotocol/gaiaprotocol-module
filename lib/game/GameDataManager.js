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
}
export default new GameDataManager();
//# sourceMappingURL=GameDataManager.js.map