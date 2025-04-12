import { DomNode, el } from "@common-module/app";
import { CheckIcon } from "@gaiaprotocol/svg-icons";
import OpenSeaNFTData from "../opensea/OpenSeaNFTData.js";

interface NFTListItemOptions {
  data: OpenSeaNFTData & {
    attributes?: { trait_type: string; value: string }[];
  };
  onClick?: () => void;
  selectMode?: boolean;
}

export default class NFTListItem extends DomNode {
  private checkIconContainer: DomNode;

  constructor(private options: NFTListItemOptions) {
    super("li.nft-list-item");
    this.style({
      backgroundImage: `url(${options.data.display_image_url})`,
    });
    this.append(
      el(
        "a",
        el("h3.name", options.data.name),
        el(
          "p.description",
          options.data.attributes?.filter((attr) =>
            attr.trait_type !== "Background" && attr.value !== "None"
          ).map((attr) => attr.value).join(", "),
        ),
        {
          onclick: () => {
            if (options.selectMode) {
              this.isSelected() ? this.deselect() : this.select();
            }
            options.onClick?.();
          },
        },
      ),
      this.checkIconContainer = el(".check-icon-container"),
    );
  }

  public isSelected(): boolean {
    return this.hasClass("selected");
  }

  public getData(): OpenSeaNFTData {
    return this.options.data;
  }

  public select() {
    if (!this.isSelected()) {
      this.addClass("selected");
      this.checkIconContainer.append(new CheckIcon());
    }
  }

  public deselect() {
    this.removeClass("selected");
    this.checkIconContainer.clear();
  }
}
