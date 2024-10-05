import GaiaProtocolModuleConfig from "../GaiaProtocolModuleConfig.js";
class MaterialPriceCalculator {
    getPrice(supply, amount) {
        const startPriceWei = GaiaProtocolModuleConfig.materialTech.priceIncrementPerToken +
            (supply * GaiaProtocolModuleConfig.materialTech.priceIncrementPerToken) /
                (10n ** 18n);
        let endSupply = supply + amount;
        if (endSupply >= 10n ** 18n) {
            endSupply -= 10n ** 18n;
        }
        else {
            endSupply = 0n;
        }
        const endPriceWei = GaiaProtocolModuleConfig.materialTech.priceIncrementPerToken +
            (endSupply *
                GaiaProtocolModuleConfig.materialTech.priceIncrementPerToken) /
                (10n ** 18n);
        const averagePriceWei = (startPriceWei + endPriceWei) / 2n;
        const totalCostWei = (averagePriceWei * amount) / (10n ** 18n);
        return totalCostWei;
    }
    getBuyPrice(supply, amount) {
        return this.getPrice(supply, amount);
    }
    getSellPrice(supply, amount) {
        const supplyAfterSale = supply - amount;
        return this.getPrice(supplyAfterSale, amount);
    }
    getBuyPriceAfterFee(supply, amount, protocolFeePercent, materialOwnerFeePercent) {
        const price = this.getBuyPrice(supply, amount);
        const protocolFee = (price * protocolFeePercent) / (10n ** 18n);
        const materialOwnerFee = (price * materialOwnerFeePercent) /
            (10n ** 18n);
        return price + protocolFee + materialOwnerFee;
    }
    getSellPriceAfterFee(supply, amount, protocolFeePercent, materialOwnerFeePercent) {
        const price = this.getSellPrice(supply, amount);
        const protocolFee = (price * protocolFeePercent) / (10n ** 18n);
        const materialOwnerFee = (price * materialOwnerFeePercent) /
            (10n ** 18n);
        return price - protocolFee - materialOwnerFee;
    }
}
export default new MaterialPriceCalculator();
//# sourceMappingURL=MaterialPriceCalculator.js.map