import { SocialCompConfig } from "@common-module/social-components";
import { SupabaseConnector } from "@common-module/supabase";
import { AddressUtils } from "@common-module/wallet";
import { WalletLoginConfig, WalletLoginManager, WalletLoginPopup, } from "@common-module/wallet-login";
import LogoutIcon from "./icons/LogoutIcon.js";
import PersonaAvatar from "./persona/PersonaAvatar.js";
import PersonaRepository from "./persona/PersonaRepository.js";
import PersonaUtils from "./persona/PersonaUtils.js";
class GaiaProtocolConfig {
    isDevMode = false;
    isTestnet = false;
    supabaseUrls = {
        mainnet: "https://vykzkqqncxcfzflpkcsr.supabase.co",
        testnet: "https://vykzkqqncxcfzflpkcsr.supabase.co",
    };
    supabaseKeys = {
        mainnet: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5a3prcXFuY3hjZnpmbHBrY3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDc0OTUsImV4cCI6MjA0NDk4MzQ5NX0.UEGqZvIJ_FPxBk41C0RG4HfHahtR0yUfYVmtiZf61i0",
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
    onLoggedInUserPersonaNotFound = () => { };
    initOnlyForGaiaProtocol(isDevMode, isTestnet) {
        this.isDevMode = isDevMode;
        this.isTestnet = isTestnet;
        this.supabaseConnector = new SupabaseConnector(this.supabaseUrls[isTestnet ? "testnet" : "mainnet"], this.supabaseKeys[isTestnet ? "testnet" : "mainnet"], WalletLoginManager);
        WalletLoginConfig.supabaseConnector = this.supabaseConnector;
        PersonaRepository.supabaseConnector = this.supabaseConnector;
        SocialCompConfig.Avatar = PersonaAvatar;
        SocialCompConfig.LogoutIcon = LogoutIcon;
        SocialCompConfig.login = async () => new WalletLoginPopup();
        SocialCompConfig.fetchUser = async (walletAddress) => {
            const persona = await PersonaRepository.fetchPersona(walletAddress);
            return persona ? PersonaUtils.convertPersonaToSocialUser(persona) : {
                id: walletAddress,
                name: AddressUtils.shortenAddress(walletAddress),
                username: AddressUtils.shortenAddress(walletAddress),
                isFallback: true,
            };
        };
        SocialCompConfig.fetchBulkUsers = async (walletAddresses) => {
            const personas = await PersonaRepository.fetchPersonas(walletAddresses);
            return personas.map(PersonaUtils.convertPersonaToSocialUser);
        };
        this.checkLoggedInUserHasPersona();
        WalletLoginManager.on("loginStatusChanged", () => this.checkLoggedInUserHasPersona());
    }
    async checkLoggedInUserHasPersona() {
        if (!WalletLoginManager.isLoggedIn)
            return;
        const walletAddress = WalletLoginManager.loggedInAddress;
        const user = await SocialCompConfig.fetchUser(walletAddress);
        if (user.isFallback)
            this.onLoggedInUserPersonaNotFound();
    }
    init(isDevMode, isTestnet, supabaseConnectorForApp, authTokenManagerForApp) {
        this.initOnlyForGaiaProtocol(isDevMode, isTestnet);
        WalletLoginConfig.executeAfterLogin = async (token) => {
            authTokenManagerForApp.token = await supabaseConnectorForApp
                .callEdgeFunction("inject-login-credentials", { token });
        };
    }
}
export default new GaiaProtocolConfig();
//# sourceMappingURL=GaiaProtocolConfig.js.map