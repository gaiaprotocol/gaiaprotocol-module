import { DomNode } from "@common-module/app";

export default class PersonaPostForm extends DomNode {
  constructor(mode: "write" | "edit") {
    super(".persona-post-form");
  }
}
