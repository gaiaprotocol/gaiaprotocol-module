import { DomNode, el } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { User } from "@common-module/social-components";
import { WalletAvatar } from "@common-module/wallet";

export default class PersonaAvatar extends DomNode {
  private loadingSpinner?: DomNode;

  constructor(private user: User, private size: number = 32) {
    super(".persona-avatar");
    this.load();
  }

  public async load(): Promise<void> {
    this.showLoading();

    //TODO:
    this.empty().append(new WalletAvatar(this.user.id, { size: this.size }));

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
