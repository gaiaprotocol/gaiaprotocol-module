import { SupabaseDataRepository } from "@common-module/supabase";
import PersonaPostEntity from "./PersonaPostEntity.js";
declare class PersonaPostRepository extends SupabaseDataRepository<PersonaPostEntity> {
    constructor();
    writePost(title: string, content: string): Promise<number>;
    fetchPost(personaOwner: string, id: number): Promise<PersonaPostEntity | undefined>;
}
declare const _default: PersonaPostRepository;
export default _default;
//# sourceMappingURL=PersonaPostRepository.d.ts.map