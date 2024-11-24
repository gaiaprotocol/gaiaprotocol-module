import { DomNode, el } from "@common-module/app";
import { User } from "@common-module/social-components";
import { WalletAvatar } from "@common-module/wallet";

export default class PersonaAvatar extends DomNode {
  constructor(private user: User, private size: number = 32) {
    super(".persona-avatar.avatar");
    this.style({ width: `${size}px`, height: `${size}px` });
    this.clearImage();
  }

  public clearImage(): void {
    this.clear();

    if (this.user.avatarUrl) {
      this.setImage(this.user.avatarUrl, this.user.isNftAvatar === true);
    } else {
      this.append(new WalletAvatar(this.user.id, { size: this.size }));
    }
  }

  public setImage(src: string, isNFT: boolean): void {
    isNFT ? this.addClass("nft") : this.removeClass("nft");
    this.append(el("img", { src }));
  }
}
