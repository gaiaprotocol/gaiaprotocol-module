import { DomNode, el } from "@common-module/app";
import { Button, ButtonType, Input } from "@common-module/app-components";
import BasenameSelectorModal from "../name-selector/BasenameSelectorModal.js";
import ENSNameSelectorModal from "../name-selector/ENSNameSelectorModal.js";
import GaiaNameSelectorModal from "../name-selector/GaiaNameSelectorModal.js";
import PersonaAvatarInput from "./PersonaAvatarInput.js";
export default class PersonaForm extends DomNode {
    data;
    nameInput;
    ensNameButton;
    basenameButton;
    gaiaNameButton;
    constructor(data) {
        super(".persona-form");
        this.data = data;
        this.append(new PersonaAvatarInput(data), el(".wallet-address-input-container", new Input({
            label: "Wallet address",
            value: data.wallet_address,
            readOnly: true,
        })), el(".display-name-input-container", this.nameInput = new Input({
            label: "Display name",
            placeholder: "Enter display name",
            value: this.data?.name,
            onChange: (newValue) => {
                this.data.name = newValue;
                this.emit("dataChanged", this.data);
            },
            onClick: (input) => {
                if (input.readOnly)
                    this.clearName();
            },
        }), el(".select-name-buttons", this.ensNameButton = new Button(`.ens-name${this.data?.is_ens_name ? ".selected" : ""}`, {
            type: ButtonType.Outlined,
            title: "Use ENS Name",
            onClick: () => this.data?.is_ens_name
                ? undefined
                : new ENSNameSelectorModal((name) => this.selectENSName(name)),
        }), this.basenameButton = new Button(`.basename${this.data?.is_basename ? ".selected" : ""}`, {
            type: ButtonType.Outlined,
            title: "Use Basename",
            onClick: () => this.data?.is_basename
                ? undefined
                : new BasenameSelectorModal((name) => this.selectBasename(name)),
        }), this.gaiaNameButton = new Button(`.gaia-name${this.data?.is_gaia_name ? ".selected" : ""}`, {
            type: ButtonType.Outlined,
            title: "Use Gaia Name",
            onClick: () => this.data?.is_gaia_name
                ? undefined
                : new GaiaNameSelectorModal((name) => this.selectGaiaName(name)),
        }))), el(".bio-input-container", new Input({
            label: "Bio",
            placeholder: "Something about yourself",
            multiline: true,
            value: this.data?.bio,
            onChange: (newValue) => {
                this.data.bio = newValue;
                this.emit("dataChanged", this.data);
            },
        })));
    }
    clearName() {
        this.data.name = undefined;
        this.data.is_ens_name = undefined;
        this.data.is_basename = undefined;
        this.data.is_gaia_name = undefined;
        this.emit("dataChanged", this.data);
        this.nameInput.value = "";
        this.nameInput.readOnly = false;
        this.ensNameButton.removeClass("selected");
        this.basenameButton.removeClass("selected");
        this.gaiaNameButton.removeClass("selected");
    }
    selectENSName(name) {
        this.data.name = name;
        this.data.is_ens_name = true;
        this.data.is_basename = undefined;
        this.data.is_gaia_name = undefined;
        this.emit("dataChanged", this.data);
        this.nameInput.value = name;
        this.nameInput.readOnly = true;
        this.ensNameButton.addClass("selected");
        this.basenameButton.removeClass("selected");
        this.gaiaNameButton.removeClass("selected");
    }
    selectBasename(name) {
        this.data.name = name;
        this.data.is_ens_name = undefined;
        this.data.is_basename = true;
        this.data.is_gaia_name = undefined;
        this.emit("dataChanged", this.data);
        this.nameInput.value = name;
        this.nameInput.readOnly = true;
        this.ensNameButton.removeClass("selected");
        this.basenameButton.addClass("selected");
        this.gaiaNameButton.removeClass("selected");
    }
    selectGaiaName(name) {
        this.data.name = name;
        this.data.is_ens_name = undefined;
        this.data.is_basename = undefined;
        this.data.is_gaia_name = true;
        this.emit("dataChanged", this.data);
        this.nameInput.value = name;
        this.nameInput.readOnly = true;
        this.ensNameButton.removeClass("selected");
        this.basenameButton.removeClass("selected");
        this.gaiaNameButton.addClass("selected");
    }
}
//# sourceMappingURL=PersonaForm.js.map