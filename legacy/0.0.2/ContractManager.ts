import { ContractEventTracker } from "@common-module/contract-event-tracker";
import { WalletLoginManager } from "@common-module/wallet-login";
import { JsonRpcSigner } from "ethers";
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

  public async executeMaterialTradeAction<T>(
    chain: string,
    operation: (
      contract: MaterialTradeContract,
      signer: JsonRpcSigner,
    ) => Promise<T>,
  ) {
    const contract = this.materialTradeContracts.get(chain);
    if (!contract) throw new Error("MaterialTrade contract not found");

    const signer = await WalletLoginManager.getSigner();
    if (!signer) throw new Error("Signer not found");

    const result = await operation(contract, signer);

    await ContractEventTracker.trackEvents(chain, "MaterialTrade");

    return result;
  }
}

export default new ContractManager();
