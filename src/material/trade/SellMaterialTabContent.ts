import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import TradeMaterialTabContent from "./TradeMaterialTabContent.js";

export default class SellMaterialTabContent extends TradeMaterialTabContent {
  constructor(private address: `0x${string}`) {
    super("sell");
  }

  protected async loadPrice(amount: bigint) {
    return await MaterialFactoryContract.getSellPrice(
      this.address,
      amount,
    );
  }
}
