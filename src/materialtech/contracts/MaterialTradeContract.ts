import { Contract } from "@common-module/wallet";
import { MaterialTrade } from "./abi/MaterialTrade.js";
import MaterialTradeArtifact from "./abi/MaterialTrade.json" assert {
  type: "json",
};

export default class MaterialTradeContract extends Contract<MaterialTrade> {
  constructor() {
    super(MaterialTradeArtifact.abi);
  }
}
