import { DomNode } from "@common-module/app";

export default class SellMaterialTabContent extends DomNode {
  constructor() {
    super(".tab-content.sell-material");
    this.append("Sell Material Tab Content");
  }
}
