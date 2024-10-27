import { DomNode } from "@common-module/app";
import { User } from "@common-module/social-components";
export default class PersonaAvatar extends DomNode {
    private user;
    private size;
    private loadingSpinner?;
    constructor(user: User, size?: number);
    load(): Promise<void>;
    set imageSrc(src: string);
    showLoading(): void;
    hideLoading(): void;
}
//# sourceMappingURL=PersonaAvatar.d.ts.map