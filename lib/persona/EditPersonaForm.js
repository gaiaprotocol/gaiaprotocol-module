import { Button, DomNode, el, Switch } from "@common-module/app";
export default class EditPersonaForm extends DomNode {
    constructor(persona) {
        super(".edit-persona-form");
        this.append(el("h1", persona ? "Edit Persona" : "Create Persona"), el(".storage-location", el(".switch-container", "Off-chain", new Switch(), "On-chain"), el("p", "Decide where to store your persona. Storing off-chain incurs no gas fees but relies on centralized servers. Conversely, storing on-chain incurs a small gas fee but ensures permanent storage on the blockchain. Future modifications are possible in both cases.")), new Button({
            title: persona ? "Save Changes" : "Create Persona",
            onClick: () => {
            },
        }));
    }
}
//# sourceMappingURL=EditPersonaForm.js.map