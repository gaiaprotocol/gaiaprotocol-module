import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import OpenSeaNFTData from "../../opensea/OpenSeaNFTData.js";

export default class UserNFTList extends DomNode {
  constructor() {
    super(".user-nft-list");
    this.loadNFTs();
  }

  public async loadNFTs(): Promise<void> {
    const data = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<{
      nfts: OpenSeaNFTData[];
      next?: string;
    }>("get-user-nfts", {});

    console.log(data);
  }
}
