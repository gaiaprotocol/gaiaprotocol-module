import MaterialTradeContract from "./materialtech/contracts/MaterialTradeContract.js";

class ContractManager {
  private materialTradeContracts = new Map<string, MaterialTradeContract>();

  public addMaterialTradeContract(
    chain: string,
    rpc: string,
    address: string,
  ) {
    this.materialTradeContracts.set(
      chain,
      new MaterialTradeContract(rpc, address),
    );
  }

  public getMaterialTradeContract(chain: string) {
    return this.materialTradeContracts.get(chain);
  }
}

export default new ContractManager();
