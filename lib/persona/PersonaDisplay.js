import { DomNode } from "@common-module/app";
export default class PersonaDisplay extends DomNode {
    constructor(persona) {
        super(".persona-display");
        this.append(JSON.stringify(persona));
    }
}
//# sourceMappingURL=PersonaDisplay.js.map