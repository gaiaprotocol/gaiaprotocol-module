import { SupabaseDataRepository } from "@common-module/supabase";
import GaiaProtocolConfig from "../../core/GaiaProtocolConfig.js";
import { PersonaPostQuery } from "./PersonaPostEntity.js";
class PersonaPostRepository extends SupabaseDataRepository {
    constructor() {
        super("persona_posts", PersonaPostQuery);
    }
    async writePost(title, content) {
        return await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("write-persona-post", { title, content });
    }
}
export default new PersonaPostRepository();
//# sourceMappingURL=PersonaPostRepository.js.map