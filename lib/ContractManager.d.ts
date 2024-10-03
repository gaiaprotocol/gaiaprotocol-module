import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";
declare class ContractManager {
    private materialTradeContracts;
    addMaterialTradeContract(chainName: string, rpc: string, address: string): void;
    getMaterialTradeContract(chainName: string): MaterialTradeContract | undefined;
}
declare const _default: ContractManager;
export default _default;
//# sourceMappingURL=ContractManager.d.ts.map