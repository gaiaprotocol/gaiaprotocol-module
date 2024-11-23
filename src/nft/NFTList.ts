import { DomNode } from "@common-module/app";
import OpenSeaNFTData from "../opensea/OpenSeaNFTData.js";
import NFTListItem from "./NFTListItem.js";

interface NFTListOptions {
  data: { nfts: OpenSeaNFTData[] };
  onClick?: (nft: OpenSeaNFTData) => void;
  selectMode?: "single" | "multiple";
}

export default class NFTList extends DomNode<HTMLDivElement, {
  changeSelectedNFT: (nft: OpenSeaNFTData | undefined) => void;
  changeSelectedNFTs: (nfts: OpenSeaNFTData[]) => void;
}> {
  public children: NFTListItem[] = [];

  constructor(private options: NFTListOptions) {
    super("ul.nft-list");
    this.addNFTs(options.data.nfts);
  }

  public addNFTs(nfts: OpenSeaNFTData[]): void {
    for (const nft of nfts) {
      const item = new NFTListItem({
        data: nft,
        onClick: () => {
          this.options.onClick?.(nft);

          if (this.options.selectMode === "single") {
            for (const child of this.children) {
              if (child !== item) child.deselect();
            }
          }

          this.emit("changeSelectedNFT", this.getSelectedNFT());
          this.emit("changeSelectedNFTs", this.getSelectedNFTs());
        },
        selectMode: this.options.selectMode !== undefined,
      }).appendTo(this);
    }
  }

  public getSelectedNFTs(): OpenSeaNFTData[] {
    return this.children.filter((child) => child.isSelected()).map((child) =>
      child.getData()
    );
  }

  public getSelectedNFT(): OpenSeaNFTData | undefined {
    return this.getSelectedNFTs()[0];
  }
}
