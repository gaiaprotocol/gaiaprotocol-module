import TradeMaterialTabContent from "./TradeMaterialTabContent.js";
export default class SellMaterialTabContent extends TradeMaterialTabContent {
    constructor(address: `0x${string}`);
    protected loadPrice(amount: bigint): Promise<bigint>;
    protected loadPriceAfterFee(amount: bigint): Promise<bigint>;
    protected trade(amount: bigint): Promise<void>;
}
//# sourceMappingURL=SellMaterialTabContent.d.ts.map