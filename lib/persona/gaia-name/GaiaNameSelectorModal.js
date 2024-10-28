import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
import UserGaiaNameList from "./UserGaiaNameList.js";
export default class GaiaNameSelectorModal extends StructuredModal {
    selectedGaiaName;
    useAsNameButton;
    constructor() {
        super(".gaia-name-selector-modal");
        this
            .appendToHeader(el("h1", "Choose Gaia Name"))
            .appendToMain(el("p", "Select a Gaia Name to represent your identity"), new UserGaiaNameList())
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
//# sourceMappingURL=GaiaNameSelectorModal.js.map