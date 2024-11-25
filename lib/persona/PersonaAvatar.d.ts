import { DomNode } from "@common-module/app";
import { User } from "@common-module/social-components";
export default class PersonaAvatar extends DomNode {
    private user;
    constructor(user: User);
    clearImage(): void;
    setImage(src: string, isNFT: boolean): void;
}
//# sourceMappingURL=PersonaAvatar.d.ts.map