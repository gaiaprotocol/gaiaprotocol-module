import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";
class ContractManager {
    materialTradeContracts = new Map();
    addMaterialTradeContract(chain, rpc, address) {
        this.materialTradeContracts.set(chain, new MaterialTradeContract(rpc, address));
    }
    getMaterialTradeContract(chain) {
        return this.materialTradeContracts.get(chain);
    }
}
export default new ContractManager();
//# sourceMappingURL=ContractManager.js.map