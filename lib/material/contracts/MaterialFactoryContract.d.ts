declare class MaterialFactoryContract {
    getProtocolFeeRate(): Promise<bigint>;
    getMaterialOwnerFeeRate(): Promise<bigint>;
    getBuyPrice(materialAddress: `0x${string}`, amount: bigint): Promise<bigint>;
    getSellPrice(materialAddress: `0x${string}`, amount: bigint): Promise<bigint>;
    getBuyPriceAfterFee(materialAddress: `0x${string}`, amount: bigint): Promise<bigint>;
    getSellPriceAfterFee(materialAddress: `0x${string}`, amount: bigint): Promise<bigint>;
    createMaterial(name: string, symbol: string, metadataHash: string): Promise<string>;
    buy(materialAddress: `0x${string}`, amount: bigint): Promise<void>;
    sell(materialAddress: `0x${string}`, amount: bigint): Promise<void>;
}
declare const _default: MaterialFactoryContract;
export default _default;
//# sourceMappingURL=MaterialFactoryContract.d.ts.map