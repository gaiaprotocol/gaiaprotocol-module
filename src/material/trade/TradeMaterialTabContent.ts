import { DomNode, el } from "@common-module/app";
import { AppCompConfig, Input } from "@common-module/app-components";
import { StringUtils } from "@common-module/ts";
import FeeRecipientList from "./FeeRecipientList.js";

export default abstract class TradeMaterialTabContent extends DomNode {
  private unitPriceDisplay: DomNode;
  private totalPriceDisplay: DomNode;
  private feeDisplay: DomNode;
  private feeRecipientList: FeeRecipientList;

  constructor(tradeType: "buy" | "sell") {
    super(".tab-content.trade-material");
    this.append(
      el(
        "section.amount",
        new Input({
          label: "Amount",
          placeholder: "0.0000",
        }),
      ),
      el(
        "section.price",
        el(
          "h3",
          `${StringUtils.capitalize(tradeType)} Price`,
        ),
        el(
          "ul",
          el(
            "li",
            el("span.label", "Unit Price"),
            this.unitPriceDisplay = el("span.price"),
          ),
          el(
            "li",
            el("span.label", "Total Price"),
            this.totalPriceDisplay = el("span.price"),
          ),
          el("li", el("span.label", "Fee"), this.feeDisplay = el("span.price")),
        ),
      ),
      el(
        "section.fee-recipients",
        el("h3", "Fee Recipients"),
        this.feeRecipientList = new FeeRecipientList(),
      ),
    );

    this.renderPrice();
  }

  private async renderPrice() {
    for (
      const priceDisplay of [
        this.unitPriceDisplay,
        this.totalPriceDisplay,
        this.feeDisplay,
      ]
    ) {
      priceDisplay.clear().append(new AppCompConfig.LoadingSpinner());
    }
  }

  protected abstract loadPrice(amount: bigint): Promise<bigint>;
  protected abstract loadPriceAfterFee(amount: bigint): Promise<bigint>;
}
