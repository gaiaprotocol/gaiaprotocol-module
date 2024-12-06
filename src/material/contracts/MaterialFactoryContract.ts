import { WalletLoginManager } from "@common-module/wallet-login";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import MaterialFactoryArtifact from "./artifacts/MaterialFactory.json" assert {
  type: "json",
};

class MaterialFactoryContract {
  public async createMaterial(
    name: string,
    symbol: string,
    metadataHash: string,
  ): Promise<string> {
    const events = await WalletLoginManager.writeContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "createMaterial",
      args: [name, symbol, metadataHash],
    });

    for (const event of events) {
      if (event.eventName === "MaterialCreated") {
        return (event.args as any)?.materialAddress;
      }
    }

    throw new Error("Material creation failed");
  }
}

export default new MaterialFactoryContract();
