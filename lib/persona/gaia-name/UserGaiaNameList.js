import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
export default class UserGaiaNameList extends DomNode {
    constructor() {
        super(".user-gaia-name-list");
        this.loadName();
    }
    async loadName() {
        const names = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-gaia-name");
        console.log(names);
    }
}
//# sourceMappingURL=UserGaiaNameList.js.map