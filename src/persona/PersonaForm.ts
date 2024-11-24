import { DomNode, el, ImageOptimizer } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  Input,
  InvisibleFileInput,
} from "@common-module/app-components";
import { EditIcon } from "@gaiaprotocol/svg-icons";
import GaiaProtocolConfig from "../GaiaProtocolConfig.js";
import UserNFTSelectorModal from "../nft/UserNFTSelectorModal.js";
import OpenSeaNFTData from "../opensea/OpenSeaNFTData.js";
import PersonaAvatar from "./PersonaAvatar.js";
import PersonaEntity from "./PersonaEntity.js";
import PersonaUtils from "./PersonaUtils.js";
import ProfileImageSourceSelectMenu from "./ProfileImageSourceSelectMenu.js";
import BasenameSelectorModal from "./name-selector/BasenameSelectorModal.js";
import ENSNameSelectorModal from "./name-selector/ENSNameSelectorModal.js";
import GaiaNameSelectorModal from "./name-selector/GaiaNameSelectorModal.js";

export default class PersonaForm extends DomNode<HTMLDivElement, {
  dataChanged: (data: PersonaEntity) => void;
}> {
  private avatarContainer: DomNode;
  private avatar: PersonaAvatar;
  private invisibleFileInput: InvisibleFileInput;
  private nameInput: Input;
  private ensNameButton: Button;
  private basenameButton: Button;
  private gaiaNameButton: Button;

  constructor(public data: PersonaEntity) {
    super(".persona-form");

    this.append(
      this.avatarContainer = el(
        ".avatar-container",
        this.avatar = new PersonaAvatar(
          PersonaUtils.convertPersonaToSocialUser(data),
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
                imageExists: !!this.data.profile_image_url,
                onSelect: (source) => {
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
          value: data.wallet_address,
          readOnly: true,
        }),
      ),
      el(
        ".display-name-input-container",
        this.nameInput = new Input({
          label: "Display name",
          placeholder: "Enter display name",
          value: this.data?.name,
          onChange: (newValue) => {
            this.data.name = newValue;
            this.emit("dataChanged", this.data);
          },
          onClick: (input) => {
            if (input.readOnly) this.clearName();
          },
        }),
        el(
          ".select-name-buttons",
          this.ensNameButton = new Button(
            `.ens-name${this.data?.is_ens_name ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Use ENS Name",
              onClick: () =>
                this.data?.is_ens_name
                  ? undefined
                  : new ENSNameSelectorModal((name) =>
                    this.selectENSName(name)
                  ),
            },
          ),
          this.basenameButton = new Button(
            `.basename${this.data?.is_basename ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Use Basename",
              onClick: () =>
                this.data?.is_basename
                  ? undefined
                  : new BasenameSelectorModal((name) =>
                    this.selectBasename(name)
                  ),
            },
          ),
          this.gaiaNameButton = new Button(
            `.gaia-name${this.data?.is_gaia_name ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Use Gaia Name",
              onClick: () =>
                this.data?.is_gaia_name
                  ? undefined
                  : new GaiaNameSelectorModal((name) =>
                    this.selectGaiaName(name)
                  ),
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
          value: this.data?.bio,
          onChange: (newValue) => {
            this.data.name = newValue;
            this.emit("dataChanged", this.data);
          },
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
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(
      this.avatarContainer,
    );

    const [optimizedImageUrl, thumbnailImageUrl] = await Promise.all([
      this.optimizeAndUploadImage(file, 1024),
      this.optimizeAndUploadImage(file, 120),
    ]);

    this.data.profile_image_url = optimizedImageUrl;
    this.data.thumbnail_image_url = thumbnailImageUrl;
    this.emit("dataChanged", this.data);

    this.avatar.setImage(optimizedImageUrl, false);

    loadingSpinner.remove();
  }

  private setNFTAsAvatar(nft: OpenSeaNFTData) {
    this.data.profile_image_url = nft.image_url;
    this.data.thumbnail_image_url = nft.display_image_url;
    this.emit("dataChanged", this.data);

    const imageSrc = nft.display_image_url ?? nft.image_url;
    if (imageSrc) this.avatar.setImage(imageSrc, true);
  }

  private clearAvatar() {
    this.data.profile_image_url = undefined;
    this.data.thumbnail_image_url = undefined;
    this.emit("dataChanged", this.data);

    this.avatar.clearImage();
  }

  private clearName() {
    this.data.name = undefined;
    this.data.is_ens_name = undefined;
    this.data.is_basename = undefined;
    this.data.is_gaia_name = undefined;
    this.emit("dataChanged", this.data);

    this.nameInput.value = "";
    this.nameInput.readOnly = false;

    this.ensNameButton.removeClass("selected");
    this.basenameButton.removeClass("selected");
    this.gaiaNameButton.removeClass("selected");
  }

  private selectENSName(name: string) {
    this.data.name = name;
    this.data.is_ens_name = true;
    this.data.is_basename = undefined;
    this.data.is_gaia_name = undefined;
    this.emit("dataChanged", this.data);

    this.nameInput.value = name;
    this.nameInput.readOnly = true;

    this.ensNameButton.addClass("selected");
    this.basenameButton.removeClass("selected");
    this.gaiaNameButton.removeClass("selected");
  }

  private selectBasename(name: string) {
    this.data.name = name;
    this.data.is_ens_name = undefined;
    this.data.is_basename = true;
    this.data.is_gaia_name = undefined;
    this.emit("dataChanged", this.data);

    this.nameInput.value = name;
    this.nameInput.readOnly = true;

    this.ensNameButton.removeClass("selected");
    this.basenameButton.addClass("selected");
    this.gaiaNameButton.removeClass("selected");
  }

  private selectGaiaName(name: string) {
    this.data.name = name;
    this.data.is_ens_name = undefined;
    this.data.is_basename = undefined;
    this.data.is_gaia_name = true;
    this.emit("dataChanged", this.data);

    this.nameInput.value = name;
    this.nameInput.readOnly = true;

    this.ensNameButton.removeClass("selected");
    this.basenameButton.removeClass("selected");
    this.gaiaNameButton.addClass("selected");
  }
}
