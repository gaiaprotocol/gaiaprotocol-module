import { DomNode } from "@common-module/app";
import PersonaEntity from "./PersonaEntity.js";
export default class EditPersonaForm extends DomNode {
    private onSaved;
    private form;
    constructor(oldPersona: PersonaEntity, onSaved: (data: PersonaEntity) => void);
    private savePersona;
}
//# sourceMappingURL=EditPersonaForm.d.ts.map