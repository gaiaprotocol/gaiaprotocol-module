import { DomNode } from "@common-module/app";
import PersonaRepository from "./PersonaRepository.js";
export default class PersonaDisplay extends DomNode {
    walletAddress;
    constructor(walletAddress) {
        super(".persona-display");
        this.walletAddress = walletAddress;
        this.append("Persona display for wallet address: ", walletAddress);
        this.loadPersona();
    }
    async loadPersona() {
        const persona = await PersonaRepository.fetchPersona(this.walletAddress);
        console.log(persona);
    }
}
//# sourceMappingURL=PersonaDisplay.js.map