import { DomNode } from "@common-module/app";
export default class PersonaAvatar extends DomNode {
    private walletAddress;
    private size;
    private loadingSpinner?;
    constructor(walletAddress: string, size: number);
    load(): Promise<void>;
    set imageSrc(src: string);
    showLoading(): void;
    hideLoading(): void;
}
//# sourceMappingURL=PersonaAvatar.d.ts.map