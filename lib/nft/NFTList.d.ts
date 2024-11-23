import { DomNode } from "@common-module/app";
import OpenSeaNFTData from "../opensea/OpenSeaNFTData.js";
import NFTListItem from "./NFTListItem.js";
interface NFTListOptions {
    data: {
        nfts: OpenSeaNFTData[];
    };
    onClick?: (nft: OpenSeaNFTData) => void;
    selectMode?: "single" | "multiple";
}
export default class NFTList extends DomNode<HTMLDivElement, {
    changeSelectedNFT: (nft: OpenSeaNFTData | undefined) => void;
    changeSelectedNFTs: (nfts: OpenSeaNFTData[]) => void;
}> {
    private options;
    children: NFTListItem[];
    constructor(options: NFTListOptions);
    addNFTs(nfts: OpenSeaNFTData[]): void;
    getSelectedNFTs(): OpenSeaNFTData[];
    getSelectedNFT(): OpenSeaNFTData | undefined;
}
export {};
//# sourceMappingURL=NFTList.d.ts.map