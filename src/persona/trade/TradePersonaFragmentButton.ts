import TradeAssetButton from "../../trade/TradeAssetButton.js";

export default class TradePersonaFragmentButton extends TradeAssetButton {
  constructor(private walletAddress: string) {
    super("Fragment");
  }

  protected async checkHolder(): Promise<boolean> {
    return false;
  }

  protected async getPrice(): Promise<bigint> {
    return 0n;
  }
}
