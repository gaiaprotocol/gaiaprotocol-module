import { AppCompConfig, Input } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import GaiaNameRepository from "../../gaia-names/GaiaNameRepository.js";
import NameSelectorModal from "./NameSelectorModal.js";
export default class GaiaNameSelectorModal extends NameSelectorModal {
    constructor(onSelect) {
        super("Gaia Name", onSelect);
        this.loadName();
    }
    async loadName() {
        const loggedInAddress = WalletLoginManager.getLoggedInAddress();
        if (!loggedInAddress)
            throw new Error("Not logged in");
        this.nameDisplay.clear().append(new AppCompConfig.LoadingSpinner());
        const data = await GaiaNameRepository.fetchByWallet(loggedInAddress);
        if (!data) {
            this.nameDisplay.clear().append("You do not have an Gaia name");
        }
        else {
            this.selectedName = `${data.name}.gaia`;
            this.useThisNameButton.enable();
            this.nameDisplay.clear().append(new Input({
                value: `${data.name}.gaia`,
                readOnly: true,
            }));
        }
    }
}
//# sourceMappingURL=GaiaNameSelectorModal.js.map