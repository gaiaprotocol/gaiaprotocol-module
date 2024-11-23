import { DomNode } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
export default abstract class NameSelectorModal extends StructuredModal {
    protected selectedName: string | undefined;
    protected nameDisplay: DomNode;
    protected useThisNameButton: Button;
    constructor(type: string, onSelect: (name: string) => Promise<void> | void);
}
//# sourceMappingURL=NameSelectorModal.d.ts.map