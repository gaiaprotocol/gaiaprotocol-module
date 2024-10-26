import { SocialCompConfig } from "@common-module/social-components";
import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
import { AddressUtils } from "@common-module/wallet";
import {
  WalletLoginConfig,
  WalletLoginManager,
  WalletLoginPopup,
} from "@common-module/wallet-login";
import UserAvatar from "./UserAvatar.js";
import PersonaRepository from "./persona/PersonaRepository.js";
import PersonaUtils from "./persona/PersonaUtils.js";

class GaiaProtocolConfig {
  public isDevMode = false;
  public isTestnet = false;

  private supabaseUrls = {
    mainnet: "",
    testnet: "https://vykzkqqncxcfzflpkcsr.supabase.co",
  };
  private supabaseKeys = {
    mainnet: "",
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

  public init(
    isDevMode: boolean,
    isTestnet: boolean,
    supabaseConnectorForApp?: SupabaseConnector,
    authTokenManagerForApp?: AuthTokenManager,
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

    if (supabaseConnectorForApp) {
      if (!authTokenManagerForApp) {
        throw new Error("Auth token manager not set");
      }

      WalletLoginConfig.executeAfterLogin = async (token: string) => {
        authTokenManagerForApp.token = await supabaseConnectorForApp
          .callEdgeFunction<string>("inject-login-credentials", { token });
      };
    }

    SocialCompConfig.Avatar = UserAvatar;

    SocialCompConfig.login = async () => new WalletLoginPopup();

    SocialCompConfig.fetchUser = async (walletAddress: string) => {
      const persona = await PersonaRepository.fetchPersona(walletAddress);
      return persona ? PersonaUtils.convertPersonaToSocialUser(persona) : {
        id: walletAddress,
        name: AddressUtils.shortenAddress(walletAddress),
        username: AddressUtils.shortenAddress(walletAddress),
      };
    };

    SocialCompConfig.fetchBulkUsers = async (walletAddresses: string[]) => {
      const personas = await PersonaRepository.fetchPersonas(walletAddresses);
      return personas.map(PersonaUtils.convertPersonaToSocialUser);
    };
  }
}

export default new GaiaProtocolConfig();
