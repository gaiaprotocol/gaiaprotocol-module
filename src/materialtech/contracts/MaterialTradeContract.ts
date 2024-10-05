import { Contract } from "@common-module/contract";
import { EventLog, JsonRpcSigner } from "ethers";
import { MaterialTrade } from "./abi/MaterialTrade.js";
import MaterialTradeArtifact from "./abi/MaterialTrade.json" assert {
  type: "json",
};

export default class MaterialTradeContract extends Contract<MaterialTrade> {
  constructor(rpc: string, address: string) {
    super(MaterialTradeArtifact.abi);
    this.init(rpc, address);
  }

  public async createMaterial(
    signer: JsonRpcSigner,
    name: string,
    symbol: string,
  ): Promise<string> {
    const { receipt } = await this.executeAndWait(
      signer,
      (contract) => contract.createMaterial(name, symbol),
    );

    if (!receipt) throw new Error("Transaction failed");

    for (const log of receipt.logs) {
      if (log instanceof EventLog && log.fragment.name === "MaterialCreated") {
        return log.args[1];
      }
    }
    throw new Error("MaterialCreated event not found");
  }
}
