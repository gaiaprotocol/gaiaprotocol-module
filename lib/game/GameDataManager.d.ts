import { EventContainer } from "@common-module/ts";
import GameEntity from "./GameEntity.js";
declare class GameDataManager extends EventContainer<{
    gameUpdated: (game: GameEntity) => void;
}> {
    private gameCache;
    private pendingRequests;
    setGame(game: GameEntity): void;
    getGame(gameId: number): Promise<GameEntity | undefined>;
    getGameBySlug(slug: string): Promise<GameEntity | undefined>;
    getGamesByOwner(owner: string): Promise<GameEntity[]>;
    createGame(game: GameEntity): Promise<GameEntity>;
    updateGame(game: GameEntity): Promise<GameEntity>;
}
declare const _default: GameDataManager;
export default _default;
//# sourceMappingURL=GameDataManager.d.ts.map