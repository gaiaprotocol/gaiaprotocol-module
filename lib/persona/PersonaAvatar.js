import { DomNode, el } from "@common-module/app";
import { WalletAvatar } from "@common-module/wallet";
export default class PersonaAvatar extends DomNode {
    user;
    size;
    constructor(user, size = 32) {
        super(".persona-avatar.avatar");
        this.user = user;
        this.size = size;
        this.style({ width: `${size}px`, height: `${size}px` });
        this.clearImage();
    }
    clearImage() {
        this.clear();
        if (this.user.avatarUrl) {
            this.setImage(this.user.avatarUrl, this.user.isNftAvatar === true);
        }
        else {
            this.append(new WalletAvatar(this.user.id, { size: this.size }));
        }
    }
    setImage(src, isNFT) {
        isNFT ? this.addClass("nft") : this.removeClass("nft");
        this.append(el("img", { src }));
    }
}
//# sourceMappingURL=PersonaAvatar.js.map