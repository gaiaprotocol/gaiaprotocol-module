import { WalletLoginManager } from "@common-module/wallet-login";
import { stringToHex } from "viem";
import ContractAddressManager from "../../core/ContractAddressManager.js";
import GaiaProtocolConfig from "../../core/GaiaProtocolConfig.js";
import MaterialFactoryArtifact from "./artifacts/MaterialFactory.json" with {
  type: "json"
};

class MaterialFactoryContract {
  public async getProtocolFeeRate() {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: ContractAddressManager.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "protocolFeeRate",
    }) as bigint;
  }

  public async getMaterialOwnerFeeRate() {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: ContractAddressManager.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "materialOwnerFeeRate",
    }) as bigint;
  }

  public async getBuyPrice(materialAddress: `0x${string}`, amount: bigint) {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: ContractAddressManager.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "getBuyPrice",
      args: [materialAddress, amount],
    }) as bigint;
  }

  public async getSellPrice(materialAddress: `0x${string}`, amount: bigint) {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: ContractAddressManager.getContractAddress("MaterialFactory"),
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
      address: ContractAddressManager.getContractAddress("MaterialFactory"),
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
      address: ContractAddressManager.getContractAddress("MaterialFactory"),
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
      address: ContractAddressManager.getContractAddress("MaterialFactory"),
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

  public async buy(materialAddress: `0x${string}`, amount: bigint) {
    await WalletLoginManager.writeContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: ContractAddressManager.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "buy",
      args: [materialAddress, amount],
      value: await this.getBuyPriceAfterFee(materialAddress, amount),
    });
  }

  public async sell(materialAddress: `0x${string}`, amount: bigint) {
    await WalletLoginManager.writeContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: ContractAddressManager.getContractAddress("MaterialFactory"),
      abi: MaterialFactoryArtifact.abi,
      functionName: "sell",
      args: [materialAddress, amount],
    });
  }
}

export default new MaterialFactoryContract();
