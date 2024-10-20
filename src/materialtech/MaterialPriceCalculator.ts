import GaiaProtocolConfig from "../GaiaProtocolConfig.js";

class MaterialPriceCalculator {
  private getPrice(supply: bigint, amount: bigint): bigint {
    const startPriceWei =
      GaiaProtocolConfig.materialTech.priceIncrementPerToken +
      (supply * GaiaProtocolConfig.materialTech.priceIncrementPerToken) /
        (10n ** 18n);

    let endSupply = supply + amount;
    if (endSupply >= 10n ** 18n) {
      endSupply -= 10n ** 18n;
    } else {
      endSupply = 0n;
    }

    const endPriceWei =
      GaiaProtocolConfig.materialTech.priceIncrementPerToken +
      (endSupply *
          GaiaProtocolConfig.materialTech.priceIncrementPerToken) /
        (10n ** 18n);

    const averagePriceWei = (startPriceWei + endPriceWei) / 2n;
    const totalCostWei = (averagePriceWei * amount) / (10n ** 18n);

    return totalCostWei;
  }

  public getBuyPrice(supply: bigint, amount: bigint): bigint {
    return this.getPrice(supply, amount);
  }

  public getSellPrice(supply: bigint, amount: bigint): bigint {
    const supplyAfterSale = supply - amount;
    return this.getPrice(supplyAfterSale, amount);
  }

  public getBuyPriceAfterFee(
    supply: bigint,
    amount: bigint,
    protocolFeePercent: bigint,
    materialOwnerFeePercent: bigint,
  ): bigint {
    const price = this.getBuyPrice(supply, amount);
    const protocolFee = (price * protocolFeePercent) / (10n ** 18n);
    const materialOwnerFee = (price * materialOwnerFeePercent) /
      (10n ** 18n);
    return price + protocolFee + materialOwnerFee;
  }

  public getSellPriceAfterFee(
    supply: bigint,
    amount: bigint,
    protocolFeePercent: bigint,
    materialOwnerFeePercent: bigint,
  ): bigint {
    const price = this.getSellPrice(supply, amount);
    const protocolFee = (price * protocolFeePercent) / (10n ** 18n);
    const materialOwnerFee = (price * materialOwnerFeePercent) /
      (10n ** 18n);
    return price - protocolFee - materialOwnerFee;
  }
}

export default new MaterialPriceCalculator();
