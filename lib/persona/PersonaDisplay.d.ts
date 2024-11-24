import { DomNode } from "@common-module/app";
import PersonaEntity from "./PersonaEntity.js";
interface PersonaDisplayOptions {
    persona: PersonaEntity;
    showEditButton: boolean;
    onEditClick: () => void;
}
export default class PersonaDisplay extends DomNode {
    constructor(options: PersonaDisplayOptions);
}
export {};
//# sourceMappingURL=PersonaDisplay.d.ts.map