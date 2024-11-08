import { DomNode, el } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { WalletAvatar } from "@common-module/wallet";
export default class PersonaAvatar extends DomNode {
    user;
    size;
    loadingSpinner;
    constructor(user, size = 32) {
        super(".persona-avatar");
        this.user = user;
        this.size = size;
        this.load();
    }
    async load() {
        this.showLoading();
        this.clear().append(new WalletAvatar(this.user.id, { size: this.size }));
        this.hideLoading();
    }
    set imageSrc(src) {
        this.clear().showLoading();
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