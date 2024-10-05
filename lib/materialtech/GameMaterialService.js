import { SupabaseService } from "@common-module/supabase";
import { GameMaterialQuery, } from "../db-interface/GameMaterial.js";
class GameMaterialService extends SupabaseService {
    constructor() {
        super("game_materials", GameMaterialQuery);
    }
    async addMaterial(game, chain, address) {
        return await super.insert({ game, chain, address });
    }
    async removeMaterial(game, chain, address) {
        await super.delete((b) => b.eq("game", game).eq("chain", chain).eq("address", address));
    }
    async fetchAllMaterials(game) {
        return (await super.fetch((b) => b.eq("game", game), "*, material:materials(*)")).map((gm) => {
            return gm.material;
        });
    }
}
export default new GameMaterialService();
//# sourceMappingURL=GameMaterialService.js.map