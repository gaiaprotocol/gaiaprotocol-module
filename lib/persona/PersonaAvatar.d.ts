import { DomNode } from "@common-module/app";
export default class PersonaAvatar extends DomNode {
    private user;
    constructor(user: {
        id: string;
        avatarUrl?: string;
        isNftAvatar?: boolean;
    });
    clearImage(): void;
    setImage(src: string, isNFT: boolean): void;
}
//# sourceMappingURL=PersonaAvatar.d.ts.map