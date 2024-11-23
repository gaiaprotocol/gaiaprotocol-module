import { DropdownMenu } from "@common-module/app-components";
interface ProfileImageSourceSelectMenuOptions {
    imageExists: boolean;
    onSelect: (source: "upload" | "nft") => void;
    onDeleted: () => void;
}
export default class ProfileImageSourceSelectMenu extends DropdownMenu {
    constructor(left: number, top: number, options: ProfileImageSourceSelectMenuOptions);
}
export {};
//# sourceMappingURL=ProfileImageSourceSelectMenu.d.ts.map