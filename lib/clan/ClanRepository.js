import { SupabaseDataRepository } from "@common-module/supabase";
import { ClanQuery } from "./ClanEntity.js";
class ClanRepository extends SupabaseDataRepository {
    constructor() {
        super("clans", ClanQuery);
    }
    async fetchById(id) {
        return await this.fetchSingle((b) => b.eq("id", id));
    }
}
export default new ClanRepository();
//# sourceMappingURL=ClanRepository.js.map