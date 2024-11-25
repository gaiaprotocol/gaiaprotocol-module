import TradeAssetButton from "../../trade/TradeAssetButton.js";
export default class TradePersonaFragmentButton extends TradeAssetButton {
    walletAddress;
    constructor(walletAddress) {
        super("Fragment");
        this.walletAddress = walletAddress;
    }
    async checkHolder() {
        return false;
    }
    async getPrice() {
        return 0n;
    }
}
//# sourceMappingURL=TradePersonaFragmentButton.js.map