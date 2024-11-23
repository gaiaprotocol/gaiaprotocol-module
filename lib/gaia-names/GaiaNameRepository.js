import { SupabaseDataRepository } from "@common-module/supabase";
import { GaiaNameQuery } from "./GaiaNameEntity.js";
class GaiaNameRepository extends SupabaseDataRepository {
    constructor() {
        super("gaia_names", GaiaNameQuery);
    }
    async fetchByWallet(walletAddress) {
        return await this.fetchSingle((b) => b.eq("wallet_address", walletAddress));
    }
    async fetchByName(name) {
        return this.fetchSingle((b) => b.eq("name", name));
    }
    async search(query) {
        return this.fetch((b) => b.ilike("name", `%${query}%`));
    }
}
export default new GaiaNameRepository();
//# sourceMappingURL=GaiaNameRepository.js.map