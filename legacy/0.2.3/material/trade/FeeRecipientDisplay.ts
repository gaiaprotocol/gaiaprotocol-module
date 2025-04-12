import { DomNode } from "@common-module/app";

export default class FeeRecipientDisplay extends DomNode {
  constructor(title: string) {
    super(".fee-recipient-display");
    this.text = title;
  }
}
