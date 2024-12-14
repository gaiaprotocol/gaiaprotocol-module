import { DomNode, el } from "@common-module/app";
import { AlertDialog, AppCompConfig, Button, ButtonType, Input, } from "@common-module/app-components";
import { StringUtils } from "@common-module/ts";
import { WalletLoginManager } from "@common-module/wallet-login";
import { SuccessIcon } from "@gaiaprotocol/svg-icons";
import { formatEther, parseEther } from "viem";
import MaterialContract from "../contracts/MaterialContract.js";
import MaterialFactoryContract from "../contracts/MaterialFactoryContract.js";
import FeeRecipientDisplay from "./FeeRecipientDisplay.js";
export default class TradeMaterialTabContent extends DomNode {
    tradeType;
    address;
    materialContract;
    amountInput;
    balanceDisplay;
    unitPriceDisplay;
    totalPriceDisplay;
    feeDisplay;
    materialFeeRecipientDisplay;
    protocolFeeRecipientDisplay;
    tradeButton;
    symbol;
    constructor(tradeType, address) {
        super(".tab-content.trade-material");
        this.tradeType = tradeType;
        this.address = address;
        this.materialContract = new MaterialContract(address);
        this.append(el("section.amount", el("header", el("h3", "Amount"), el(".current-balance", el("span.label", "Your Balance"), this.balanceDisplay = el("span.balance", new AppCompConfig.LoadingSpinner()), tradeType === "sell"
            ? new Button({
                type: ButtonType.Outlined,
                title: "Max",
                onClick: () => {
                    this.amountInput.value = this.balanceDisplay.text;
                },
            })
            : undefined)), this.amountInput = new Input({
            placeholder: "0.0000",
            onChange: () => {
                try {
                    const amount = parseEther(this.amountInput.value);
                    amount > 0n
                        ? this.tradeButton.enable()
                        : this.tradeButton.disable();
                }
                catch (error) {
                    console.error(error);
                    this.tradeButton.disable();
                }
                this.loadAllPrices();
            },
        })), el("section.price", el("header", el("h3", `${StringUtils.capitalize(tradeType)} Price`), el(".unit-price", el("span.label", "Unit Price"), this.unitPriceDisplay = el("span.price", new AppCompConfig.LoadingSpinner()))), el("ul", el("li", el("span.label", "Total Price"), this.totalPriceDisplay = el("span.price")), el("li", el("span.label", "Fee"), this.feeDisplay = el("span.price")))), el("section.fee-recipients", el("header", el("h3", "Fee Recipients"), el("span.recipient-count", "2 recipients")), el(".recipients", this.materialFeeRecipientDisplay = new FeeRecipientDisplay("Material Owner"), this.protocolFeeRecipientDisplay = new FeeRecipientDisplay("Protocol Owner"))), el(".button-container", this.tradeButton = new Button({
            type: ButtonType.Contained,
            title: `${StringUtils.capitalize(tradeType)} Material`,
            disabled: this.amountInput.value.trim() === "",
            onClick: async () => {
                const amount = parseEther(this.amountInput.value);
                await this.trade(amount);
                this.emit("traded");
                this.loadAllPrices();
                new AlertDialog({
                    icon: new SuccessIcon(),
                    title: "Trade Successful",
                    message: `You have successfully ${tradeType}ed ${formatEther(amount)} ${this.symbol ?? "material"}.`,
                });
            },
        }), new Button({
            type: ButtonType.Outlined,
            title: "Cancel",
            onClick: () => this.emit("canceled"),
        })));
        this.loadAllPrices();
    }
    loadAllPrices() {
        this.loadBalance();
        this.loadUnitPrice();
        this.loadTotalPrice();
        this.loadFee();
    }
    async loadBalance() {
        try {
            const walletAddress = WalletLoginManager.getLoggedInAddress();
            if (!walletAddress)
                throw new Error("Wallet not logged in");
            this.balanceDisplay.clear().append(new AppCompConfig.LoadingSpinner());
            const balance = await this.materialContract.balanceOf(walletAddress);
            this.balanceDisplay.clear().append(formatEther(balance));
        }
        catch (error) {
            console.error(error);
            this.balanceDisplay.clear().append(new AppCompConfig.ErrorIcon());
        }
    }
    async loadUnitPrice() {
        try {
            const priceAfterFee = await this.loadPriceAfterFee(parseEther("1"));
            this.unitPriceDisplay.clear().append(formatEther(priceAfterFee), " ETH");
        }
        catch (error) {
            console.error(error);
            this.unitPriceDisplay.clear().append(new AppCompConfig.ErrorIcon());
        }
    }
    async loadTotalPrice() {
        try {
            this.totalPriceDisplay.clear().append(new AppCompConfig.LoadingSpinner());
            const amount = parseEther(this.amountInput.value);
            const priceAfterFee = await this.loadPriceAfterFee(amount);
            this.totalPriceDisplay.clear().append(formatEther(priceAfterFee), " ETH");
        }
        catch (error) {
            console.error(error);
            this.totalPriceDisplay.clear().append(new AppCompConfig.ErrorIcon());
        }
    }
    async loadFee() {
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
            this.feeDisplay.clear().append(formatEther(protocolFee + materialOwnerFee), " ETH");
        }
        catch (error) {
            console.error(error);
            this.feeDisplay.clear().append(new AppCompConfig.ErrorIcon());
        }
    }
    setSymbol(symbol) {
        this.symbol = symbol;
        this.tradeButton.title = `${StringUtils.capitalize(this.tradeType)} ${symbol}`;
    }
}
//# sourceMappingURL=TradeMaterialTabContent.js.map