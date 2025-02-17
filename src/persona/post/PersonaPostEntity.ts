import { Reaction } from "@common-module/social-components";

export default interface PersonaPostEntity {
  id: number;
  persona_owner: string;
  title: string;
  content: string;
  reactions?: Reaction[];
  created_at: string;
  edited_at?: string;
}

export const PersonaPostQuery =
  "id, persona_owner, title, content, reactions, created_at, edited_at";
