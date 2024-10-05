import { ContractEventTracker } from "@common-module/contract-event-tracker";
import { WalletLoginManager } from "@common-module/wallet-login";
import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";
class ContractManager {
    materialTradeContracts = new Map();
    addMaterialTradeContract(chain, rpc, address) {
        this.materialTradeContracts.set(chain, new MaterialTradeContract(rpc, address));
    }
    async executeMaterialTradeAction(chain, operation) {
        const contract = this.materialTradeContracts.get(chain);
        if (!contract)
            throw new Error("MaterialTrade contract not found");
        const signer = await WalletLoginManager.getSigner();
        if (!signer)
            throw new Error("Signer not found");
        const result = await operation(contract, signer);
        await ContractEventTracker.trackEvents(chain, "MaterialTrade");
        return result;
    }
}
export default new ContractManager();
//# sourceMappingURL=ContractManager.js.map