class GaiaProtocolModuleConfig {
  public isDevMode = false;
  public isTestnet = false;

  public materialTech = {
    protocolFeePercent: 25000000000000000n,
    materialOwnerFeePercent: 25000000000000000n,
    priceIncrementPerToken: 1000000000000000n,
  };
}

export default new GaiaProtocolModuleConfig();
