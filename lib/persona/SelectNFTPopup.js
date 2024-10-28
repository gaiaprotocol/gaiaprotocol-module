import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
export default class SelectNFTPopup extends StructuredModal {
    constructor() {
        super(".select-nft-popup");
        this
            .appendToHeader(el("h1", "Select NFT"))
            .appendToMain(el("p"))
            .appendToFooter(new Button(".select", {
            title: "Select",
            onClick: () => {
                this.remove();
            },
        }));
    }
}
//# sourceMappingURL=SelectNFTPopup.js.map