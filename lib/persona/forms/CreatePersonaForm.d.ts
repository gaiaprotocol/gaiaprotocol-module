import { DomNode } from "@common-module/app";
import PersonaEntity from "../PersonaEntity.js";
export default class CreatePersonaForm extends DomNode {
    private onSaved;
    private form;
    constructor(walletAddress: string, onSaved: (data: PersonaEntity) => void);
    private savePersona;
}
//# sourceMappingURL=CreatePersonaForm.d.ts.map