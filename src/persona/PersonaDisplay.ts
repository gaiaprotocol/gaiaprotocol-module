import { DomNode, el } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { AddressUtils } from "@common-module/wallet-utils";
import PersonaAvatar from "./PersonaAvatar.js";
import PersonaEntity from "./PersonaEntity.js";
import PersonaUtils from "./PersonaUtils.js";
import WalletAddressMenu from "./WalletAddressMenu.js";
import TradePersonaFragmentButton from "./trade/TradePersonaFragmentButton.js";

interface PersonaDisplayOptions {
  persona: PersonaEntity;
  showEditButton: boolean;
  onEditClick: () => void;
}

export default class PersonaDisplay extends DomNode {
  constructor(options: PersonaDisplayOptions) {
    super(".persona-display");
    this.append(
      el(
        "header",
        el(
          ".avatar-container",
          new PersonaAvatar(
            PersonaUtils.convertPersonaToSocialUser(options.persona),
          ),
        ),
        el(
          ".content",
          el(
            ".user-info",
            el(
              ".name-and-wallet-address",
              el("h2.name", options.persona.name),
              el(
                "p.wallet-address",
                el(
                  "a",
                  AddressUtils.shortenAddress(options.persona.wallet_address),
                  {
                    onclick: (event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      new WalletAddressMenu(
                        event.clientX,
                        event.clientY,
                        options.persona.wallet_address,
                      );
                    },
                  },
                ),
              ),
            ),
            el(
              ".pc-button-container",
              new TradePersonaFragmentButton(options.persona.wallet_address),
              options.showEditButton
                ? new Button({
                  type: ButtonType.Outlined,
                  title: "Edit",
                  onClick: () => options.onEditClick(),
                })
                : undefined,
            ),
          ),
          el("p.bio", options.persona.bio),
        ),
      ),
      el(
        ".mobile-button-container",
        new TradePersonaFragmentButton(options.persona.wallet_address),
        options.showEditButton
          ? new Button({
            type: ButtonType.Outlined,
            title: "Edit",
            onClick: () => options.onEditClick(),
          })
          : undefined,
      ),
    );
  }
}
