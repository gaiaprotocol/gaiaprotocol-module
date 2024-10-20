class GaiaProtocolConfig {
  public isDevMode = false;
  public isTestnet = false;

  public supabaseUrls = {
    mainnet: "",
    testnet: "https://vykzkqqncxcfzflpkcsr.supabase.co",
  };
  public supabaseKeys = {
    mainnet: "",
    testnet:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5a3prcXFuY3hjZnpmbHBrY3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDc0OTUsImV4cCI6MjA0NDk4MzQ5NX0.UEGqZvIJ_FPxBk41C0RG4HfHahtR0yUfYVmtiZf61i0",
  };

  public materialTech = {
    protocolFeePercent: 25000000000000000n,
    materialOwnerFeePercent: 25000000000000000n,
    priceIncrementPerToken: 1000000000000000n,
  };
}

export default new GaiaProtocolConfig();
