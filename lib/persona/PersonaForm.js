import { DomNode, el } from "@common-module/app";
import { Button, ButtonType, Input } from "@common-module/app-components";
import EditIcon from "./icons/EditIcon.js";
import PersonaAvatar from "./PersonaAvatar.js";
import ProfileImageSourceSelectMenu from "./ProfileImageSourceSelectMenu.js";
export default class PersonaForm extends DomNode {
    constructor(walletAddress, existingPersona) {
        super(".persona-form");
        this.append(el(".avatar", new PersonaAvatar(walletAddress, 120), new Button(".edit", {
            type: ButtonType.Circle,
            icon: new EditIcon(),
            onClick: (_, event) => {
                event.stopPropagation();
                new ProfileImageSourceSelectMenu(event.clientX, event.clientY);
            },
        })), el(".wallet-address-input-container", new Input({
            label: "Wallet address",
            value: walletAddress,
            readOnly: true,
        })), el(".display-name-input-container", new Input({
            label: "Display name",
            placeholder: "Enter display name",
            value: existingPersona?.name,
        }), el(".select-name-buttons", new Button(`.ens-name${existingPersona?.is_ens_name ? ".selected" : ""}`, {
            type: ButtonType.Outlined,
            title: "Select ENS Name",
        }), new Button(`.basename${existingPersona?.is_basename ? ".selected" : ""}`, {
            type: ButtonType.Outlined,
            title: "Select Basename",
        }), new Button(`.gaia-name${existingPersona?.is_gaia_name ? ".selected" : ""}`, {
            type: ButtonType.Outlined,
            title: "Select Gaia Name",
        }))), el(".bio-input-container", new Input({
            label: "Bio",
            placeholder: "Something about yourself",
            multiline: true,
            value: existingPersona?.bio,
        })));
    }
}
//# sourceMappingURL=PersonaForm.js.map