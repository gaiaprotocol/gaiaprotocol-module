import { DomNode, el } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import PersonaForm from "./PersonaForm.js";
export default class CreatePersonaForm extends DomNode {
    form;
    createButton;
    constructor(walletAddress) {
        super("form.create-persona-form");
        this.append(el("header", el("h2", "Complete your persona")), el("main", this.form = new PersonaForm(walletAddress)), el("footer", this.createButton = new Button({
            type: ButtonType.Contained,
            title: "Create persona",
        })), {
            onsubmit: (event) => {
                event.preventDefault();
            },
        });
        this.form.on("dataChanged", (data) => {
            console.log(data);
        });
    }
}
//# sourceMappingURL=CreatePersonaForm.js.map