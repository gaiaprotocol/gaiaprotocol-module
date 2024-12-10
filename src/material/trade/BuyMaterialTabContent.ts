import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import TradeMaterialTabContent from "./TradeMaterialTabContent.js";

export default class BuyMaterialTabContent extends TradeMaterialTabContent {
  constructor(private address: `0x${string}`) {
    super("buy");
  }

  protected async loadPrice(amount: bigint) {
    return await MaterialFactoryContract.getBuyPrice(
      this.address,
      amount,
    );
  }
}
