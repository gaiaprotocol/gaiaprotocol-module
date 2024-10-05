import { SupabaseService } from "@common-module/supabase";
import Game from "../db-interface/Game.js";
declare class GameService extends SupabaseService<Game> {
    constructor();
    fetchGame(id: string): Promise<Game | undefined>;
    createGame(name: string): Promise<Game>;
}
declare const _default: GameService;
export default _default;
//# sourceMappingURL=GameService.d.ts.map