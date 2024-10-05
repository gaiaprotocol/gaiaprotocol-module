import { JsonRpcSigner } from "ethers";
import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";
declare class ContractManager {
    private materialTradeContracts;
    addMaterialTradeContract(chain: string, rpc: string, address: string): void;
    executeMaterialTradeAction<T>(chain: string, operation: (contract: MaterialTradeContract, signer: JsonRpcSigner) => Promise<T>): Promise<T>;
}
declare const _default: ContractManager;
export default _default;
//# sourceMappingURL=ContractManager.d.ts.map