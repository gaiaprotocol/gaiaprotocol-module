import BuyAssetModal from "../../trade/BuyAssetModal.js";

export default class BuyPersonaFragmentModal extends BuyAssetModal {
  constructor(private walletAddress: string) {
    super();
  }
}
