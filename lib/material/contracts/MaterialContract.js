import { WalletLoginManager } from "@common-module/wallet-login";
import GaiaProtocolConfig from "../../core/GaiaProtocolConfig.js";
import MaterialArtifact from "./artifacts/Material.json" with {
    type: "json"
};
export default class MaterialContract {
    address;
    constructor(address) {
        this.address = address;
    }
    async getOwner() {
        return await WalletLoginManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: this.address,
            abi: MaterialArtifact.abi,
            functionName: "owner",
        });
    }
    async balanceOf(account) {
        return await WalletLoginManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: this.address,
            abi: MaterialArtifact.abi,
            functionName: "balanceOf",
            args: [account],
        });
    }
    async setName(name) {
        await WalletLoginManager.writeContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: this.address,
            abi: MaterialArtifact.abi,
            functionName: "setName",
            args: [name],
        });
    }
    async setSymbol(symbol) {
        await WalletLoginManager.writeContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: this.address,
            abi: MaterialArtifact.abi,
            functionName: "setSymbol",
            args: [symbol],
        });
    }
}
//# sourceMappingURL=MaterialContract.js.map