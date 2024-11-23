import { DomNode, el } from "@common-module/app";
import { CheckIcon } from "@gaiaprotocol/svg-icons";
export default class NFTListItem extends DomNode {
    options;
    checkIconContainer;
    constructor(options) {
        super("li.nft-list-item");
        this.options = options;
        this.style({
            backgroundImage: `url(${options.data.display_image_url})`,
        });
        this.append(el("a", el("h3.name", options.data.name), el("p.description", options.data.attributes?.filter((attr) => attr.trait_type !== "Background" && attr.value !== "None").map((attr) => attr.value).join(", ")), {
            onclick: () => {
                if (options.selectMode) {
                    this.isSelected() ? this.deselect() : this.select();
                }
                options.onClick?.();
            },
        }), this.checkIconContainer = el(".check-icon-container"));
    }
    isSelected() {
        return this.hasClass("selected");
    }
    getData() {
        return this.options.data;
    }
    select() {
        if (!this.isSelected()) {
            this.addClass("selected");
            this.checkIconContainer.append(new CheckIcon());
        }
    }
    deselect() {
        this.removeClass("selected");
        this.checkIconContainer.clear();
    }
}
//# sourceMappingURL=NFTListItem.js.map