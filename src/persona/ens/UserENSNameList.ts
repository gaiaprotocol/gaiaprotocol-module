import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";

export default class UserENSNameList extends DomNode {
  constructor() {
    super(".user-ens-name-list");
    this.loadName();
  }

  public async loadName(): Promise<void> {
    const name = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<
      string
    >("get-user-ens-name");

    console.log(name);
  }
}
