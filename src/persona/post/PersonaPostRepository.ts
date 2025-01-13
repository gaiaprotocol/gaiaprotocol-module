import { SupabaseDataRepository } from "@common-module/supabase";
import GaiaProtocolConfig from "../../core/GaiaProtocolConfig.js";
import PersonaPostEntity, { PersonaPostQuery } from "./PersonaPostEntity.js";

class PersonaPostRepository extends SupabaseDataRepository<PersonaPostEntity> {
  constructor() {
    super("persona_posts", PersonaPostQuery);
  }

  public async writePost(title: string, content: string): Promise<number> {
    return await GaiaProtocolConfig.supabaseConnector.callEdgeFunction(
      "write-persona-post",
      { title, content },
    );
  }

  public async fetchPost(
    personaOwner: string,
    id: number,
  ): Promise<PersonaPostEntity | undefined> {
    return this.fetchSingle((b) =>
      b.eq("persona_owner", personaOwner).eq("id", id)
    );
  }
}

export default new PersonaPostRepository();
