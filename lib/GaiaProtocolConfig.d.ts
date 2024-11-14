import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
declare class GaiaProtocolConfig {
    isDevMode: boolean;
    isTestnet: boolean;
    private supabaseUrls;
    private supabaseKeys;
    private _supabaesConnector;
    get supabaseConnector(): SupabaseConnector;
    set supabaseConnector(connector: SupabaseConnector);
    onLoggedInUserPersonaNotFound: () => void;
    initOnlyForGaiaProtocol(isDevMode: boolean, isTestnet: boolean): void;
    private checkLoggedInUserHasPersona;
    init(isDevMode: boolean, isTestnet: boolean, supabaseConnectorForApp: SupabaseConnector, authTokenManagerForApp: AuthTokenManager): void;
}
declare const _default: GaiaProtocolConfig;
export default _default;
//# sourceMappingURL=GaiaProtocolConfig.d.ts.map