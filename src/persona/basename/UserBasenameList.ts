import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";

export default class UserBasenameList extends DomNode {
  constructor() {
    super(".user-basename-list");
    this.loadName();
  }

  public async loadName(): Promise<void> {
    const name = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<
      string
    >("get-user-basename");

    console.log(name);
  }
}
