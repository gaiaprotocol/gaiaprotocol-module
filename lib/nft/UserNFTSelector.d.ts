import { DomNode } from "@common-module/app";
import OpenSeaNFTData from "../opensea/OpenSeaNFTData.js";
export default class UserNFTSelector extends DomNode<HTMLDivElement, {
    changeSelectedNFT: (nft: OpenSeaNFTData | undefined) => void;
    changeSelectedNFTs: (nfts: OpenSeaNFTData[]) => void;
}> {
    private selectMode;
    private next;
    private loading;
    private nftList;
    constructor(selectMode: "single" | "multiple");
    getSelectedNFTs(): OpenSeaNFTData[];
    getSelectedNFT(): OpenSeaNFTData | undefined;
    loadNFTs(): Promise<void>;
    loadMoreNFTs(): Promise<void>;
}
//# sourceMappingURL=UserNFTSelector.d.ts.map