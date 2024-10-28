import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
import UserNFTList from "./UserNFTList.js";

export default class NFTSelectorModal extends StructuredModal {
  private selectedNFT: { contract: string; tokenId: string } | undefined;
  private useAsProfileButton: Button;

  constructor() {
    super(".nft-selector-modal");
    this
      .appendToHeader(el("h1", "Choose NFT for Profile"))
      .appendToMain(
        el("p", "Select an NFT to represent your Persona"),
        new UserNFTList(),
      )
      .appendToFooter(
        new Button(".cancel", {
          title: "Cancel",
          onClick: () => this.remove(),
        }),
        this.useAsProfileButton = new Button(".use-as-profile", {
          title: "Use as Profile",
          onClick: () => {
            this.remove();
          },
        }),
      );
  }
}
