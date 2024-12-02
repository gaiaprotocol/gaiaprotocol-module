import { DomNode } from "@common-module/app";
import PersonaEntity from "../PersonaEntity.js";
export default class PersonaForm extends DomNode<HTMLDivElement, {
    dataChanged: (data: PersonaEntity) => void;
}> {
    data: PersonaEntity;
    private avatarInput;
    private nameInput;
    private ensNameButton;
    private basenameButton;
    private gaiaNameButton;
    constructor(data: PersonaEntity);
    private clearName;
    private selectName;
    private updateNameSource;
    private updateButtonSelection;
}
//# sourceMappingURL=PersonaForm.d.ts.map