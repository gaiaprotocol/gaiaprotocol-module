import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";

class ContractManager {
  private materialTradeContracts = new Map<string, MaterialTradeContract>();

  public addMaterialTradeContract(
    chainName: string,
    rpc: string,
    address: string,
  ) {
    this.materialTradeContracts.set(
      chainName,
      new MaterialTradeContract(rpc, address),
    );
  }

  public getMaterialTradeContract(chainName: string) {
    return this.materialTradeContracts.get(chainName);
  }
}

export default new ContractManager();
