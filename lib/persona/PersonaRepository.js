import { SupabaseDataRepository } from "@common-module/supabase";
import { PersonaQuery } from "./PersonaEntity.js";
class PersonaRepository extends SupabaseDataRepository {
    constructor() {
        super("personas", PersonaQuery);
    }
    async fetchPersona(walletAddress) {
        return this.fetchSingle((b) => b.eq("wallet_address", walletAddress));
    }
    async fetchPersonas(walletAddresses) {
        return this.fetch((b) => b.in("wallet_address", walletAddresses));
    }
}
export default new PersonaRepository();
//# sourceMappingURL=PersonaRepository.js.map