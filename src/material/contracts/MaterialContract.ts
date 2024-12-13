import { WalletLoginManager } from "@common-module/wallet-login";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import MaterialArtifact from "./artifacts/Material.json" assert {
  type: "json",
};

export default class MaterialContract {
  constructor(private address: `0x${string}`) {}

  public async getOwner(): Promise<string> {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: this.address,
      abi: MaterialArtifact.abi,
      functionName: "owner",
    }) as string;
  }

  public async balanceOf(account: string): Promise<bigint> {
    return await WalletLoginManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: this.address,
      abi: MaterialArtifact.abi,
      functionName: "balanceOf",
      args: [account],
    }) as bigint;
  }

  public async setName(name: string): Promise<void> {
    await WalletLoginManager.writeContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: this.address,
      abi: MaterialArtifact.abi,
      functionName: "setName",
      args: [name],
    });
  }

  public async setSymbol(symbol: string): Promise<void> {
    await WalletLoginManager.writeContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: this.address,
      abi: MaterialArtifact.abi,
      functionName: "setSymbol",
      args: [symbol],
    });
  }
}
