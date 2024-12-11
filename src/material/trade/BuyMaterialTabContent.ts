import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import TradeMaterialTabContent from "./TradeMaterialTabContent.js";

export default class BuyMaterialTabContent extends TradeMaterialTabContent {
  constructor(address: `0x${string}`) {
    super(address, "buy");
  }

  protected async loadPrice(amount: bigint) {
    return await MaterialFactoryContract.getBuyPrice(this.address, amount);
  }

  protected async loadPriceAfterFee(amount: bigint) {
    return await MaterialFactoryContract.getBuyPriceAfterFee(
      this.address,
      amount,
    );
  }

  protected async trade(amount: bigint): Promise<void> {
    await MaterialFactoryContract.buy(this.address, amount);
  }
}
