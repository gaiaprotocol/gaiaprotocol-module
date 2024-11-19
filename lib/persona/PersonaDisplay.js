import { DomNode } from "@common-module/app";
export default class PersonaDisplay extends DomNode {
    constructor(walletAddress) {
        super(".persona-display");
        this.append("Persona display for wallet address: ", walletAddress);
    }
}
//# sourceMappingURL=PersonaDisplay.js.map