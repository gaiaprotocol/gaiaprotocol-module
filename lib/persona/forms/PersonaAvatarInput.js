import { DomNode, ImageOptimizer } from "@common-module/app";
import { AppCompConfig, Button, ButtonType, InvisibleFileInput, } from "@common-module/app-components";
import { EditIcon } from "@gaiaprotocol/svg-icons";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import UserNFTSelectorModal from "../../nft/UserNFTSelectorModal.js";
import PersonaAvatar from "../PersonaAvatar.js";
import ProfileImageSourceSelectMenu from "../ProfileImageSourceSelectMenu.js";
export default class PersonaAvatarInput extends DomNode {
    data;
    invisibleFileInput;
    avatar;
    constructor(data) {
        super(".persona-avatar-input");
        this.data = data;
        this.append(this.invisibleFileInput = new InvisibleFileInput({
            accept: "image/*",
            onChange: (files) => {
                if (files.length > 0)
                    this.uploadProfileImage(files[0]);
            },
        }), this.avatar = new PersonaAvatar({
            id: data.walletAddress,
            avatarUrl: data.profileImageUrl,
            isNftAvatar: data.nftAddress !== undefined &&
                data.nftTokenId !== undefined,
        }), new Button(".edit", {
            type: ButtonType.Circle,
            icon: new EditIcon(),
            onClick: (_, event) => this.openSourceSelectMenu(event),
        }));
    }
    openSourceSelectMenu(event) {
        event.stopPropagation();
        new ProfileImageSourceSelectMenu(event.clientX, event.clientY, {
            imageExists: !!this.data.profileImageUrl,
            onSelect: (source) => {
                if (source === "upload") {
                    this.invisibleFileInput.openFileSelector();
                }
                else if (source === "nft") {
                    new UserNFTSelectorModal((nft) => this.setNFTAsAvatar(nft));
                }
            },
            onDeleted: () => this.clearAvatar(),
        });
    }
    async optimizeAndUploadImage(file, maxSize) {
        const optimized = await ImageOptimizer.optimizeImage(file, maxSize, maxSize);
        const formData = new FormData();
        formData.append("file", optimized);
        const filePath = await GaiaProtocolConfig.supabaseConnector
            .callEdgeFunction("upload-profile-image", formData);
        return `https://storage.googleapis.com/gaiaprotocol/${filePath}`;
    }
    async uploadProfileImage(file) {
        const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);
        const [optimizedImageUrl, thumbnailImageUrl] = await Promise.all([
            this.optimizeAndUploadImage(file, 1024),
            this.optimizeAndUploadImage(file, 120),
        ]);
        this.data = {
            walletAddress: this.data.walletAddress,
            profileImageUrl: optimizedImageUrl,
            profileThumbnailUrl: thumbnailImageUrl,
        };
        this.emit("dataChanged", this.data);
        this.avatar.setImage(optimizedImageUrl, false);
        loadingSpinner.remove();
    }
    setNFTAsAvatar(nft) {
        this.data = {
            walletAddress: this.data.walletAddress,
            profileImageUrl: nft.image_url,
            profileThumbnailUrl: nft.display_image_url,
            nftAddress: nft.contract,
            nftTokenId: nft.identifier,
        };
        this.emit("dataChanged", this.data);
        const imageSrc = nft.display_image_url ?? nft.image_url;
        if (imageSrc)
            this.avatar.setImage(imageSrc, true);
    }
    clearAvatar() {
        this.data = { walletAddress: this.data.walletAddress };
        this.emit("dataChanged", this.data);
        this.avatar.clearImage();
    }
}
//# sourceMappingURL=PersonaAvatarInput.js.map