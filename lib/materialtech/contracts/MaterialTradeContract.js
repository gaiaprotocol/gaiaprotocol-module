import { Contract } from "@common-module/wallet";
import MaterialTradeArtifact from "./abi/MaterialTrade.json" assert {
    type: "json"
};
export default class MaterialTradeContract extends Contract {
    constructor(chain, address) {
        super(MaterialTradeArtifact.abi);
        this.init(chain, address);
    }
    async createMaterial(signer, name, symbol) {
        await this.executeAndWait(signer, (contract) => contract.createMaterial(name, symbol));
    }
}
//# sourceMappingURL=MaterialTradeContract.js.map