import { SupabaseDataRepository } from "@common-module/supabase";
import PersonaEntity from "./PersonaEntity.js";
declare class PersonaRepository extends SupabaseDataRepository<PersonaEntity> {
    constructor();
    fetchPersona(walletAddress: string): Promise<PersonaEntity | undefined>;
    fetchPersonas(walletAddresses: string[]): Promise<PersonaEntity[]>;
}
declare const _default: PersonaRepository;
export default _default;
//# sourceMappingURL=PersonaRepository.d.ts.map