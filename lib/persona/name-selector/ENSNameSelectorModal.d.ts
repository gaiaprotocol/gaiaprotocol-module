import NameSelectorModal from "./NameSelectorModal.js";
export default class ENSNameSelectorModal extends NameSelectorModal {
    constructor(onSelect: (name: string) => Promise<void> | void);
    loadName(): Promise<void>;
}
//# sourceMappingURL=ENSNameSelectorModal.d.ts.map