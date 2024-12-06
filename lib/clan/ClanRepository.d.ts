import { SupabaseDataRepository } from "@common-module/supabase";
import ClanEntity from "./ClanEntity.js";
declare class ClanRepository extends SupabaseDataRepository<ClanEntity> {
    constructor();
    fetchById(id: number): Promise<ClanEntity | undefined>;
}
declare const _default: ClanRepository;
export default _default;
//# sourceMappingURL=ClanRepository.d.ts.map