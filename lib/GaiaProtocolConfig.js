import { SocialCompConfig, UserManager, } from "@common-module/social-components";
import { SupabaseConnector } from "@common-module/supabase";
import { WalletLoginConfig, WalletLoginManager, } from "@common-module/wallet-login";
import { AddressUtils } from "@common-module/wallet-utils";
import GodMode from "./GodMode.js";
import PersonaAvatar from "./persona/PersonaAvatar.js";
import PersonaRepository from "./persona/PersonaRepository.js";
import PersonaUtils from "./persona/PersonaUtils.js";
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
    contractAddresses = {
        mainnet: {
            PersonaFragments: "",
            ClanEmblems: "",
            TopicShares: "",
            MaterialFactory: "",
        },
        testnet: {
            PersonaFragments: "0x36Cfa7BCD0F4b803e3421Dac9E894A3Db034b03C",
            ClanEmblems: "0x9322C4A5E5725262C9960aDE87259d1cE2812412",
            TopicShares: "0x603E1F1673EEC57Ca72A7A5543A34a853CF61a5E",
            MaterialFactory: "0xc78c189C24379857A80635624877E02306de3EE1",
        },
    };
    getContractAddress(contractName) {
        return this.contractAddresses[this.isTestnet ? "testnet" : "mainnet"][contractName];
    }
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
        SocialCompConfig.login = async () => {
            const walletAddress = await WalletLoginManager.login();
            await UserManager.getUser(walletAddress);
        };
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
        if (!WalletLoginManager.isLoggedIn())
            return;
        const walletAddress = WalletLoginManager.getLoggedInAddress();
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
    initForGodMode(isDevMode, isTestnet) {
        this.init(isDevMode, isTestnet, GodMode.supabaseConnector, GodMode.authTokenManager);
    }
}
export default new GaiaProtocolConfig();
//# sourceMappingURL=GaiaProtocolConfig.js.map