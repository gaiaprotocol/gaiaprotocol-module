import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
import GaiaNameRepository from "../gaia-names/GaiaNameRepository.js";

class GodMode {
  public authTokenManager!: AuthTokenManager;
  public supabaseConnector!: SupabaseConnector;

  public init() {
    this.authTokenManager = new AuthTokenManager("god-mode-auth-token");
    this.supabaseConnector = new SupabaseConnector(
      "https://dhzxulywizygtdficytt.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoenh1bHl3aXp5Z3RkZmljeXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMTIxNDUsImV4cCI6MjA0NTY4ODE0NX0.xUd8nqcT2aVn1j4x8c-pRbDcFSaIGtkn7SAcmKleBms",
      this.authTokenManager,
    );
    GaiaNameRepository.supabaseConnector = this.supabaseConnector;
  }
}

export default new GodMode();
