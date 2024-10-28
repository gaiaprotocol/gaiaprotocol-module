import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
export default class ProfileNFTSelectorModal extends StructuredModal {
    selectedNFT;
    useAsProfileButton;
    constructor() {
        super(".profile-nft-selector-modal");
        this
            .appendToHeader(el("h1", "Choose NFT for Profile"))
            .appendToMain(el("p", "Select an NFT to represent your Persona"))
            .appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }), this.useAsProfileButton = new Button(".use-as-profile", {
            title: "Use as Profile",
            onClick: () => {
                this.remove();
            },
        }));
    }
}
//# sourceMappingURL=ProfileNFTSelectorModal.js.map