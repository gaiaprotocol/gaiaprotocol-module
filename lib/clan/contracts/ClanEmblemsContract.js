import { WalletLoginManager } from "@common-module/wallet-login";
import { stringToHex } from "viem";
import ContractAddressManager from "../../core/ContractAddressManager.js";
import GaiaProtocolConfig from "../../core/GaiaProtocolConfig.js";
import ClanEmblemsArtifact from "./artifacts/ClanEmblems.json" with {
    type: "json"
};
class ClanEmblemsContract {
    async createClan(metadataHash) {
        const events = await WalletLoginManager.writeContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: ContractAddressManager.getContractAddress("ClanEmblems"),
            abi: ClanEmblemsArtifact.abi,
            functionName: "createClan",
            args: [stringToHex(metadataHash, { size: 32 })],
        });
        for (const event of events) {
            if (event.eventName === "ClanCreated") {
                return event.args?.clanId;
            }
        }
        throw new Error("Clan creation failed");
    }
}
export default new ClanEmblemsContract();
//# sourceMappingURL=ClanEmblemsContract.js.map