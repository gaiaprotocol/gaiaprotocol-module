import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
import UserENSNameList from "./UserENSNameList.js";
export default class ENSNameSelectorModal extends StructuredModal {
    selectedENSName;
    useAsNameButton;
    constructor() {
        super(".ens-name-selector-modal");
        this
            .appendToHeader(el("h1", "Choose ENS Name"))
            .appendToMain(el("p", "Select an ENS name to represent your identity"), new UserENSNameList())
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
//# sourceMappingURL=ENSNameSelectorModal.js.map