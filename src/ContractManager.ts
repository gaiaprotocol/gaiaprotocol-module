import { ChainInfo } from "@common-module/wallet";
import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";

class ContractManager {
  private materialTradeContracts = new Map<string, MaterialTradeContract>();

  public addMaterialTradeContract(
    chainName: string,
    chainInfo: ChainInfo,
    address: string,
  ) {
    this.materialTradeContracts.set(
      chainName,
      new MaterialTradeContract(chainInfo, address),
    );
  }

  public getMaterialTradeContract(chainName: string) {
    return this.materialTradeContracts.get(chainName);
  }
}

export default new ContractManager();
