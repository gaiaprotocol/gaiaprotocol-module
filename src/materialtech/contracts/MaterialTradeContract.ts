import { ChainInfo, Contract } from "@common-module/wallet";
import { JsonRpcSigner } from "ethers";
import { MaterialTrade } from "./abi/MaterialTrade.js";
import MaterialTradeArtifact from "./abi/MaterialTrade.json" assert {
  type: "json",
};

export default class MaterialTradeContract extends Contract<MaterialTrade> {
  constructor(chain: ChainInfo, address: string) {
    super(MaterialTradeArtifact.abi);
    this.init(chain, address);
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
