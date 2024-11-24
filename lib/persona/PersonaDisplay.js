import { DomNode } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
export default class PersonaDisplay extends DomNode {
    constructor(options) {
        super(".persona-display");
        this.append(options.showEditButton
            ? new Button({
                type: ButtonType.Contained,
                title: "Edit",
                onClick: () => options.onEditClick(),
            })
            : undefined, JSON.stringify(options.persona));
    }
}
//# sourceMappingURL=PersonaDisplay.js.map