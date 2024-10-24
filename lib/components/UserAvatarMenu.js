import { el } from "@common-module/app";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, } from "@common-module/app-components";
import { AddressUtils, WalletAvatar } from "@common-module/wallet";
import { WalletLoginManager } from "@common-module/wallet-login";
export default class UserAvatarMenu extends DropdownMenu {
    constructor(button) {
        const rect = button.calculateRect();
        super(".user-avatar-menu", {
            right: rect.right,
            top: rect.bottom + 10,
        });
        this.appendToHeader(el(".user-info", new WalletAvatar(WalletLoginManager.loggedInAddress, { size: 32 }), el(".user-details", el(".user-name", "test"), el(".user-address", AddressUtils.shortenAddress(WalletLoginManager.loggedInAddress))), {
            onclick: () => {
                this.remove();
            },
        }));
        this.appendToMain(new DropdownMenuGroup(new DropdownMenuItem({
            label: "test",
            onClick: () => console.log("test"),
        })));
    }
}
//# sourceMappingURL=UserAvatarMenu.js.map