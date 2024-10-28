import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
export default class UserGaiaNameList extends DomNode {
    constructor() {
        super(".user-gaia-name-list");
        this.loadNames();
    }
    async loadNames() {
        const names = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("get-user-gaia-names");
        console.log(names);
    }
}
//# sourceMappingURL=UserGaiaNameList.js.map