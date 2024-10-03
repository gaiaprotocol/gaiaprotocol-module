import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";
class ContractManager {
    materialTradeContracts = new Map();
    addMaterialTradeContract(chainName, chainInfo, address) {
        this.materialTradeContracts.set(chainName, new MaterialTradeContract(chainInfo, address));
    }
    getMaterialTradeContract(chainName) {
        return this.materialTradeContracts.get(chainName);
    }
}
export default new ContractManager();
//# sourceMappingURL=ContractManager.js.map