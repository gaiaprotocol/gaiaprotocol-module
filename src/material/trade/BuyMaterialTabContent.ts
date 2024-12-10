import { DomNode } from "@common-module/app";

export default class BuyMaterialTabContent extends DomNode {
  constructor() {
    super(".tab-content.buy-material");
    this.append("Buy Material Tab Content");
  }
}
