import { DomNode, el } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { StringUtils } from "@common-module/ts";
export default class TradeMaterialPanel extends DomNode {
    constructor(tradeType) {
        super(".trade-material-panel");
        this.append(el("section.amount", new Input({
            label: "Amount",
            placeholder: "0.0000",
        })), el("section.price", el("h3", `${StringUtils.capitalize(tradeType)} Price`)), el("section.fee-recipients", el("h3", "Fee Recipients")));
    }
}
//# sourceMappingURL=TradeMaterialPanel.js.map