import TradeMaterialTabContent from "./TradeMaterialTabContent.js";
export default class BuyMaterialTabContent extends TradeMaterialTabContent {
    constructor(address: `0x${string}`);
    protected loadPrice(amount: bigint): Promise<bigint>;
    protected loadPriceAfterFee(amount: bigint): Promise<bigint>;
}
//# sourceMappingURL=BuyMaterialTabContent.d.ts.map