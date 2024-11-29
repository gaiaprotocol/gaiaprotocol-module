import { DomNode, el } from "@common-module/app";
import { WalletAddressAvatar } from "@common-module/wallet";
export default class PersonaAvatar extends DomNode {
    user;
    constructor(user) {
        super(".persona-avatar.avatar");
        this.user = user;
        this.clearImage();
    }
    clearImage() {
        this.clear();
        if (this.user.avatarUrl) {
            this.setImage(this.user.avatarUrl, this.user.isNftAvatar === true);
        }
        else {
            this.append(new WalletAddressAvatar(this.user.id));
        }
    }
    setImage(src, isNFT) {
        isNFT ? this.addClass("nft") : this.removeClass("nft");
        this.append(el("img", { src }));
    }
}
//# sourceMappingURL=PersonaAvatar.js.map