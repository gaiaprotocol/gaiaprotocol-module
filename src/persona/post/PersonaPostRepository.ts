import { SupabaseDataRepository } from "@common-module/supabase";
import GaiaProtocolConfig from "../../core/GaiaProtocolConfig.js";
import PersonaPostEntity, { PersonaPostQuery } from "./PersonaPostEntity.js";

class PersonaPostRepository extends SupabaseDataRepository<PersonaPostEntity> {
  constructor() {
    super("persona_posts", PersonaPostQuery);
  }

  public async writePost(title: string, content: string): Promise<void> {
    await GaiaProtocolConfig.supabaseConnector.callEdgeFunction(
      "write-persona-post",
      { title, content },
    );
  }
}

export default new PersonaPostRepository();
