import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
import UserBasenameList from "./UserBasenameList.js";
export default class BasenameSelectorModal extends StructuredModal {
    selectedBasename;
    useAsNameButton;
    constructor() {
        super(".name-basename-selector-modal");
        this
            .appendToHeader(el("h1", "Choose Basename"))
            .appendToMain(el("p", "Select a Basename to represent your identity"), new UserBasenameList())
            .appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }), this.useAsNameButton = new Button(".use-as-name", {
            title: "Use as Name",
            onClick: () => {
            },
        }));
    }
}
//# sourceMappingURL=BasenameSelectorModal.js.map