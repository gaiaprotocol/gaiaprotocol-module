import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
export default class UserBasenameList extends DomNode {
    constructor() {
        super(".user-basename-list");
        this.loadNames();
    }
    async loadNames() {
        const names = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-basenames");
        console.log(names);
    }
}
//# sourceMappingURL=UserBasenameList.js.map