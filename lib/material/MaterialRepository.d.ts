import { SupabaseDataRepository } from "@common-module/supabase";
import MaterialEntity from "./MaterialEntity.js";
declare class MaterialRepository extends SupabaseDataRepository<MaterialEntity> {
    constructor();
    fetchByAddress(address: string): Promise<MaterialEntity | undefined>;
}
declare const _default: MaterialRepository;
export default _default;
//# sourceMappingURL=MaterialRepository.d.ts.map