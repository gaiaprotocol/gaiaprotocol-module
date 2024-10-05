import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";
declare class ContractManager {
    private materialTradeContracts;
    addMaterialTradeContract(chain: string, rpc: string, address: string): void;
    getMaterialTradeContract(chain: string): MaterialTradeContract | undefined;
}
declare const _default: ContractManager;
export default _default;
//# sourceMappingURL=ContractManager.d.ts.map