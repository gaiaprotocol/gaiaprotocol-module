import { SupabaseService } from "@common-module/supabase";
import GameMaterial, {
  GameMaterialQuery,
} from "../entities/GameMaterial.js";
import Material from "../entities/Material.js";

class GameMaterialService extends SupabaseService<GameMaterial> {
  constructor() {
    super("game_materials", GameMaterialQuery);
  }

  public async addMaterial(game: string, chain: string, address: string) {
    return await super.insert({ game, chain, address });
  }

  public async removeMaterial(game: string, chain: string, address: string) {
    await super.delete((b) =>
      b.eq("game", game).eq("chain", chain).eq("address", address)
    );
  }

  public async fetchAllMaterials(game: string) {
    return (await super.fetch<{
      game: string;
      material: Material;
      created_at: string;
    }>((b) => b.eq("game", game), "*, material:materials(*)")).map((gm) => {
      return gm.material;
    });
  }
}

export default new GameMaterialService();
