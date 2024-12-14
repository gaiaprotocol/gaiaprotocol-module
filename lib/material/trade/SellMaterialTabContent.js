import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import TradeMaterialTabContent from "./TradeMaterialTabContent.js";
export default class SellMaterialTabContent extends TradeMaterialTabContent {
    constructor(address) {
        super("sell", address);
    }
    async loadPrice(amount) {
        return await MaterialFactoryContract.getSellPrice(this.address, amount);
    }
    async loadPriceAfterFee(amount) {
        return await MaterialFactoryContract.getSellPriceAfterFee(this.address, amount);
    }
    async trade(amount) {
        await MaterialFactoryContract.sell(this.address, amount);
    }
}
//# sourceMappingURL=SellMaterialTabContent.js.map