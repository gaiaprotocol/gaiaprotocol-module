import { ConfirmDialog, DropdownMenu, DropdownMenuGroup, DropdownMenuItem, } from "@common-module/app-components";
import SocialCompConfig from "../SocialCompConfig.js";
export default class ChatMessageMenu extends DropdownMenu {
    options;
    constructor(left, top, options) {
        super(".chat-message-menu", { left, top });
        this.options = options;
        this.appendToMain(new DropdownMenuGroup(new DropdownMenuItem({
            icon: new SocialCompConfig.EditMenuIcon(),
            label: "Edit",
            onClick: () => {
                options.onEdit();
                this.remove();
            },
        }), new DropdownMenuItem({
            icon: new SocialCompConfig.DeleteMenuIcon(),
            label: "Delete",
            onClick: () => {
                this.deleteMessage();
                this.remove();
            },
        })));
    }
    async deleteMessage() {
        await new ConfirmDialog({
            title: "Delete Message",
            message: "Are you sure you want to delete this message?",
        }).waitForConfirmation();
        await this.options.messageManager.actions.onDelete(this.options.messageId);
    }
}
//# sourceMappingURL=WalletAddressDropdownMenu.js.map