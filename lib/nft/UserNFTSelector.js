import { DomNode } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import GaiaProtocolConfig from "../GaiaProtocolConfig.js";
import NFTList from "./NFTList.js";
export default class UserNFTSelector extends DomNode {
    selectMode;
    next;
    loading = false;
    nftList;
    constructor(selectMode) {
        super(".user-nft-selector");
        this.selectMode = selectMode;
        this.loadNFTs();
    }
    getSelectedNFTs() {
        return this.nftList?.getSelectedNFTs() ?? [];
    }
    getSelectedNFT() {
        return this.nftList?.getSelectedNFT();
    }
    async loadNFTs() {
        new AppCompConfig.LoadingSpinner().appendTo(this);
        this.loading = true;
        const data = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-nfts", {});
        this.loading = false;
        this.next = data.next;
        this.clear().append(this.nftList = new NFTList({ data, selectMode: this.selectMode }));
        this.nftList.on("changeSelectedNFT", (nft) => this.emit("changeSelectedNFT", nft));
        this.nftList.on("changeSelectedNFTs", (nfts) => this.emit("changeSelectedNFTs", nfts));
        this.nftList.on("remove", () => this.nftList = undefined);
    }
    async loadMoreNFTs() {
        if (!this.loading && this.next) {
            const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);
            this.loading = true;
            const data = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-nfts", { next: this.next });
            this.loading = false;
            this.next = data.next;
            loadingSpinner.remove();
            this.nftList?.addNFTs(data.nfts);
        }
    }
}
//# sourceMappingURL=UserNFTSelector.js.map