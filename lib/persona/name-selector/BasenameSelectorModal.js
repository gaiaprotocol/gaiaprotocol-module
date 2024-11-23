import { AppCompConfig, Input } from "@common-module/app-components";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import NameSelectorModal from "./NameSelectorModal.js";
export default class BasenameSelectorModal extends NameSelectorModal {
    constructor(onSelect) {
        super("Basename", onSelect);
        this.loadName();
    }
    async loadName() {
        this.nameDisplay.clear().append(new AppCompConfig.LoadingSpinner());
        const name = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-basename");
        if (name === "") {
            this.nameDisplay.clear().append("You do not have an Basename");
        }
        else {
            this.selectedName = name;
            this.useThisNameButton.enable();
            this.nameDisplay.clear().append(new Input({
                value: name,
                readOnly: true,
            }));
        }
    }
}
//# sourceMappingURL=BasenameSelectorModal.js.map