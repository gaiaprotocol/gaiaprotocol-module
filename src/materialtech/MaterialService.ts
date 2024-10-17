import { SupabaseService } from "@common-module/supabase";
import Material, { MaterialQuery } from "../db-interfaces/Material.js";

class MaterialService extends SupabaseService<Material> {
  constructor() {
    super("materials", MaterialQuery);
  }

  public async fetchMaterial(chain: string, address: string) {
    return await super.fetchSingle((b) =>
      b.eq("chain", chain).eq("address", address)
    );
  }
}

export default new MaterialService();
