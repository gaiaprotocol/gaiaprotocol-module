import { StructuredModal } from "@common-module/app-components";
import OpenSeaNFTData from "../opensea/OpenSeaNFTData.js";
export default class UserNFTSelectorModal extends StructuredModal {
    private nftSelector;
    private useAsProfileButton;
    constructor(onSelect: (nft: OpenSeaNFTData) => Promise<void> | void);
}
//# sourceMappingURL=UserNFTSelectorModal.d.ts.map