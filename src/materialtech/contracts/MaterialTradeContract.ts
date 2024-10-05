import { Contract } from "@common-module/contract";
import { getAddress, JsonRpcSigner } from "ethers";
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
    const { contract, receipt } = await this.executeAndWait(
      signer,
      (contract) => contract.createMaterial(name, symbol),
    );

    if (!receipt) throw new Error("Transaction failed");

    const eventTopic =
      (await contract.filters.MaterialCreated().getTopicFilter())[0];
    for (const log of receipt.logs) {
      if (log.topics[0] === eventTopic) {
        const address = "0x" + log.topics[2].slice(26);
        return getAddress(address);
      }
    }
    throw new Error("MaterialCreated event not found");
  }
}
