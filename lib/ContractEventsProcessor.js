import GaiaProtocolConfig from "./GaiaProtocolConfig.js";
class ContractEventsProcessor {
    async processEvents(contract) {
        await GaiaProtocolConfig.supabaseConnector.callEdgeFunction("process-contract-events", { contract });
    }
}
export default new ContractEventsProcessor();
//# sourceMappingURL=ContractEventsProcessor.js.map