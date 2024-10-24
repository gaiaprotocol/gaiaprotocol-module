import { DomNode } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { WalletAvatar } from "@common-module/wallet";
import {
  WalletLoginManager,
  WalletLoginPopup,
} from "@common-module/wallet-login";
import UserAvatarMenu from "./UserAvatarMenu.js";

export default class UserAvatarButton extends DomNode {
  constructor() {
    super(".user-avatar-button");

    this.render();

    this.subscribe(
      WalletLoginManager,
      "loginStatusChanged",
      () => this.render(),
    );
  }

  private render() {
    this.empty().append(
      WalletLoginManager.isLoggedIn
        ? new Button({
          type: ButtonType.Circle,
          icon: new WalletAvatar(WalletLoginManager.loggedInAddress!, {
            size: 32,
          }),
          onClick: (button, event) => {
            event.stopPropagation();
            new UserAvatarMenu(button);
          },
        })
        : new Button({
          type: ButtonType.Contained,
          title: "Log in",
          onClick: () => new WalletLoginPopup(),
        }),
    );
  }
}
