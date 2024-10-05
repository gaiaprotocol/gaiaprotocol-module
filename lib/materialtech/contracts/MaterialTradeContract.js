import { Contract } from "@common-module/contract";
import { getAddress } from "ethers";
import MaterialTradeArtifact from "./abi/MaterialTrade.json" assert {
    type: "json"
};
export default class MaterialTradeContract extends Contract {
    constructor(rpc, address) {
        super(MaterialTradeArtifact.abi);
        this.init(rpc, address);
    }
    async createMaterial(signer, name, symbol) {
        const { contract, receipt } = await this.executeAndWait(signer, (contract) => contract.createMaterial(name, symbol));
        if (!receipt)
            throw new Error("Transaction failed");
        const eventTopic = (await contract.filters.MaterialCreated().getTopicFilter())[0];
        for (const log of receipt.logs) {
            if (log.topics[0] === eventTopic) {
                const address = "0x" + log.topics[2].slice(26);
                return getAddress(address);
            }
        }
        throw new Error("MaterialCreated event not found");
    }
    async getBuyPriceAfterFee(address, amount) {
        return await this.viewContract.getBuyPriceAfterFee(address, amount);
    }
    async buy(signer, address, amount) {
        console.log(await this.getBuyPriceAfterFee(address, amount));
        await this.executeAndWait(signer, async (contract) => contract.buy(address, amount, {
            value: await this.getBuyPriceAfterFee(address, amount),
        }));
    }
    async sell(signer, address, amount) {
        await this.executeAndWait(signer, (contract) => contract.sell(address, amount));
    }
}
//# sourceMappingURL=MaterialTradeContract.js.map