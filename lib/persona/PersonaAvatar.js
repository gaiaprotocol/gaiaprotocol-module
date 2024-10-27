import { DomNode } from "@common-module/app";
import { WalletAvatar } from "@common-module/wallet";
import PersonaRepository from "./PersonaRepository.js";
export default class PersonaAvatar extends DomNode {
    walletAddress;
    size;
    constructor(walletAddress, size) {
        super(".persona-avatar");
        this.walletAddress = walletAddress;
        this.size = size;
        this.render();
    }
    async render() {
        const persona = await PersonaRepository.fetchPersona(this.walletAddress);
        this.empty().append(persona
            ? new WalletAvatar(this.walletAddress, { size: this.size })
            : new WalletAvatar(this.walletAddress, { size: this.size }));
    }
}
//# sourceMappingURL=PersonaAvatar.js.map