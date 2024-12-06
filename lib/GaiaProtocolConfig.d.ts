import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
declare class GaiaProtocolConfig {
    isDevMode: boolean;
    isTestnet: boolean;
    private supabaseUrls;
    private supabaseKeys;
    private contractAddresses;
    getChainId(): 84532 | 8453;
    getContractAddress(contractName: keyof typeof GaiaProtocolConfig.prototype.contractAddresses.mainnet): `0x${string}`;
    private _supabaesConnector;
    get supabaseConnector(): SupabaseConnector;
    set supabaseConnector(connector: SupabaseConnector);
    onLoggedInUserPersonaNotFound: () => void;
    initOnlyForGaiaProtocol(isDevMode: boolean, isTestnet: boolean): void;
    private checkLoggedInUserHasPersona;
    init(isDevMode: boolean, isTestnet: boolean, supabaseConnectorForApp: SupabaseConnector, authTokenManagerForApp: AuthTokenManager): void;
    initForGodMode(isDevMode: boolean, isTestnet: boolean): void;
}
declare const _default: GaiaProtocolConfig;
export default _default;
//# sourceMappingURL=GaiaProtocolConfig.d.ts.map