import { DomNode } from "@common-module/app";
import PersonaEntity from "./PersonaEntity.js";
export default class PersonaForm extends DomNode<HTMLDivElement, {
    dataChanged: (data: PersonaEntity) => void;
}> {
    data: PersonaEntity;
    private avatarContainer;
    private avatar;
    private invisibleFileInput;
    private nameInput;
    private ensNameButton;
    private basenameButton;
    private gaiaNameButton;
    constructor(data: PersonaEntity);
    private optimizeAndUploadImage;
    private uploadProfileImage;
    private setNFTAsAvatar;
    private clearAvatar;
    private clearName;
    private selectENSName;
    private selectBasename;
    private selectGaiaName;
}
//# sourceMappingURL=PersonaForm.d.ts.map