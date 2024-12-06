import { WalletLoginManager } from "@common-module/wallet-login";
import { stringToHex } from "viem";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import ClanEmblemsArtifact from "./artifacts/ClanEmblems.json" assert {
  type: "json",
};

class ClanEmblemsContract {
  public async createClan(metadataHash: string): Promise<bigint> {
    const events = await WalletLoginManager.writeContract({
      chainId: GaiaProtocolConfig.getChainId(),
      address: GaiaProtocolConfig.getContractAddress("ClanEmblems"),
      abi: ClanEmblemsArtifact.abi,
      functionName: "createClan",
      args: [stringToHex(metadataHash, { size: 32 })],
    });

    for (const event of events) {
      if (event.eventName === "ClanCreated") {
        return (event.args as any)?.clanId;
      }
    }

    throw new Error("Clan creation failed");
  }
}

export default new ClanEmblemsContract();
