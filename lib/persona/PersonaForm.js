import { DomNode, el, ImageOptimizer } from "@common-module/app";
import { Button, ButtonType, Input, InvisibleFileInput, } from "@common-module/app-components";
import { AddressUtils } from "@common-module/wallet";
import GaiaProtocolConfig from "../GaiaProtocolConfig.js";
import BasenameSelectorModal from "./basename/BasenameSelectorModal.js";
import ENSSelectorModal from "./ens/ENSNameSelectorModal.js";
import GaiaNameSelectorModal from "./gaia-name/GaiaNameSelectorModal.js";
import EditIcon from "./icons/EditIcon.js";
import NFTSelectorModal from "./nft/NFTSelectorModal.js";
import PersonaAvatar from "./PersonaAvatar.js";
import PersonaUtils from "./PersonaUtils.js";
import ProfileImageSourceSelectMenu from "./ProfileImageSourceSelectMenu.js";
export default class PersonaForm extends DomNode {
    walletAddress;
    avatar;
    invisibleFileInput;
    profileImageUrl;
    thumbnailImageUrl;
    constructor(walletAddress, existingPersona) {
        super(".persona-form");
        this.walletAddress = walletAddress;
        this.append(el(".avatar", this.avatar = new PersonaAvatar(existingPersona
            ? PersonaUtils.convertPersonaToSocialUser(existingPersona)
            : {
                id: walletAddress,
                name: AddressUtils.shortenAddress(walletAddress),
                username: AddressUtils.shortenAddress(walletAddress),
            }, 120), new Button(".edit", {
            type: ButtonType.Circle,
            icon: new EditIcon(),
            onClick: (_, event) => {
                event.stopPropagation();
                new ProfileImageSourceSelectMenu(event.clientX, event.clientY, {
                    imageExists: !!this.profileImageUrl,
                    onSelected: (source) => {
                        if (source === "upload") {
                            this.invisibleFileInput.openFileSelector();
                        }
                        else if (source === "nft") {
                            new NFTSelectorModal();
                        }
                    },
                    onDeleted: () => {
                        this.profileImageUrl = undefined;
                        this.thumbnailImageUrl = undefined;
                        this.avatar.empty().load();
                    },
                });
            },
        }), this.invisibleFileInput = new InvisibleFileInput({
            accept: "image/*",
            onChange: (files) => {
                if (files.length > 0)
                    this.uploadImage(files[0]);
            },
        })), el(".wallet-address-input-container", new Input({
            label: "Wallet address",
            value: walletAddress,
            readOnly: true,
        })), el(".display-name-input-container", new Input({
            label: "Display name",
            placeholder: "Enter display name",
            value: existingPersona?.name,
        }), el(".select-name-buttons", new Button(`.ens-name${existingPersona?.is_ens_name ? ".selected" : ""}`, {
            type: ButtonType.Outlined,
            title: "Use ENS Name",
            onClick: () => new ENSSelectorModal(),
        }), new Button(`.basename${existingPersona?.is_basename ? ".selected" : ""}`, {
            type: ButtonType.Outlined,
            title: "Use Basename",
            onClick: () => new BasenameSelectorModal(),
        }), new Button(`.gaia-name${existingPersona?.is_gaia_name ? ".selected" : ""}`, {
            type: ButtonType.Outlined,
            title: "Use Gaia Name",
            onClick: () => new GaiaNameSelectorModal(),
        }))), el(".bio-input-container", new Input({
            label: "Bio",
            placeholder: "Something about yourself",
            multiline: true,
            value: existingPersona?.bio,
        })));
    }
    async optimizeAndUploadImage(file, maxSize) {
        const optimized = await ImageOptimizer.optimizeImage(file, maxSize, maxSize);
        return await GaiaProtocolConfig.supabaseConnector.uploadPublicFile("avatars", this.walletAddress, optimized);
    }
    async uploadImage(file) {
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
//# sourceMappingURL=PersonaForm.js.map