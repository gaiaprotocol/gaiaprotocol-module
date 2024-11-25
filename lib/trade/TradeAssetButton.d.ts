import { Button } from "@common-module/app-components";
export default abstract class TradeAssetButton extends Button {
    private assetName;
    constructor(assetName: string);
    protected abstract checkHolder(): Promise<boolean>;
    protected abstract getPrice(): Promise<bigint>;
    private load;
}
//# sourceMappingURL=TradeAssetButton.d.ts.map