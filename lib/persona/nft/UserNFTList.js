import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
export default class UserNFTList extends DomNode {
    constructor() {
        super(".user-nft-list");
        this.loadNFTs();
    }
    async loadNFTs() {
        const data = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-nfts", {});
        console.log(data);
    }
}
//# sourceMappingURL=UserNFTList.js.map