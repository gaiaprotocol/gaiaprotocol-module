import TradeAssetButton from "../../trade/TradeAssetButton.js";
export default class TradePersonaFragmentButton extends TradeAssetButton {
    private walletAddress;
    constructor(walletAddress: string);
    protected checkHolder(): Promise<boolean>;
    protected getPrice(): Promise<bigint>;
}
//# sourceMappingURL=TradePersonaFragmentButton.d.ts.map