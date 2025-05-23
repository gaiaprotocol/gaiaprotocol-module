import { Store } from "@common-module/app";
import { AlertDialog } from "@common-module/app-components";
import {
  SocialCompConfig,
  UserManager,
} from "@common-module/social-components";
import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
import {
  WalletLoginConfig,
  WalletLoginManager,
} from "@common-module/wallet-login";
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
  public isDevMode = false;
  public isTestnet = false;

  private supabaseUrls = {
    //TODO: Update the mainnet URL
    mainnet: "https://vykzkqqncxcfzflpkcsr.supabase.co",
    testnet: "https://vykzkqqncxcfzflpkcsr.supabase.co",
  };

  private supabaseKeys = {
    //TODO: Update the mainnet key
    mainnet:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5a3prcXFuY3hjZnpmbHBrY3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDc0OTUsImV4cCI6MjA0NDk4MzQ5NX0.UEGqZvIJ_FPxBk41C0RG4HfHahtR0yUfYVmtiZf61i0",
    testnet:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5a3prcXFuY3hjZnpmbHBrY3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDc0OTUsImV4cCI6MjA0NDk4MzQ5NX0.UEGqZvIJ_FPxBk41C0RG4HfHahtR0yUfYVmtiZf61i0",
  };

  public getChainId() {
    return this.isTestnet ? baseSepolia.id : base.id;
  }

  private _supabaesConnector: SupabaseConnector | undefined;

  public get supabaseConnector() {
    if (!this._supabaesConnector) throw new Error("Supabase connector not set");
    return this._supabaesConnector;
  }

  public set supabaseConnector(connector: SupabaseConnector) {
    this._supabaesConnector = connector;
  }

  public onLoggedInUserPersonaNotFound: () => void = () => {};

  constructor() {
    if (!Store.isStorageAvailable()) {
      new AlertDialog({
        title: "Storage Access Required",
        message:
          "This service requires storage access to function properly. Please enable site data storage in your browser settings to continue using all features.",
      });
    }
  }

  public initOnlyForGaiaProtocol(isDevMode: boolean, isTestnet: boolean) {
    this.isDevMode = isDevMode;
    this.isTestnet = isTestnet;

    this.supabaseConnector = new SupabaseConnector(
      this.supabaseUrls[isTestnet ? "testnet" : "mainnet"],
      this.supabaseKeys[isTestnet ? "testnet" : "mainnet"],
      WalletLoginManager,
    );

    [
      WalletLoginConfig,
      ...REPOSITORIES,
    ].forEach((repo) => repo.supabaseConnector = this.supabaseConnector);

    SocialCompConfig.Avatar = PersonaAvatar;

    SocialCompConfig.login = async () => {
      const walletAddress = await WalletLoginManager.login();
      await UserManager.getUser(walletAddress);
    };

    SocialCompConfig.fetchUser = async (walletAddress: string) => {
      const persona = await PersonaRepository.fetchPersona(walletAddress);
      return persona ? PersonaUtils.convertPersonaToSocialUser(persona) : {
        id: walletAddress,
        name: AddressUtils.shortenAddress(walletAddress),
        username: AddressUtils.shortenAddress(walletAddress),
        isFallback: true,
      };
    };

    SocialCompConfig.fetchBulkUsers = async (walletAddresses: string[]) => {
      const personas = await PersonaRepository.fetchPersonas(walletAddresses);
      return personas.map(PersonaUtils.convertPersonaToSocialUser);
    };

    this.checkLoggedInUserHasPersona();
    WalletLoginManager.on(
      "loginStatusChanged",
      () => this.checkLoggedInUserHasPersona(),
    );
  }

  private async checkLoggedInUserHasPersona() {
    if (!WalletLoginManager.isLoggedIn()) return;

    const walletAddress = WalletLoginManager.getLoggedInAddress()!;
    const user = await SocialCompConfig.fetchUser(walletAddress);
    if (user.isFallback) this.onLoggedInUserPersonaNotFound();
  }

  public async init(
    isDevMode: boolean,
    isTestnet: boolean,
    supabaseConnectorForApp: SupabaseConnector,
    authTokenManagerForApp: AuthTokenManager,
  ) {
    this.initOnlyForGaiaProtocol(isDevMode, isTestnet);

    WalletLoginConfig.executeAfterLogin = async (token: string) => {
      authTokenManagerForApp.token = await supabaseConnectorForApp
        .callEdgeFunction<string>("inject-login-credentials", { token });
    };

    if (WalletLoginManager.token && !authTokenManagerForApp.token) {
      WalletLoginManager.logout();
    }

    try {
      const walletAddress = await supabaseConnectorForApp.callEdgeFunction(
        "check-jwt-token",
      );
      if (walletAddress !== WalletLoginManager.getLoggedInAddress()) {
        WalletLoginManager.logout();
      }
    } catch (e) {
      console.log(e);
      WalletLoginManager.logout();
    }
  }

  public initForGodMode(isDevMode: boolean, isTestnet: boolean) {
    GodMode.init();
    this.init(
      isDevMode,
      isTestnet,
      GodMode.supabaseConnector,
      GodMode.authTokenManager,
    );
  }
}

export default new GaiaProtocolConfig();
