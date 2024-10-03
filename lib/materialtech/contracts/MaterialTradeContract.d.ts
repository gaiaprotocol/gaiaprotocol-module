import { ChainInfo, Contract } from "@common-module/wallet";
import { JsonRpcSigner } from "ethers";
import { MaterialTrade } from "./abi/MaterialTrade.js";
export default class MaterialTradeContract extends Contract<MaterialTrade> {
    constructor(chain: ChainInfo, address: string);
    createMaterial(signer: JsonRpcSigner, name: string, symbol: string): Promise<void>;
}
//# sourceMappingURL=MaterialTradeContract.d.ts.map