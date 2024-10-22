import { SupabaseConnector } from "@common-module/supabase";
import { WalletLoginConfig, WalletLoginManager, } from "@common-module/wallet-login";
class GaiaProtocolConfig {
    isDevMode = false;
    isTestnet = false;
    supabaseUrls = {
        mainnet: "",
        testnet: "https://vykzkqqncxcfzflpkcsr.supabase.co",
    };
    supabaseKeys = {
        mainnet: "",
        testnet: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5a3prcXFuY3hjZnpmbHBrY3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDc0OTUsImV4cCI6MjA0NDk4MzQ5NX0.UEGqZvIJ_FPxBk41C0RG4HfHahtR0yUfYVmtiZf61i0",
    };
    _supabaesConnector;
    get supabaseConnector() {
        if (!this._supabaesConnector)
            throw new Error("Supabase connector not set");
        return this._supabaesConnector;
    }
    set supabaseConnector(connector) {
        this._supabaesConnector = connector;
    }
    init(isDevMode, isTestnet, supabaseConnectorForApp, authTokenManagerForApp) {
        this.isDevMode = isDevMode;
        this.isTestnet = isTestnet;
        this.supabaseConnector = new SupabaseConnector(this.supabaseUrls[isTestnet ? "testnet" : "mainnet"], this.supabaseKeys[isTestnet ? "testnet" : "mainnet"], WalletLoginManager);
        WalletLoginConfig.supabaseConnector = this.supabaseConnector;
        if (supabaseConnectorForApp) {
            if (!authTokenManagerForApp) {
                throw new Error("Auth token manager not set");
            }
            WalletLoginConfig.executeAfterLogin = async (token) => {
                authTokenManagerForApp.token = await supabaseConnectorForApp
                    .callEdgeFunction("inject-login-credentials", { token });
            };
        }
    }
}
export default new GaiaProtocolConfig();
//# sourceMappingURL=GaiaProtocolConfig.js.map