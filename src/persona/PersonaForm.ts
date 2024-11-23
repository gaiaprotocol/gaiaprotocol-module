import { DomNode, el, ImageOptimizer } from "@common-module/app";
import {
  Button,
  ButtonType,
  Input,
  InvisibleFileInput,
} from "@common-module/app-components";
import { AddressUtils } from "@common-module/wallet-utils";
import { EditIcon } from "@gaiaprotocol/svg-icons";
import GaiaProtocolConfig from "../GaiaProtocolConfig.js";
import UserNFTSelectorModal from "../nft/UserNFTSelectorModal.js";
import OpenSeaNFTData from "../opensea/OpenSeaNFTData.js";
import BasenameSelectorModal from "./basename/BasenameSelectorModal.js";
import ENSSelectorModal from "./ens/ENSNameSelectorModal.js";
import GaiaNameSelectorModal from "./gaia-name/GaiaNameSelectorModal.js";
import PersonaAvatar from "./PersonaAvatar.js";
import PersonaEntity from "./PersonaEntity.js";
import PersonaUtils from "./PersonaUtils.js";
import ProfileImageSourceSelectMenu from "./ProfileImageSourceSelectMenu.js";

export default class PersonaForm extends DomNode {
  private personaData: PersonaEntity;

  private avatar: PersonaAvatar;
  private invisibleFileInput: InvisibleFileInput;

  constructor(walletAddress: string, existingPersona?: PersonaEntity) {
    super(".persona-form");

    if (existingPersona) {
      this.personaData = existingPersona;
    } else {
      this.personaData = { wallet_address: walletAddress };
    }

    this.append(
      el(
        ".avatar",
        this.avatar = new PersonaAvatar(
          existingPersona
            ? PersonaUtils.convertPersonaToSocialUser(existingPersona)
            : {
              id: walletAddress,
              name: AddressUtils.shortenAddress(walletAddress),
              username: AddressUtils.shortenAddress(walletAddress),
            },
          120,
        ),
        new Button(".edit", {
          type: ButtonType.Circle,
          icon: new EditIcon(),
          onClick: (_, event) => {
            event.stopPropagation();
            new ProfileImageSourceSelectMenu(
              event.clientX,
              event.clientY,
              {
                imageExists: !!this.personaData.profile_image_url,
                onSelected: (source) => {
                  if (source === "upload") {
                    this.invisibleFileInput.openFileSelector();
                  } else if (source === "nft") {
                    new UserNFTSelectorModal((nft) => this.setNFTAsAvatar(nft));
                  }
                },
                onDeleted: () => this.clearAvatar(),
              },
            );
          },
        }),
        this.invisibleFileInput = new InvisibleFileInput({
          accept: "image/*",
          onChange: (files) => {
            if (files.length > 0) this.uploadProfileImage(files[0]);
          },
        }),
      ),
      el(
        ".wallet-address-input-container",
        new Input({
          label: "Wallet address",
          value: walletAddress,
          readOnly: true,
        }),
      ),
      el(
        ".display-name-input-container",
        new Input({
          label: "Display name",
          placeholder: "Enter display name",
          value: existingPersona?.name,
        }),
        el(
          ".select-name-buttons",
          new Button(
            `.ens-name${existingPersona?.is_ens_name ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Use ENS Name",
              onClick: () => new ENSSelectorModal(),
            },
          ),
          new Button(
            `.basename${existingPersona?.is_basename ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Use Basename",
              onClick: () => new BasenameSelectorModal(),
            },
          ),
          new Button(
            `.gaia-name${existingPersona?.is_gaia_name ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Use Gaia Name",
              onClick: () => new GaiaNameSelectorModal(),
            },
          ),
        ),
      ),
      el(
        ".bio-input-container",
        new Input({
          label: "Bio",
          placeholder: "Something about yourself",
          multiline: true,
          value: existingPersona?.bio,
        }),
      ),
    );
  }

  private async optimizeAndUploadImage(file: File, maxSize: number) {
    const optimized = await ImageOptimizer.optimizeImage(
      file,
      maxSize,
      maxSize,
    );

    const formData = new FormData();
    formData.append("file", optimized);

    const filePath = await GaiaProtocolConfig.supabaseConnector
      .callEdgeFunction(
        "upload-profile-image",
        formData,
      );

    return `https://storage.googleapis.com/gaiaprotocol/profile_images/${filePath}`;
  }

  private async uploadProfileImage(file: File) {
    this.avatar.clear().showLoading();

    const [optimizedImageUrl, thumbnailImageUrl] = await Promise.all([
      this.optimizeAndUploadImage(file, 1024),
      this.optimizeAndUploadImage(file, 120),
    ]);

    this.personaData.profile_image_url = optimizedImageUrl;
    this.personaData.thumbnail_image_url = thumbnailImageUrl;

    this.avatar.hideLoading();
    this.avatar.imageSrc = optimizedImageUrl;
  }

  private setNFTAsAvatar(nft: OpenSeaNFTData) {
    this.personaData.profile_image_url = nft.image_url;
    this.personaData.thumbnail_image_url = nft.display_image_url;

    const imageSrc = nft.display_image_url ?? nft.image_url;
    if (imageSrc) {
      this.avatar.imageSrc = imageSrc;
    } else {
      this.avatar.clear().load();
    }
  }

  private clearAvatar() {
    this.personaData.profile_image_url = undefined;
    this.personaData.thumbnail_image_url = undefined;

    this.avatar.clear().load();
  }
}
