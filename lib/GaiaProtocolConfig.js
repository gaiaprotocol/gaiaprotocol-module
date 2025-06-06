import { SocialCompConfig, UserManager, } from "@common-module/social-components";
import { SupabaseConnector } from "@common-module/supabase";
import { WalletLoginConfig, WalletLoginManager, } from "@common-module/wallet-login";
import { AddressUtils } from "@common-module/wallet-utils";
import { base, baseSepolia } from "@wagmi/core/chains";
import ClanRepository from "./clan/ClanRepository.js";
import GameRepository from "./game/GameRepository.js";
import GodMode from "./core/GodMode.js";
import MaterialRepository from "./material/MaterialRepository.js";
import PersonaAvatar from "./persona/PersonaAvatar.js";
import PersonaRepository from "./persona/PersonaRepository.js";
import PersonaUtils from "./persona/PersonaUtils.js";
const repositories = [
    GameRepository,
    PersonaRepository,
    ClanRepository,
    MaterialRepository,
];
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
            PersonaFragments: "0x",
            ClanEmblems: "0x",
            TopicShares: "0x",
            MaterialFactory: "0x",
        },
        testnet: {
            PersonaFragments: "0xa7727F706e1cbF6E5e7C38596067ab47A770cbB2",
            ClanEmblems: "0x9322C4A5E5725262C9960aDE87259d1cE2812412",
            TopicShares: "0x603E1F1673EEC57Ca72A7A5543A34a853CF61a5E",
            MaterialFactory: "0x9EF42F082360c606d3D0480404F47924323B4D8b",
        },
    };
    getChainId() {
        return this.isTestnet ? baseSepolia.id : base.id;
    }
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
        [
            WalletLoginConfig,
            ...repositories,
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