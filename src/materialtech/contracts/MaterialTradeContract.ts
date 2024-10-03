import { Contract } from "@common-module/contract";
import { JsonRpcSigner } from "ethers";
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
  ): Promise<void> {
    await this.executeAndWait(
      signer,
      (contract) => contract.createMaterial(name, symbol),
    );
  }
}
