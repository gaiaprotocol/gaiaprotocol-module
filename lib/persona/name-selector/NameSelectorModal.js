import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
export default class NameSelectorModal extends StructuredModal {
    selectedName;
    nameDisplay;
    useThisNameButton;
    constructor(type, onSelect) {
        super(".name-selector-modal");
        this
            .appendToHeader(el("h1", `Your ${type}`))
            .appendToMain(el("p", `Your ${type} is:`), this.nameDisplay = el(".name-display"))
            .appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }), this.useThisNameButton = new Button(".use-this-name", {
            title: "Use this name",
            disabled: true,
            onClick: async () => {
                if (this.selectedName) {
                    await onSelect(this.selectedName);
                    this.remove();
                }
            },
        }));
    }
}
//# sourceMappingURL=NameSelectorModal.js.map