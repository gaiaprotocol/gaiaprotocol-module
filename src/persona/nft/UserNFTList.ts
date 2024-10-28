import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import OpenSeaNFT from "./OpenSeaNFT.js";

export default class UserNFTList extends DomNode {
  constructor() {
    super(".user-nft-list");
    this.loadNFTs();
  }

  public async loadNFTs(): Promise<void> {
    const nfts = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<{
      nfts: OpenSeaNFT[];
      next?: string;
    }>("get-user-nfts");

    console.log(nfts);
  }
}
