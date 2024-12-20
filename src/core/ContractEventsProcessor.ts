import GaiaProtocolConfig from "./GaiaProtocolConfig.js";

class ContractEventsProcessor {
  public async processEvents(
    contract:
      | "PersonaFragments"
      | "ClanEmblems"
      | "TopicShares"
      | "MaterialFactory",
  ) {
    await GaiaProtocolConfig.supabaseConnector.callEdgeFunction(
      "process-contract-events",
      { contract },
    );
  }
}

export default new ContractEventsProcessor();
