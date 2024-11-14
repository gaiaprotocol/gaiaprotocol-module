import { SocialCompConfig } from "@common-module/social-components";
import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
import { AddressUtils } from "@common-module/wallet";
import {
  WalletLoginConfig,
  WalletLoginManager,
  WalletLoginPopup,
} from "@common-module/wallet-login";
import { LogoutIcon } from "@gaiaprotocol/svg-icons";
import PersonaAvatar from "./persona/PersonaAvatar.js";
import PersonaRepository from "./persona/PersonaRepository.js";
import PersonaUtils from "./persona/PersonaUtils.js";

class GaiaProtocolConfig {
  public isDevMode = false;
  public isTestnet = false;

  private supabaseUrls = {
    //TODO: Update with mainnet URL
    mainnet: "https://vykzkqqncxcfzflpkcsr.supabase.co",
    testnet: "https://vykzkqqncxcfzflpkcsr.supabase.co",
  };
  private supabaseKeys = {
    //TODO: Update with mainnet key
    mainnet:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5a3prcXFuY3hjZnpmbHBrY3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDc0OTUsImV4cCI6MjA0NDk4MzQ5NX0.UEGqZvIJ_FPxBk41C0RG4HfHahtR0yUfYVmtiZf61i0",
    testnet:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5a3prcXFuY3hjZnpmbHBrY3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDc0OTUsImV4cCI6MjA0NDk4MzQ5NX0.UEGqZvIJ_FPxBk41C0RG4HfHahtR0yUfYVmtiZf61i0",
  };

  private _supabaesConnector: SupabaseConnector | undefined;

  public get supabaseConnector() {
    if (!this._supabaesConnector) throw new Error("Supabase connector not set");
    return this._supabaesConnector;
  }

  public set supabaseConnector(connector: SupabaseConnector) {
    this._supabaesConnector = connector;
  }

  public onLoggedInUserPersonaNotFound: () => void = () => {};

  public initOnlyForGaiaProtocol(
    isDevMode: boolean,
    isTestnet: boolean,
  ) {
    this.isDevMode = isDevMode;
    this.isTestnet = isTestnet;

    this.supabaseConnector = new SupabaseConnector(
      this.supabaseUrls[isTestnet ? "testnet" : "mainnet"],
      this.supabaseKeys[isTestnet ? "testnet" : "mainnet"],
      WalletLoginManager,
    );

    WalletLoginConfig.supabaseConnector = this.supabaseConnector;
    PersonaRepository.supabaseConnector = this.supabaseConnector;

    SocialCompConfig.Avatar = PersonaAvatar;
    SocialCompConfig.LogoutIcon = LogoutIcon;

    SocialCompConfig.login = async () => new WalletLoginPopup();

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
    if (!WalletLoginManager.isLoggedIn) return;

    const walletAddress = WalletLoginManager.loggedInAddress!;
    const user = await SocialCompConfig.fetchUser(walletAddress);
    if (user.isFallback) this.onLoggedInUserPersonaNotFound();
  }

  public init(
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
  }
}

export default new GaiaProtocolConfig();
