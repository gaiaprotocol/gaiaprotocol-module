import { WalletLoginManager } from "@common-module/wallet-login";
import { stringToHex } from "viem";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import MaterialFactoryArtifact from "./artifacts/MaterialFactory.json" assert {
  type: "json",
};

class MaterialFactoryContract {
  public async getProtocolFeeRate() {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "protocolFeeRate",
    }) as bigint;
  }

  public async getMaterialOwnerFeeRate() {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "materialOwnerFeeRate",
    }) as bigint;
  }

  public async getBuyPrice(materialAddress: `0x${string}`, amount: bigint) {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "getBuyPrice",
      args: [materialAddress, amount],
    }) as bigint;
  }

  public async getSellPrice(materialAddress: `0x${string}`, amount: bigint) {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "getSellPrice",
      args: [materialAddress, amount],
    }) as bigint;
  }

  public async getBuyPriceAfterFee(
    materialAddress: `0x${string}`,
    amount: bigint,
  ) {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "getBuyPriceAfterFee",
      args: [materialAddress, amount],
    }) as bigint;
  }

  public async getSellPriceAfterFee(
    materialAddress: `0x${string}`,
    amount: bigint,
  ) {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "getSellPriceAfterFee",
      args: [materialAddress, amount],
    }) as bigint;
  }

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
      args: [name, symbol, stringToHex(metadataHash, { size: 32 })],
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
