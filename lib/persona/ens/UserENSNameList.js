import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
export default class UserENSNameList extends DomNode {
    constructor() {
        super(".user-ens-name-list");
        this.loadNames();
    }
    async loadNames() {
        const names = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-ens-names");
        console.log(names);
    }
}
//# sourceMappingURL=UserENSNameList.js.map