import { AlertDialog, AppCompConfig, Button, ButtonType, } from "@common-module/app-components";
import { StringUtils } from "@common-module/ts";
import { EthereumIcon } from "@gaiaprotocol/svg-icons";
import { formatEther } from "viem";
export default class TradeAssetButton extends Button {
    assetName;
    constructor(assetName) {
        super(".trade-asset-button", {
            type: ButtonType.Contained,
            title: new AppCompConfig.LoadingSpinner(),
        });
        this.assetName = assetName;
        this.load();
    }
    async load() {
        const [isHolder, price] = await Promise.all([
            this.checkHolder(),
            this.getPrice(),
        ]);
        this.title = [
            isHolder ? `Trade ${this.assetName}` : `Buy ${this.assetName}`,
            new EthereumIcon(),
            StringUtils.formatNumberWithCommas(formatEther(price)),
        ];
        this.on("click", () => {
            console.log(isHolder, price);
            new AlertDialog({
                title: "Work in Progress",
                message: "This feature is not yet available.",
            });
        });
    }
}
//# sourceMappingURL=TradeAssetButton.js.map