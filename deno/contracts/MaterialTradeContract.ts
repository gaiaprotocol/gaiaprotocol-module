import { Signer } from "https://esm.sh/ethers@6.7.0";
import { Contract } from "https://raw.githubusercontent.com/yjgaia/contract-module/refs/heads/main/deno/contract.ts";
import MaterialTradeArtifact from "./abi/MaterialTrade.json" assert {
  type: "json",
};
import { MaterialTrade } from "./abi/MaterialTrade.ts";

export default class MaterialTradeContract extends Contract<MaterialTrade> {
  constructor(signer: Signer, address: string) {
    super(signer, address);

    this.ethersContract = new Contract(
      this.address,
      MaterialTradeArtifact.abi,
      this.signer,
    ) as any;

    this.eventFilters = {
      MaterialCreated: this.ethersContract.filters.MaterialCreated(),
    };
  }
}
