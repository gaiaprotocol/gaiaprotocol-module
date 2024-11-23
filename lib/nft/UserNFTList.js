import { DomNode } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import GaiaProtocolConfig from "../GaiaProtocolConfig.js";
import NFTList from "./NFTList.js";
export default class UserNFTList extends DomNode {
    constructor() {
        super(".user-nft-list");
        this.loadNFTs();
    }
    async loadNFTs() {
        new AppCompConfig.LoadingSpinner().appendTo(this);
        const data = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-nfts", {});
        this.clear().append(new NFTList(data, (nft) => { }));
    }
}
//# sourceMappingURL=UserNFTList.js.map