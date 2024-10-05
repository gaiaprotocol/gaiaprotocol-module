declare class MaterialPriceCalculator {
    private getPrice;
    getBuyPrice(supply: bigint, amount: bigint): bigint;
    getSellPrice(supply: bigint, amount: bigint): bigint;
    getBuyPriceAfterFee(supply: bigint, amount: bigint, protocolFeePercent: bigint, materialOwnerFeePercent: bigint): bigint;
    getSellPriceAfterFee(supply: bigint, amount: bigint, protocolFeePercent: bigint, materialOwnerFeePercent: bigint): bigint;
}
declare const _default: MaterialPriceCalculator;
export default _default;
//# sourceMappingURL=MaterialPriceCalculator.d.ts.map