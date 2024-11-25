import { DomNode, el } from "@common-module/app";
import { User } from "@common-module/social-components";
import { WalletAvatar } from "@common-module/wallet";

export default class PersonaAvatar extends DomNode {
  constructor(private user: User) {
    super(".persona-avatar.avatar");
    this.clearImage();
  }

  public clearImage(): void {
    this.clear();

    if (this.user.avatarUrl) {
      this.setImage(this.user.avatarUrl, this.user.isNftAvatar === true);
    } else {
      this.append(new WalletAvatar(this.user.id));
    }
  }

  public setImage(src: string, isNFT: boolean): void {
    isNFT ? this.addClass("nft") : this.removeClass("nft");
    this.append(el("img", { src }));
  }
}
