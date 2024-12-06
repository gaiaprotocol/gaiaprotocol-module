import { SupabaseDataRepository } from "@common-module/supabase";
import ClanEntity, { ClanQuery } from "./ClanEntity.js";

class ClanRepository extends SupabaseDataRepository<ClanEntity> {
  constructor() {
    super("clans", ClanQuery);
  }

  public async fetchById(id: number): Promise<ClanEntity | undefined> {
    return await this.fetchSingle((b) => b.eq("id", id));
  }
}

export default new ClanRepository();
