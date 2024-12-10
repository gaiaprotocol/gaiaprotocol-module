import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import TradeMaterialTabContent from "./TradeMaterialTabContent.js";
export default class BuyMaterialTabContent extends TradeMaterialTabContent {
    address;
    constructor(address) {
        super("buy");
        this.address = address;
    }
    async loadPrice(amount) {
        return await MaterialFactoryContract.getBuyPrice(this.address, amount);
    }
}
//# sourceMappingURL=BuyMaterialTabContent.js.map