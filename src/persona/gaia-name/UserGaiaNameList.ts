import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";

export default class UserGaiaNameList extends DomNode {
  constructor() {
    super(".user-gaia-name-list");
    this.loadNames();
  }

  public async loadNames(): Promise<void> {
    const names = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<
      string[]
    >("get-user-gaia-names");

    console.log(names);
  }
}
