export default class MaterialContract {
    private address;
    constructor(address: `0x${string}`);
    getOwner(): Promise<string>;
    balanceOf(account: string): Promise<bigint>;
    setName(name: string): Promise<void>;
    setSymbol(symbol: string): Promise<void>;
}
//# sourceMappingURL=MaterialContract.d.ts.map