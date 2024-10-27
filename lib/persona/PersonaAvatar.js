import { DomNode, el } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { WalletAvatar } from "@common-module/wallet";
import PersonaRepository from "./PersonaRepository.js";
export default class PersonaAvatar extends DomNode {
    walletAddress;
    size;
    loadingSpinner;
    constructor(walletAddress, size) {
        super(".persona-avatar");
        this.walletAddress = walletAddress;
        this.size = size;
        this.load();
    }
    async load() {
        this.showLoading();
        const persona = await PersonaRepository.fetchPersona(this.walletAddress);
        this.empty().append(persona
            ? new WalletAvatar(this.walletAddress, { size: this.size })
            : new WalletAvatar(this.walletAddress, { size: this.size }));
        this.hideLoading();
    }
    set imageSrc(src) {
        this.empty().showLoading();
        this.append(el("img", {
            src,
            onload: () => this.hideLoading(),
        }));
    }
    showLoading() {
        if (this.loadingSpinner)
            return;
        this.loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);
        this.loadingSpinner.on("remove", () => this.loadingSpinner = undefined);
    }
    hideLoading() {
        this.loadingSpinner?.remove();
    }
}
//# sourceMappingURL=PersonaAvatar.js.map