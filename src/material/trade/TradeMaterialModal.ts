import { StructuredModal } from "@common-module/app-components";
import GameDataManager from "../../game/GameDataManager.js";
import MaterialDataManager from "../MaterialDataManager.js";

export default class TradeMaterialModal extends StructuredModal {
  constructor(private address: string) {
    super(".trade-material-modal");
    this.fetchMaterial();
  }

  private async fetchMaterial() {
    const material = await MaterialDataManager.getMaterial(this.address);
    if (material) {
      const game = await GameDataManager.getGame(material.game_id);
      console.log(material, game);
    }
  }
}
