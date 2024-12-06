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
    async balanceOf(account) {
        return await WalletSessionManager.readContract({
            chainId: GaiaProtocolConfig.getChainId(),
            address: this.address,
            abi: MaterialArtifact.abi,
            functionName: "balanceOf",
            args: [account],
        });
    }
}
//# sourceMappingURL=MaterialContract.js.map