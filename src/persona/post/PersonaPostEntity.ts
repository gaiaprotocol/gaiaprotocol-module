import { Reaction, Rich } from "@common-module/social-components";

export default interface PersonaPostEntity {
  id: number;
  author: string;

  title: string;
  content: string;

  rich?: Rich;
  reactions?: Reaction[];

  created_at: string;
  edited_at?: string;
}

export const PersonaPostQuery = "id, author, title, content, created_at";
