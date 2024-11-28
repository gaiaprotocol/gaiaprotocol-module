import GaiaProtocolConfig from "./GaiaProtocolConfig.js";

class ContractEventsProcessor {
  public async processEvents(
    chainId: number,
    contract:
      | "PersonaFragments"
      | "ClanEmblems"
      | "TopicShares"
      | "MaterialFactory",
  ) {
    await GaiaProtocolConfig.supabaseConnector.callEdgeFunction(
      "process-contract-events",
      { chainId, contract },
    );
  }
}

export default new ContractEventsProcessor();
