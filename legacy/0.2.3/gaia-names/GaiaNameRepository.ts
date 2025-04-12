import { SupabaseDataRepository } from "@common-module/supabase";
import GaiaNameEntity, { GaiaNameQuery } from "./GaiaNameEntity.js";

class GaiaNameRepository extends SupabaseDataRepository<GaiaNameEntity> {
  constructor() {
    super("gaia_names", GaiaNameQuery);
  }

  public async fetchByWallet(
    walletAddress: string,
  ): Promise<GaiaNameEntity | undefined> {
    return await this.fetchSingle((b) => b.eq("wallet_address", walletAddress));
  }

  public async fetchByName(name: string): Promise<GaiaNameEntity | undefined> {
    return this.fetchSingle((b) => b.eq("name", name));
  }

  public async search(query: string): Promise<GaiaNameEntity[]> {
    return this.fetch((b) => b.ilike("name", `%${query}%`));
  }
}

export default new GaiaNameRepository();
