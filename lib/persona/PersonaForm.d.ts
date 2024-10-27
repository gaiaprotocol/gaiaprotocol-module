import { DomNode } from "@common-module/app";
import PersonaEntity from "./PersonaEntity.js";
export default class PersonaForm extends DomNode {
    private walletAddress;
    private avatar;
    private invisibleFileInput;
    private profileImageUrl?;
    private thumbnailImageUrl?;
    constructor(walletAddress: string, existingPersona?: PersonaEntity);
    private optimizeAndUploadImage;
    private uploadImage;
}
//# sourceMappingURL=PersonaForm.d.ts.map