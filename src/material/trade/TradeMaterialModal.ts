import { DomNode, el } from "@common-module/app";
import { Modal, Tab, TabGroup } from "@common-module/app-components";
import GameDataManager from "../../game/GameDataManager.js";
import MaterialDataManager from "../MaterialDataManager.js";
import BuyMaterialTabContent from "./BuyMaterialTabContent.js";
import SellMaterialTabContent from "./SellMaterialTabContent.js";

export default class TradeMaterialModal extends Modal<{
  traded: () => void;
}> {
  private gameBanner: DomNode;

  private materialIconDisplay: DomNode;
  private materialNameDisplay: DomNode;
  private materialDescriptionDisplay: DomNode;

  private tabGroup: TabGroup<"buy" | "sell">;
  private buyTabContent: BuyMaterialTabContent;
  private sellTabContent: SellMaterialTabContent;

  constructor(private address: `0x${string}`, displayPoweredBy = true) {
    super(".trade-material-modal");

    this.append(
      el(
        "header",
        this.gameBanner = el(".game-banner"),
        this.materialIconDisplay = el(".material-icon"),
        this.materialNameDisplay = el("h2.material-name"),
      ),
      el(
        "main",
        this.materialDescriptionDisplay = el("p.material-description"),
        this.tabGroup = new TabGroup(
          new Tab({ label: "Buy", value: "buy" }),
          new Tab({ label: "Sell", value: "sell" }),
        ),
        this.buyTabContent = new BuyMaterialTabContent(address),
        this.sellTabContent = new SellMaterialTabContent(address),
      ),
      displayPoweredBy
        ? el(
          "footer",
          el(
            ".powered-by",
            "Powered by ",
            el(
              "a",
              "Gaia Materials",
              el("img", {
                src:
                  "https://common-resources.gaia.cc/mini-icons/gaia-materials.png",
              }),
              {
                href: "https://materials.gaia.cc",
                target: "_blank",
              },
            ),
          ),
        )
        : undefined,
    );

    [this.buyTabContent, this.sellTabContent].forEach((tabContent) => {
      tabContent.on("traded", () => this.emit("traded"));
      tabContent.on("canceled", () => this.remove());
    });

    this.fetchMaterial();

    this.tabGroup.on("tabSelected", () => this.changeTab());
    this.changeTab();
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

      if (material.symbol) {
        [this.buyTabContent, this.sellTabContent].forEach((tabContent) => {
          tabContent.setSymbol(material.symbol!);
        });
      }

      const game = await GameDataManager.getGame(material.game_id);
      if (game?.thumbnail_url) {
        this.gameBanner.style({
          backgroundImage: `url(${game.thumbnail_url})`,
        });
      }
    }
  }

  private changeTab() {
    const tabName = this.tabGroup.getSelectedValue();
    if (tabName === "buy") {
      this.buyTabContent.removeClass("hidden");
      this.sellTabContent.addClass("hidden");
    } else if (tabName === "sell") {
      this.buyTabContent.addClass("hidden");
      this.sellTabContent.removeClass("hidden");
    }
  }
}
