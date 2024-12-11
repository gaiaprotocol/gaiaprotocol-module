import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import TradeMaterialTabContent from "./TradeMaterialTabContent.js";

export default class SellMaterialTabContent extends TradeMaterialTabContent {
  constructor(address: `0x${string}`) {
    super(address, "sell");
  }

  protected async loadPrice(amount: bigint) {
    return await MaterialFactoryContract.getSellPrice(this.address, amount);
  }

  protected async loadPriceAfterFee(amount: bigint) {
    return await MaterialFactoryContract.getSellPriceAfterFee(
      this.address,
      amount,
    );
  }

  protected async trade(amount: bigint): Promise<void> {
    await MaterialFactoryContract.sell(this.address, amount);
  }
}
