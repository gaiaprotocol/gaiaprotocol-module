import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, Snackbar, } from "@common-module/app-components";
import { CopyIcon } from "@gaiaprotocol/svg-icons";
export default class WalletAddressMenu extends DropdownMenu {
    constructor(left, top, walletAddress) {
        super(".wallet-address-menu", { left, top });
        this.appendToMain(new DropdownMenuGroup(new DropdownMenuItem({
            icon: new CopyIcon(),
            label: walletAddress,
            onClick: async () => {
                await navigator.clipboard.writeText(walletAddress);
                new Snackbar({ message: "Address copied to clipboard" });
                this.remove();
            },
        })));
    }
}
//# sourceMappingURL=WalletAddressMenu.js.map