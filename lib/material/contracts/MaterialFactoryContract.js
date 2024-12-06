import { WalletLoginManager } from "@common-module/wallet-login";
import { stringToHex } from "viem";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import MaterialFactoryArtifact from "./artifacts/MaterialFactory.json" assert {
    type: "json"
};
class MaterialFactoryContract {
    async createMaterial(name, symbol, metadataHash) {
        const events = await WalletLoginManager.writeContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
            abi: MaterialFactoryArtifact.abi,
            functionName: "createMaterial",
            args: [name, symbol, stringToHex(metadataHash, { size: 32 })],
        });
        for (const event of events) {
            if (event.eventName === "MaterialCreated") {
                return event.args?.materialAddress;
            }
        }
        throw new Error("Material creation failed");
    }
}
export default new MaterialFactoryContract();
//# sourceMappingURL=MaterialFactoryContract.js.map