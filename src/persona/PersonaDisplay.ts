import { DomNode } from "@common-module/app";
import PersonaEntity from "./PersonaEntity.js";

export default class PersonaDisplay extends DomNode {
  constructor(persona: PersonaEntity) {
    super(".persona-display");
    this.append(JSON.stringify(persona));
  }
}
