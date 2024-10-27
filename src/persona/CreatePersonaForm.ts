import { DomNode, el } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import PersonaForm from "./PersonaForm.js";

export default class CreatePersonaForm extends DomNode {
  constructor(walletAddress: string) {
    super("form.create-persona-form");
    this.append(
      el("header", el("h2", "Complete your persona")),
      el(
        "main",
        new PersonaForm(walletAddress),
      ),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Create persona",
        }),
      ),
      {
        onsubmit: (event) => {
          event.preventDefault();
        },
      },
    );
  }
}
