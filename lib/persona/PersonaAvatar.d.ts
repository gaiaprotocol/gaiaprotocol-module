import { DomNode } from "@common-module/app";
import { User } from "@common-module/social-components";
export default class PersonaAvatar extends DomNode {
    private user;
    private size;
    constructor(user: User, size?: number);
    clearImage(): void;
    setImage(src: string, isNFT: boolean): void;
}
//# sourceMappingURL=PersonaAvatar.d.ts.map