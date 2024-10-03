import GaiaProtocolModuleConfig from "../GaiaProtocolModuleConfig.js";

class MaterialTechConnector {
  public async getMaterialBalances(
    chainName: string,
    materialAddresses: string[],
  ) {
  }

  public openGameInfo(gameId: string) {
    const materialTechDomain = GaiaProtocolModuleConfig.isTestnet
      ? "https://testnet.material.tech"
      : "https://material.tech";
    window.open(`${materialTechDomain}/game/${gameId}`);
  }
}

export default new MaterialTechConnector();
