import { SupabaseDataRepository } from "@common-module/supabase";
import { PersonaPostQuery } from "./PersonaPostEntity.js";
class PersonaPostRepository extends SupabaseDataRepository {
    constructor() {
        super("persona_posts", PersonaPostQuery);
    }
}
export default new PersonaPostRepository();
//# sourceMappingURL=PersonaPostRepository.js.map