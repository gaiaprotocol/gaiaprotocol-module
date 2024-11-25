import { AppCompConfig, Button, ButtonType, } from "@common-module/app-components";
import { StringUtils } from "@common-module/ts";
import { EthereumIcon } from "@gaiaprotocol/svg-icons";
import { formatEther } from "viem";
export default class TradePersonaFragmentButton extends Button {
    constructor(walletAddress) {
        super(".trade-persona-fragment-button", {
            type: ButtonType.Contained,
            title: new AppCompConfig.LoadingSpinner(),
        });
        this.load();
    }
    async checkHolder() {
        return false;
    }
    async getPrice() {
        return 0n;
    }
    async load() {
        const [isHolder, price] = await Promise.all([
            this.checkHolder(),
            this.getPrice(),
        ]);
        this.title = [
            isHolder ? "Trade Fragment" : "Buy Fragment",
            new EthereumIcon(),
            StringUtils.formatNumberWithCommas(formatEther(price)),
        ];
    }
}
//# sourceMappingURL=TradePersonaFragmentButton.js.map