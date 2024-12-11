import { DomNode } from "@common-module/app";
export default abstract class TradeMaterialTabContent extends DomNode<HTMLDivElement, {
    canceled: () => void;
}> {
    protected address: `0x${string}`;
    private materialContract;
    private amountInput;
    private balanceDisplay;
    private unitPriceDisplay;
    private totalPriceDisplay;
    private feeDisplay;
    private materialFeeRecipientDisplay;
    private protocolFeeRecipientDisplay;
    constructor(address: `0x${string}`, tradeType: "buy" | "sell");
    private loadAllPrices;
    private loadBalance;
    private loadUnitPrice;
    private loadTotalPrice;
    private loadFee;
    protected abstract loadPrice(amount: bigint): Promise<bigint>;
    protected abstract loadPriceAfterFee(amount: bigint): Promise<bigint>;
    protected abstract trade(amount: bigint): Promise<void>;
}
//# sourceMappingURL=TradeMaterialTabContent.d.ts.map