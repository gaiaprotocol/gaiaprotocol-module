import { DomNode } from "@common-module/app";
import PersonaRepository from "./PersonaRepository.js";

export default class PersonaDisplay extends DomNode {
  constructor(private walletAddress: string) {
    super(".persona-display");
    this.append("Persona display for wallet address: ", walletAddress);
    this.loadPersona();
  }

  private async loadPersona() {
    const persona = await PersonaRepository.fetchPersona(this.walletAddress);
    console.log(persona);
  }
}
