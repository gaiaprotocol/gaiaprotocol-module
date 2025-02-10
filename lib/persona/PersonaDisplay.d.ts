import { DomNode } from "@common-module/app";
import PersonaEntity from "./PersonaEntity.js";
interface PersonaDisplayOptions {
    showEditButton: boolean;
    onEditClick: () => void;
}
export default class PersonaDisplay extends DomNode {
    constructor(persona: PersonaEntity, options: PersonaDisplayOptions);
}
export {};
//# sourceMappingURL=PersonaDisplay.d.ts.map