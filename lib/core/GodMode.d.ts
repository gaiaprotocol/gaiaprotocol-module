import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
declare class GodMode {
    authTokenManager: AuthTokenManager<Record<string, (...args: any[]) => any>>;
    supabaseConnector: SupabaseConnector;
    constructor();
}
declare const _default: GodMode;
export default _default;
//# sourceMappingURL=GodMode.d.ts.map