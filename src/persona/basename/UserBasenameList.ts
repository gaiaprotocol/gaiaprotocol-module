import { DomNode } from "@common-module/app";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";

export default class UserBasenameList extends DomNode {
  constructor() {
    super(".user-basename-list");
    this.loadNames();
  }

  public async loadNames(): Promise<void> {
    const names = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<
      string[]
    >("get-user-basenames");

    console.log(names);
  }
}
