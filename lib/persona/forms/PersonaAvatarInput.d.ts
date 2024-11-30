import { DomNode } from "@common-module/app";
interface AvatarData {
    walletAddress: string;
    profileImageUrl?: string;
    profileThumbnailUrl?: string;
    nftAddress?: string;
    nftTokenId?: string;
}
export default class PersonaAvatarInput extends DomNode<HTMLDivElement, {
    dataChanged: (data: AvatarData) => void;
}> {
    private data;
    private invisibleFileInput;
    private avatar;
    constructor(data: AvatarData);
    private openSourceSelectMenu;
    private optimizeAndUploadImage;
    private uploadProfileImage;
    private setNFTAsAvatar;
    private clearAvatar;
}
export {};
//# sourceMappingURL=PersonaAvatarInput.d.ts.map