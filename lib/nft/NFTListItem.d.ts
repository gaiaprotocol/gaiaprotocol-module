import { DomNode } from "@common-module/app";
import OpenSeaNFTData from "../opensea/OpenSeaNFTData.js";
interface NFTListItemOptions {
    data: OpenSeaNFTData & {
        attributes?: {
            trait_type: string;
            value: string;
        }[];
    };
    onClick?: () => void;
    selectMode?: boolean;
}
export default class NFTListItem extends DomNode {
    private options;
    private checkIconContainer;
    constructor(options: NFTListItemOptions);
    isSelected(): boolean;
    getData(): OpenSeaNFTData;
    select(): void;
    deselect(): void;
}
export {};
//# sourceMappingURL=NFTListItem.d.ts.map