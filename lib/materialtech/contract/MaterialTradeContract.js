import { Contract } from "@common-module/wallet";
import ProfilesArtifact from "./abi/MaterialTrade.json" assert {
    type: "json"
};
class MaterialTradeContract extends Contract {
    constructor() {
        super(ProfilesArtifact.abi);
    }
}
export default new MaterialTradeContract();
//# sourceMappingURL=MaterialTradeContract.js.map