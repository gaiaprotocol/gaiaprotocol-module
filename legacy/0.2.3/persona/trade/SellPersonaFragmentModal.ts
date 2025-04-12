import SellAssetModal from "../../trade/SellAssetModal.js";

export default class SellPersonaFragmentModal extends SellAssetModal {
  constructor(private walletAddress: string) {
    super();
  }
}
