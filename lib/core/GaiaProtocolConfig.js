import { Store } from "@common-module/app";
import { AlertDialog } from "@common-module/app-components";
import { SocialCompConfig, UserManager, } from "@common-module/social-components";
import { SupabaseConnector } from "@common-module/supabase";
import { WalletLoginConfig, WalletLoginManager, } from "@common-module/wallet-login";
import { AddressUtils } from "@common-module/wallet-utils";
import { base, baseSepolia } from "@wagmi/core/chains";
import ClanRepository from "../clan/ClanRepository.js";
import GameRepository from "../game/GameRepository.js";
import MaterialRepository from "../material/MaterialRepository.js";
import PersonaAvatar from "../persona/PersonaAvatar.js";
import PersonaRepository from "../persona/PersonaRepository.js";
import PersonaUtils from "../persona/PersonaUtils.js";
import PersonaPostRepository from "../persona/post/PersonaPostRepository.js";
import GodMode from "./GodMode.js";
const REPOSITORIES = [
    GameRepository,
    PersonaRepository,
    PersonaPostRepository,
    ClanRepository,
    MaterialRepository,
];
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
    getChainId() {
        return this.isTestnet ? baseSepolia.id : base.id;
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
    constructor() {
        if (!Store.isStorageAvailable()) {
            new AlertDialog({
                title: "Storage Access Required",
                message: "This service requires storage access to function properly. Please enable site data storage in your browser settings to continue using all features.",
            });
        }
    }
    initOnlyForGaiaProtocol(isDevMode, isTestnet) {
        this.isDevMode = isDevMode;
        this.isTestnet = isTestnet;
        this.supabaseConnector = new SupabaseConnector(this.supabaseUrls[isTestnet ? "testnet" : "mainnet"], this.supabaseKeys[isTestnet ? "testnet" : "mainnet"], WalletLoginManager);
        [
            WalletLoginConfig,
            ...REPOSITORIES,
        ].forEach((repo) => repo.supabaseConnector = this.supabaseConnector);
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
    async init(isDevMode, isTestnet, supabaseConnectorForApp, authTokenManagerForApp) {
        this.initOnlyForGaiaProtocol(isDevMode, isTestnet);
        WalletLoginConfig.executeAfterLogin = async (token) => {
            authTokenManagerForApp.token = await supabaseConnectorForApp
                .callEdgeFunction("inject-login-credentials", { token });
        };
        if (WalletLoginManager.token && !authTokenManagerForApp.token) {
            WalletLoginManager.logout();
        }
        try {
            const walletAddress = await supabaseConnectorForApp.callEdgeFunction("check-jwt-token");
            if (walletAddress !== WalletLoginManager.getLoggedInAddress()) {
                WalletLoginManager.logout();
            }
        }
        catch (e) {
            console.log(e);
            WalletLoginManager.logout();
        }
    }
    initForGodMode(isDevMode, isTestnet) {
        GodMode.init();
        this.init(isDevMode, isTestnet, GodMode.supabaseConnector, GodMode.authTokenManager);
    }
}
export default new GaiaProtocolConfig();
//# sourceMappingURL=GaiaProtocolConfig.js.map