import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import TradeMaterialTabContent from "./TradeMaterialTabContent.js";
export default class BuyMaterialTabContent extends TradeMaterialTabContent {
    constructor(address) {
        super(address, "buy");
    }
    async loadPrice(amount) {
        return await MaterialFactoryContract.getBuyPrice(this.address, amount);
    }
    async loadPriceAfterFee(amount) {
        return await MaterialFactoryContract.getBuyPriceAfterFee(this.address, amount);
    }
    async trade(amount) {
        await MaterialFactoryContract.buy(this.address, amount);
    }
}
//# sourceMappingURL=BuyMaterialTabContent.js.map