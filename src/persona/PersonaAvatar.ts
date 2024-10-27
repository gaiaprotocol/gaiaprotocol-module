import { DomNode } from "@common-module/app";
import { WalletAvatar } from "@common-module/wallet";
import PersonaRepository from "./PersonaRepository.js";

export default class PersonaAvatar extends DomNode {
  constructor(private walletAddress: string, private size: number) {
    super(".persona-avatar");
    this.render();
  }

  private async render() {
    const persona = await PersonaRepository.fetchPersona(this.walletAddress);
    this.empty().append(
      persona
        ? new WalletAvatar(this.walletAddress, { size: this.size })
        : new WalletAvatar(this.walletAddress, { size: this.size }),
    );
  }
}
