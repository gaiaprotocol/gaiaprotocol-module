import NameSelectorModal from "./NameSelectorModal.js";
export default class GaiaNameSelectorModal extends NameSelectorModal {
    constructor(onSelect: (name: string) => Promise<void> | void);
    loadName(): Promise<void>;
}
//# sourceMappingURL=GaiaNameSelectorModal.d.ts.map