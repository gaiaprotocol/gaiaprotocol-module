import { WalletLoginManager } from "@common-module/wallet-login";
import { stringToHex } from "viem";
import GaiaProtocolConfig from "../../GaiaProtocolConfig.js";
import MaterialFactoryArtifact from "./artifacts/MaterialFactory.json" assert {
    type: "json"
};
class MaterialFactoryContract {
    async getProtocolFeeRate() {
        return await WalletLoginManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
            abi: MaterialFactoryArtifact.abi,
            functionName: "protocolFeeRate",
        });
    }
    async getMaterialOwnerFeeRate() {
        return await WalletLoginManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
            abi: MaterialFactoryArtifact.abi,
            functionName: "materialOwnerFeeRate",
        });
    }
    async getBuyPrice(materialAddress, amount) {
        return await WalletLoginManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
            abi: MaterialFactoryArtifact.abi,
            functionName: "getBuyPrice",
            args: [materialAddress, amount],
        });
    }
    async getSellPrice(materialAddress, amount) {
        return await WalletLoginManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
            abi: MaterialFactoryArtifact.abi,
            functionName: "getSellPrice",
            args: [materialAddress, amount],
        });
    }
    async getBuyPriceAfterFee(materialAddress, amount) {
        return await WalletLoginManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
            abi: MaterialFactoryArtifact.abi,
            functionName: "getBuyPriceAfterFee",
            args: [materialAddress, amount],
        });
    }
    async getSellPriceAfterFee(materialAddress, amount) {
        return await WalletLoginManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
            abi: MaterialFactoryArtifact.abi,
            functionName: "getSellPriceAfterFee",
            args: [materialAddress, amount],
        });
    }
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
    async buy(materialAddress, amount) {
        await WalletLoginManager.writeContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
            abi: MaterialFactoryArtifact.abi,
            functionName: "buy",
            args: [materialAddress, amount],
            value: await this.getBuyPriceAfterFee(materialAddress, amount),
        });
    }
    async sell(materialAddress, amount) {
        await WalletLoginManager.writeContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: GaiaProtocolConfig.getContractAddress("MaterialFactory"),
            abi: MaterialFactoryArtifact.abi,
            functionName: "sell",
            args: [materialAddress, amount],
        });
    }
}
export default new MaterialFactoryContract();
//# sourceMappingURL=MaterialFactoryContract.js.map