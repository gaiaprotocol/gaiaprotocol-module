import { DomNode, el } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { WalletAvatar } from "@common-module/wallet";
import PersonaRepository from "./PersonaRepository.js";

export default class PersonaAvatar extends DomNode {
  private loadingSpinner?: DomNode;

  constructor(private walletAddress: string, private size: number) {
    super(".persona-avatar");
    this.load();
  }

  public async load(): Promise<void> {
    this.showLoading();

    const persona = await PersonaRepository.fetchPersona(this.walletAddress);
    this.empty().append(
      persona
        ? new WalletAvatar(this.walletAddress, { size: this.size })
        : new WalletAvatar(this.walletAddress, { size: this.size }),
    );

    this.hideLoading();
  }

  public set imageSrc(src: string) {
    this.empty().showLoading();
    this.append(el("img", {
      src,
      onload: () => this.hideLoading(),
    }));
  }

  public showLoading(): void {
    if (this.loadingSpinner) return;
    this.loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);
    this.loadingSpinner.on("remove", () => this.loadingSpinner = undefined);
  }

  public hideLoading(): void {
    this.loadingSpinner?.remove();
  }
}
