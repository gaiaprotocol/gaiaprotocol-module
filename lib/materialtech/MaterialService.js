import { SupabaseService } from "@common-module/supabase";
import { MaterialQuery } from "../db-interface/Material.js";
class MaterialService extends SupabaseService {
    constructor() {
        super("materials", MaterialQuery, 100);
    }
    async fetchMaterial(chain, address) {
        return await super.fetchSingle((b) => b.eq("chain", chain).eq("address", address));
    }
}
export default new MaterialService();
//# sourceMappingURL=MaterialService.js.map