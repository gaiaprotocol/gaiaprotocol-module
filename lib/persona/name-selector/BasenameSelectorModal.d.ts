import NameSelectorModal from "./NameSelectorModal.js";
export default class BasenameSelectorModal extends NameSelectorModal {
    constructor(onSelect: (name: string) => Promise<void> | void);
    loadName(): Promise<void>;
}
//# sourceMappingURL=BasenameSelectorModal.d.ts.map