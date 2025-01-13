import { SupabaseDataRepository } from "@common-module/supabase";
import { PersonaQuery } from "./PersonaEntity.js";
class PersonaRepository extends SupabaseDataRepository {
    constructor() {
        super("personas", PersonaQuery);
    }
    async fetchPersona(walletAddress) {
        return this.fetchSingle((b) => b.eq("wallet_address", walletAddress));
    }
    async fetchPersonaByName(name) {
        return this.fetchSingle((b) => b.eq("name", name));
    }
    async fetchWalletAddressByName(name) {
        const persona = await this.fetchSingle((b) => b.eq("name", name), "wallet_address");
        return persona?.wallet_address;
    }
    async fetchPersonas(walletAddresses) {
        return this.fetch((b) => b.in("wallet_address", walletAddresses));
    }
}
export default new PersonaRepository();
//# sourceMappingURL=PersonaRepository.js.map