import { DomNode } from "@common-module/app";
import PersonaEntity from "./PersonaEntity.js";
export default class PersonaForm extends DomNode<HTMLDivElement, {
    dataChanged: (data: PersonaEntity) => void;
}> {
    private data;
    private avatar;
    private invisibleFileInput;
    private nameInput;
    private ensNameButton;
    private basenameButton;
    private gaiaNameButton;
    constructor(walletAddress: string, existingPersona?: PersonaEntity);
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