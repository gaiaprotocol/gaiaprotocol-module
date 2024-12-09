import { el } from "@common-module/app";
import { StructuredModal } from "@common-module/app-components";
import GameDataManager from "../../game/GameDataManager.js";
import MaterialDataManager from "../MaterialDataManager.js";
export default class TradeMaterialModal extends StructuredModal {
    address;
    materialIconDisplay;
    materialNameDisplay;
    constructor(address) {
        super(".trade-material-modal");
        this.address = address;
        this.appendToHeader();
        this.appendToMain(this.materialIconDisplay = el(".material-icon"), this.materialNameDisplay = el(".material-name"));
        this.fetchMaterial();
    }
    async fetchMaterial() {
        const material = await MaterialDataManager.getMaterial(this.address);
        if (material) {
            if (material.logo_image_url) {
                this.materialIconDisplay.style({
                    backgroundImage: `url(${material.logo_image_url})`,
                });
            }
            if (material.name)
                this.materialNameDisplay.text = material.name;
            const game = await GameDataManager.getGame(material.game_id);
            if (game) {
                if (game.thumbnail_url) {
                    this.header.style({ backgroundImage: `url(${game.thumbnail_url})` });
                }
            }
        }
    }
}
//# sourceMappingURL=TradeMaterialModal.js.map