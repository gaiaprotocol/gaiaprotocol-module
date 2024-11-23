import { DomNode } from "@common-module/app";
import NFTListItem from "./NFTListItem.js";
export default class NFTList extends DomNode {
    options;
    children = [];
    constructor(options) {
        super("ul.nft-list");
        this.options = options;
        this.addNFTs(options.data.nfts);
    }
    addNFTs(nfts) {
        for (const nft of nfts) {
            const item = new NFTListItem({
                data: nft,
                onClick: () => {
                    this.options.onClick?.(nft);
                    if (this.options.selectMode === "single") {
                        for (const child of this.children) {
                            if (child !== item)
                                child.deselect();
                        }
                    }
                    this.emit("changeSelectedNFT", this.getSelectedNFT());
                    this.emit("changeSelectedNFTs", this.getSelectedNFTs());
                },
                selectMode: this.options.selectMode !== undefined,
            }).appendTo(this);
        }
    }
    getSelectedNFTs() {
        return this.children.filter((child) => child.isSelected()).map((child) => child.getData());
    }
    getSelectedNFT() {
        return this.getSelectedNFTs()[0];
    }
}
//# sourceMappingURL=NFTList.js.map