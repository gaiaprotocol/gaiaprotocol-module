import { DomNode } from "@common-module/app";

export default class PersonaForm extends DomNode {
  constructor(mode: "create" | "edit") {
    super(".persona-form");
  }
}
