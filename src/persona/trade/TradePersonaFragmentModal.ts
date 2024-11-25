import TradeAssetModal from "../../trade/TradeAssetModal.js";

export default class TradePersonaFragmentModal extends TradeAssetModal {
  constructor(private walletAddress: string) {
    super();
  }
}
