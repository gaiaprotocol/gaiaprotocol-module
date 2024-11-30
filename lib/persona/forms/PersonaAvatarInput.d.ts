import { DomNode } from "@common-module/app";
import PersonaEntity from "../PersonaEntity.js";
export default class PersonaAvatarInput extends DomNode<HTMLDivElement, {
    dataChanged: (data: PersonaEntity) => void;
}> {
    private data;
    private invisibleFileInput;
    private avatar;
    constructor(data: PersonaEntity);
    private openSourceSelectMenu;
    private optimizeAndUploadImage;
    private uploadProfileImage;
    private setNFTAsAvatar;
    private clearAvatar;
}
//# sourceMappingURL=PersonaAvatarInput.d.ts.map