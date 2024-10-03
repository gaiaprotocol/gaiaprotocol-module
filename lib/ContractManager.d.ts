import { ChainInfo } from "@common-module/wallet";
import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";
declare class ContractManager {
    private materialTradeContracts;
    addMaterialTradeContract(chainName: string, chainInfo: ChainInfo, address: string): void;
    getMaterialTradeContract(chainName: string): MaterialTradeContract | undefined;
}
declare const _default: ContractManager;
export default _default;
//# sourceMappingURL=ContractManager.d.ts.map