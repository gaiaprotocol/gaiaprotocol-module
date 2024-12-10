import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import TradeMaterialTabContent from "./TradeMaterialTabContent.js";
export default class SellMaterialTabContent extends TradeMaterialTabContent {
    address;
    constructor(address) {
        super("sell");
        this.address = address;
    }
    async loadPrice(amount) {
        return await MaterialFactoryContract.getSellPrice(this.address, amount);
    }
}
//# sourceMappingURL=SellMaterialTabContent.js.map