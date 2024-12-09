import { WalletSessionManager } from "@common-module/wallet";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import MaterialArtifact from "./artifacts/Material.json" assert {
  type: "json",
};

export default class MaterialContract {
  constructor(private address: `0x${string}`) {}

  public async balanceOf(account: string): Promise<bigint> {
    return await WalletSessionManager.readContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: this.address,
      abi: MaterialArtifact.abi,
      functionName: "balanceOf",
      args: [account],
    }) as bigint;
  }

  public async setName(name: string): Promise<void> {
    await WalletSessionManager.writeContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: this.address,
      abi: MaterialArtifact.abi,
      functionName: "setName",
      args: [name],
    });
  }

  public async setSymbol(symbol: string): Promise<void> {
    await WalletSessionManager.writeContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: this.address,
      abi: MaterialArtifact.abi,
      functionName: "setSymbol",
      args: [symbol],
    });
  }
}
