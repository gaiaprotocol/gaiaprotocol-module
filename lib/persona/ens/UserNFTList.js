import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
export default class UserNFTList extends DomNode {
    constructor() {
        super(".user-nft-list");
        this.loadNFTs();
    }
    async loadNFTs() {
        const nfts = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-nfts");
        console.log(nfts);
    }
}
//# sourceMappingURL=UserNFTList.js.map