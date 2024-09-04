import { Contract } from "@common-module/wallet";
import { MaterialTrade } from "./abi/MaterialTrade.js";
import ProfilesArtifact from "./abi/MaterialTrade.json" assert {
  type: "json",
};

class MaterialTradeContract extends Contract<MaterialTrade> {
  constructor() {
    super(ProfilesArtifact.abi);
  }
}

export default new MaterialTradeContract();
