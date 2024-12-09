import { SupabaseDataRepository } from "@common-module/supabase";
import MaterialEntity from "./MaterialEntity.js";
declare class MaterialRepository extends SupabaseDataRepository<MaterialEntity> {
    constructor();
    fetchByAddress(address: string): Promise<MaterialEntity | undefined>;
    fetchByGame(gameId: number): Promise<MaterialEntity[]>;
}
declare const _default: MaterialRepository;
export default _default;
//# sourceMappingURL=MaterialRepository.d.ts.map