import { DomNode } from "@common-module/app";
export default abstract class TradeMaterialTabContent extends DomNode<HTMLDivElement, {
    traded: () => void;
    canceled: () => void;
}> {
    private tradeType;
    protected address: `0x${string}`;
    private materialContract;
    private amountInput;
    private balanceDisplay;
    private unitPriceDisplay;
    private totalPriceDisplay;
    private feeDisplay;
    private materialFeeRecipientDisplay;
    private protocolFeeRecipientDisplay;
    private tradeButton;
    private symbol;
    constructor(tradeType: "buy" | "sell", address: `0x${string}`);
    private loadAllPrices;
    private loadBalance;
    private loadUnitPrice;
    private loadTotalPrice;
    private loadFee;
    setSymbol(symbol: string): void;
    protected abstract loadPrice(amount: bigint): Promise<bigint>;
    protected abstract loadPriceAfterFee(amount: bigint): Promise<bigint>;
    protected abstract trade(amount: bigint): Promise<void>;
}
//# sourceMappingURL=TradeMaterialTabContent.d.ts.map