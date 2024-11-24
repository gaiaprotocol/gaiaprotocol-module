import { DomNode } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import PersonaEntity from "./PersonaEntity.js";

interface PersonaDisplayOptions {
  persona: PersonaEntity;
  showEditButton: boolean;
  onEditClick: () => void;
}

export default class PersonaDisplay extends DomNode {
  constructor(options: PersonaDisplayOptions) {
    super(".persona-display");
    this.append(
      options.showEditButton
        ? new Button({
          type: ButtonType.Contained,
          title: "Edit",
          onClick: () => options.onEditClick(),
        })
        : undefined,
      JSON.stringify(options.persona),
    );
  }
}
