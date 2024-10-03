import { Contract } from "@common-module/contract";
import { JsonRpcSigner } from "ethers";
import { MaterialTrade } from "./abi/MaterialTrade.js";
export default class MaterialTradeContract extends Contract<MaterialTrade> {
    constructor(rpc: string, address: string);
    createMaterial(signer: JsonRpcSigner, name: string, symbol: string): Promise<void>;
}
//# sourceMappingURL=MaterialTradeContract.d.ts.map