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
    init(isDevMode: boolean, isTestnet: boolean, supabaseConnectorForApp?: SupabaseConnector, authTokenManagerForApp?: AuthTokenManager): void;
    private checkLoggedInUserHasPersona;
}
declare const _default: GaiaProtocolConfig;
export default _default;
//# sourceMappingURL=GaiaProtocolConfig.d.ts.map