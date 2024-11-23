import { SupabaseDataRepository } from "@common-module/supabase";
import GaiaNameEntity from "./GaiaNameEntity.js";
declare class GaiaNameRepository extends SupabaseDataRepository<GaiaNameEntity> {
    constructor();
    fetchByWallet(walletAddress: string): Promise<GaiaNameEntity | undefined>;
    fetchByName(name: string): Promise<GaiaNameEntity | undefined>;
    search(query: string): Promise<GaiaNameEntity[]>;
}
declare const _default: GaiaNameRepository;
export default _default;
//# sourceMappingURL=GaiaNameRepository.d.ts.map