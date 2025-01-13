import { SupabaseDataRepository } from "@common-module/supabase";
import PersonaPostEntity, { PersonaPostQuery } from "./PersonaPostEntity.js";

class PersonaPostRepository extends SupabaseDataRepository<PersonaPostEntity> {
  constructor() {
    super("persona_posts", PersonaPostQuery);
  }
}

export default new PersonaPostRepository();
