import { DomNode, el } from "@common-module/app";
import { Input } from "@common-module/app-components";
export default class BuyMaterialTabContent extends DomNode {
    constructor() {
        super(".tab-content.buy-material");
        this.append(el("section.amount", new Input({
            label: "Amount",
            placeholder: "0.0000",
        })), el("section.price", el("h3", "Buy Price")), el("section.fee-recipients", el("h3", "Fee Recipients")));
    }
}
//# sourceMappingURL=BuyMaterialTabContent%20copy.js.map