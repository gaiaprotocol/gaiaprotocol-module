import { SupabaseDataRepository } from "@common-module/supabase";
import MaterialEntity, { MaterialQuery } from "./MaterialEntity.js";

class MaterialRepository extends SupabaseDataRepository<MaterialEntity> {
  constructor() {
    super("materials", MaterialQuery);
  }

  public async fetchByAddress(
    address: string,
  ): Promise<MaterialEntity | undefined> {
    return await this.fetchSingle((b) => b.eq("address", address));
  }
}

export default new MaterialRepository();
