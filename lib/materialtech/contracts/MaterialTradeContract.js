import { Contract } from "@common-module/wallet";
import MaterialTradeArtifact from "./abi/MaterialTrade.json" assert {
    type: "json"
};
export default class MaterialTradeContract extends Contract {
    constructor() {
        super(MaterialTradeArtifact.abi);
    }
}
//# sourceMappingURL=MaterialTradeContract.js.map