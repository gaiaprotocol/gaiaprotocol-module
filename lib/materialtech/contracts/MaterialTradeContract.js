import { Contract } from "@common-module/contract";
import MaterialTradeArtifact from "./abi/MaterialTrade.json" assert {
    type: "json"
};
export default class MaterialTradeContract extends Contract {
    constructor(rpc, address) {
        super(MaterialTradeArtifact.abi);
        this.init(rpc, address);
    }
    async createMaterial(signer, name, symbol) {
        await this.executeAndWait(signer, (contract) => contract.createMaterial(name, symbol));
    }
}
//# sourceMappingURL=MaterialTradeContract.js.map