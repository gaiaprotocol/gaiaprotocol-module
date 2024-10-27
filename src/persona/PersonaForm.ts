import { DomNode, el, ImageOptimizer } from "@common-module/app";
import {
  Button,
  ButtonType,
  Input,
  InvisibleFileInput,
} from "@common-module/app-components";
import GaiaProtocolConfig from "../GaiaProtocolConfig.js";
import EditIcon from "./icons/EditIcon.js";
import PersonaAvatar from "./PersonaAvatar.js";
import PersonaEntity from "./PersonaEntity.js";
import ProfileImageSourceSelectMenu from "./ProfileImageSourceSelectMenu.js";

export default class PersonaForm extends DomNode {
  private avatar: PersonaAvatar;
  private invisibleFileInput: InvisibleFileInput;

  private profileImageUrl?: string;
  private thumbnailImageUrl?: string;

  constructor(private walletAddress: string, existingPersona?: PersonaEntity) {
    super(".persona-form");
    this.append(
      el(
        ".avatar",
        this.avatar = new PersonaAvatar(walletAddress, 120),
        new Button(".edit", {
          type: ButtonType.Circle,
          icon: new EditIcon(),
          onClick: (_, event) => {
            event.stopPropagation();
            new ProfileImageSourceSelectMenu(
              event.clientX,
              event.clientY,
              {
                imageExists: !!this.profileImageUrl,
                onSelected: (source) => {
                  if (source === "upload") {
                    this.invisibleFileInput.openFileSelector();
                  }
                },
                onDeleted: () => {
                  this.profileImageUrl = undefined;
                  this.thumbnailImageUrl = undefined;
                  this.avatar.empty().load();
                },
              },
            );
          },
        }),
        this.invisibleFileInput = new InvisibleFileInput({
          accept: "image/*",
          onChange: (files) => {
            if (files.length > 0) this.uploadImage(files[0]);
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
              title: "Select ENS Name",
            },
          ),
          new Button(
            `.basename${existingPersona?.is_basename ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Select Basename",
            },
          ),
          new Button(
            `.gaia-name${existingPersona?.is_gaia_name ? ".selected" : ""}`,
            {
              type: ButtonType.Outlined,
              title: "Select Gaia Name",
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
    return await GaiaProtocolConfig.supabaseConnector.uploadPublicFile(
      "avatars",
      this.walletAddress,
      optimized,
    );
  }

  private async uploadImage(file: File) {
    this.avatar.empty().showLoading();

    const [optimizedImageUrl, thumbnailImageUrl] = await Promise.all([
      this.optimizeAndUploadImage(file, 1024),
      this.optimizeAndUploadImage(file, 120),
    ]);

    this.profileImageUrl = optimizedImageUrl;
    this.thumbnailImageUrl = thumbnailImageUrl;

    this.avatar.hideLoading();

    this.avatar.imageSrc = optimizedImageUrl;
  }
}
