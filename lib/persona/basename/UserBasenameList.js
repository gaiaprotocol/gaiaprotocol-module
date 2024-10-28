import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
export default class UserBasenameList extends DomNode {
    constructor() {
        super(".user-basename-list");
        this.loadName();
    }
    async loadName() {
        const name = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-basename");
        console.log(name);
    }
}
//# sourceMappingURL=UserBasenameList.js.map