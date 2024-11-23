import { DomNode } from "@common-module/app";
export default class UserNFTListItem extends DomNode {
    constructor(nft) {
        super(".user-nft-list-item");
        this.append(nft.name);
    }
}
//# sourceMappingURL=UserNFTListItem.js.map