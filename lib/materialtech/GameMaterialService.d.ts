import { SupabaseService } from "@common-module/supabase";
import GameMaterial from "../db-interface/GameMaterial.js";
import Material from "../db-interface/Material.js";
declare class GameMaterialService extends SupabaseService<GameMaterial> {
    constructor();
    addMaterial(game: string, chain: string, address: string): Promise<GameMaterial>;
    removeMaterial(game: string, chain: string, address: string): Promise<void>;
    fetchAllMaterials(game: string): Promise<Material[]>;
}
declare const _default: GameMaterialService;
export default _default;
//# sourceMappingURL=GameMaterialService.d.ts.map