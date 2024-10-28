import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
export default class UserENSNameList extends DomNode {
    constructor() {
        super(".user-ens-name-list");
        this.loadName();
    }
    async loadName() {
        const name = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-ens-name");
        console.log(name);
    }
}
//# sourceMappingURL=UserENSNameList.js.map