import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";

export default class UserENSNameList extends DomNode {
  constructor() {
    super(".user-ens-name-list");
    this.loadNames();
  }

  public async loadNames(): Promise<void> {
    const names = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<
      string[]
    >("get-user-ens-names");

    console.log(names);
  }
}
