import GaiaProtocolConfig from "./GaiaProtocolConfig.js";
class ContractEventsProcessor {
    async processEvents(chainId, contract) {
        await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("process-contract-events", { chainId, contract });
    }
}
export default new ContractEventsProcessor();
//# sourceMappingURL=ContractEventsProcessor.js.map