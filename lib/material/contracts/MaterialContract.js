import { WalletSessionManager } from "@common-module/wallet";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import MaterialArtifact from "./artifacts/Material.json" assert {
    type: "json"
};
export default class MaterialContract {
    address;
    constructor(address) {
        this.address = address;
    }
    async getOwner() {
        return await WalletSessionManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: this.address,
            abi: MaterialArtifact.abi,
            functionName: "owner",
        });
    }
    async balanceOf(account) {
        return await WalletSessionManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: this.address,
            abi: MaterialArtifact.abi,
            functionName: "balanceOf",
            args: [account],
        });
    }
    async setName(name) {
        await WalletSessionManager.writeContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: this.address,
            abi: MaterialArtifact.abi,
            functionName: "setName",
            args: [name],
        });
    }
    async setSymbol(symbol) {
        await WalletSessionManager.writeContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: this.address,
            abi: MaterialArtifact.abi,
            functionName: "setSymbol",
            args: [symbol],
        });
    }
}
//# sourceMappingURL=MaterialContract.js.map