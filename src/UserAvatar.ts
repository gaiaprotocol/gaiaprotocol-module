import { DomNode } from "@common-module/app";
import { User } from "@common-module/social-components";
import { WalletAvatar } from "@common-module/wallet";

export default class UserAvatar extends DomNode {
  constructor(user: User) {
    super(".user-avatar");
    this.append(
      new WalletAvatar(user.id, { size: 32 }),
    );
  }
}
