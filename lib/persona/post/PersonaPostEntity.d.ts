import { Reaction, Rich } from "@common-module/social-components";
export default interface PersonaPostEntity {
    id: number;
    persona_owner: string;
    title: string;
    content: string;
    rich?: Rich;
    reactions?: Reaction[];
    created_at: string;
    edited_at?: string;
}
export declare const PersonaPostQuery = "id, persona_owner, title, content, rich, reactions, created_at, edited_at";
//# sourceMappingURL=PersonaPostEntity.d.ts.map