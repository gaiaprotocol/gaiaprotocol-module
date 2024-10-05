import { SupabaseService } from "@common-module/supabase";
import Material from "../db-interface/Material.js";
declare class MaterialService extends SupabaseService<Material> {
    constructor();
    fetchMaterial(chain: string, address: string): Promise<Material | undefined>;
}
declare const _default: MaterialService;
export default _default;
//# sourceMappingURL=MaterialService.d.ts.map