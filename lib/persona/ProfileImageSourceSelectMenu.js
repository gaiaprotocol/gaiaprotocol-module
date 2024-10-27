import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, } from "@common-module/app-components";
import NFTIcon from "./icons/NFTIcon.js";
import ImageIcon from "./icons/ImageIcon.js";
export default class ProfileImageSourceSelectMenu extends DropdownMenu {
    constructor(left, top) {
        super(".profile-image-source-select", { left, top });
        this.appendToMain(new DropdownMenuGroup(new DropdownMenuItem({
            icon: new ImageIcon(),
            label: "Upload image",
            onClick: () => console.log("test"),
        }), new DropdownMenuItem({
            icon: new NFTIcon(),
            label: "Select from NFTs",
            onClick: () => console.log("test"),
        })));
    }
}
//# sourceMappingURL=ProfileImageSourceSelectMenu.js.map