import { DomNode, el } from "@common-module/app";
import { StructuredModal } from "@common-module/app-components";
import GameDataManager from "../../game/GameDataManager.js";
import MaterialDataManager from "../MaterialDataManager.js";

export default class TradeMaterialModal extends StructuredModal {
  private materialIconDisplay: DomNode;
  private materialNameDisplay: DomNode;
  private materialDescriptionDisplay: DomNode;

  constructor(private address: string) {
    super(".trade-material-modal");

    this.appendToMain(
      this.materialIconDisplay = el(".material-icon"),
      this.materialNameDisplay = el("h2.material-name"),
      this.materialDescriptionDisplay = el("p.material-description"),
    );

    this.fetchMaterial();
  }

  private async fetchMaterial() {
    const material = await MaterialDataManager.getMaterial(this.address);
    if (material) {
      if (material.logo_image_url) {
        this.materialIconDisplay.style({
          backgroundImage: `url(${material.logo_image_url})`,
        });
      }

      if (material.name) this.materialNameDisplay.text = material.name;
      if (material.description) {
        this.materialDescriptionDisplay.text = material.description;
      }

      const game = await GameDataManager.getGame(material.game_id);
      if (game) {
        if (game.thumbnail_url) {
          this.header.style({ backgroundImage: `url(${game.thumbnail_url})` });
        }
      }
    }
  }
}
