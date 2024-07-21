import { DomNode } from "@common-module/app";
import Persona from "./Persona.js";

export default class PersonaDisplay extends DomNode {
  constructor(persona: Persona) {
    super(".persona-display");
  }
}
