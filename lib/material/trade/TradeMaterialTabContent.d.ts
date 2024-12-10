import { DomNode } from "@common-module/app";
export default abstract class TradeMaterialTabContent extends DomNode {
    private unitPriceDisplay;
    private totalPriceDisplay;
    private feeDisplay;
    private feeRecipientList;
    constructor(tradeType: "buy" | "sell");
    private renderPrice;
    protected abstract loadPrice(amount: bigint): Promise<bigint>;
    protected abstract loadPriceAfterFee(amount: bigint): Promise<bigint>;
}
//# sourceMappingURL=TradeMaterialTabContent.d.ts.map