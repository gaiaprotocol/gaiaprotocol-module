import { DomNode } from "@common-module/app";
import { WalletAvatar } from "@common-module/wallet";
export default class UserAvatar extends DomNode {
    constructor(user) {
        super(".user-avatar");
        this.append(new WalletAvatar(user.id, { size: 32 }));
    }
}
//# sourceMappingURL=UserAvatar.js.map