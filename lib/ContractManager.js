import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";
class ContractManager {
    materialTradeContracts = new Map();
    addMaterialTradeContract(chainName, rpc, address) {
        this.materialTradeContracts.set(chainName, new MaterialTradeContract(rpc, address));
    }
    getMaterialTradeContract(chainName) {
        return this.materialTradeContracts.get(chainName);
    }
}
export default new ContractManager();
//# sourceMappingURL=ContractManager.js.map