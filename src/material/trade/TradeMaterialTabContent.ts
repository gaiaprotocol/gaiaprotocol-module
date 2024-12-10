import { DomNode, el } from "@common-module/app";
import { AppCompConfig, Input } from "@common-module/app-components";
import { StringUtils } from "@common-module/ts";
import { formatEther, parseEther } from "viem";
import MaterialContract from "../contracts/MaterialContract.js";
import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import FeeRecipientList from "./FeeRecipientList.js";

export default abstract class TradeMaterialTabContent extends DomNode {
  private materialContract: MaterialContract;

  private amountInput: Input;
  private balanceDisplay: DomNode;
  private unitPriceDisplay: DomNode;
  private totalPriceDisplay: DomNode;
  private feeDisplay: DomNode;
  private feeRecipientList: FeeRecipientList;

  constructor(protected address: `0x${string}`, tradeType: "buy" | "sell") {
    super(".tab-content.trade-material");

    this.materialContract = new MaterialContract(address);

    this.append(
      el(
        "section.amount",
        el(
          "header",
          el("h3", "Amount"),
          el(
            ".current-balance",
            el("span.label", "Your Balance"),
            this.balanceDisplay = el(
              "span.balance",
              new AppCompConfig.LoadingSpinner(),
            ),
          ),
        ),
        this.amountInput = new Input({
          placeholder: "0.0000",
          value: "1",
          onChange: () => this.loadAllPrices(),
        }),
      ),
      el(
        "section.price",
        el(
          "header",
          el(
            "h3",
            `${StringUtils.capitalize(tradeType)} Price`,
          ),
          el(
            ".unit-price",
            el("span.label", "Unit Price"),
            this.unitPriceDisplay = el(
              "span.price",
              new AppCompConfig.LoadingSpinner(),
            ),
          ),
        ),
        el(
          "ul",
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
        el(
          "header",
          el("h3", "Fee Recipients"),
          el("span.recipient-count", "2 recipients"),
        ),
        this.feeRecipientList = new FeeRecipientList(),
      ),
    );

    this.loadAllPrices();
  }

  private loadAllPrices() {
    this.loadBalance();
    this.loadUnitPrice();
    this.loadTotalPrice();
    this.loadFee();
  }

  private async loadBalance() {
    try {
      this.balanceDisplay.clear().append(new AppCompConfig.LoadingSpinner());
      const balance = await this.materialContract.balanceOf(this.address);
      this.balanceDisplay.clear().append(formatEther(balance));
    } catch (error) {
      console.error(error);
      this.balanceDisplay.clear().append(new AppCompConfig.ErrorIcon());
    }
  }

  private async loadUnitPrice() {
    try {
      const priceAfterFee = await this.loadPriceAfterFee(parseEther("1"));
      this.unitPriceDisplay.clear().append(formatEther(priceAfterFee), " ETH");
    } catch (error) {
      console.error(error);
      this.unitPriceDisplay.clear().append(new AppCompConfig.ErrorIcon());
    }
  }

  private async loadTotalPrice() {
    try {
      this.totalPriceDisplay.clear().append(new AppCompConfig.LoadingSpinner());
      const amount = parseEther(this.amountInput.value);
      const priceAfterFee = await this.loadPriceAfterFee(amount);
      this.totalPriceDisplay.clear().append(formatEther(priceAfterFee), " ETH");
    } catch (error) {
      console.error(error);
      this.totalPriceDisplay.clear().append(new AppCompConfig.ErrorIcon());
    }
  }

  private async loadFee() {
    try {
      this.feeDisplay.clear().append(new AppCompConfig.LoadingSpinner());
      const amount = parseEther(this.amountInput.value);
      const [price, protocolFeeRate, materialOwnerFeeRate] = await Promise.all([
        this.loadPrice(amount),
        MaterialFactoryContract.getProtocolFeeRate(),
        MaterialFactoryContract.getMaterialOwnerFeeRate(),
      ]);

      const protocolFee = price * protocolFeeRate / parseEther("1");
      const materialOwnerFee = price * materialOwnerFeeRate / parseEther("1");

      this.feeDisplay.clear().append(
        formatEther(protocolFee + materialOwnerFee),
        " ETH",
      );
    } catch (error) {
      console.error(error);
      this.feeDisplay.clear().append(new AppCompConfig.ErrorIcon());
    }
  }

  protected abstract loadPrice(amount: bigint): Promise<bigint>;
  protected abstract loadPriceAfterFee(amount: bigint): Promise<bigint>;
}
