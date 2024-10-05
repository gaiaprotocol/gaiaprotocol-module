import { Contract } from "@common-module/contract";
import { JsonRpcSigner } from "ethers";
import { MaterialTrade } from "./abi/MaterialTrade.js";
export default class MaterialTradeContract extends Contract<MaterialTrade> {
    constructor(rpc: string, address: string);
    createMaterial(signer: JsonRpcSigner, name: string, symbol: string): Promise<string>;
    private getBuyPriceAfterFee;
    buy(signer: JsonRpcSigner, address: string, amount: bigint): Promise<void>;
    sell(signer: JsonRpcSigner, address: string, amount: bigint): Promise<void>;
}
//# sourceMappingURL=MaterialTradeContract.d.ts.map