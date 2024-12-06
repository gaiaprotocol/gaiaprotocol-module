import { SupabaseDataRepository } from "@common-module/supabase";
import { MaterialQuery } from "./MaterialEntity.js";
class MaterialRepository extends SupabaseDataRepository {
    constructor() {
        super("materials", MaterialQuery);
    }
    async fetchByAddress(address) {
        return await this.fetchSingle((b) => b.eq("address", address));
    }
}
export default new MaterialRepository();
//# sourceMappingURL=MaterialRepository.js.map