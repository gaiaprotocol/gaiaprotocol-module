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

  public async fetchByGame(gameId: number): Promise<MaterialEntity[]> {
    return await this.fetch((b) => b.eq("game_id", gameId));
  }

  public async fetchNotAddedToGame(): Promise<MaterialEntity[]> {
    return await this.fetch((b) => b.is("game_id", null));
  }

  public async update(material: MaterialEntity): Promise<MaterialEntity> {
    return await this.safeUpdate((b) => b.eq("address", material.address), {
      logo_image_url: material.logo_image_url,
      logo_thumbnail_url: material.logo_thumbnail_url,
      description: material.description,
    });
  }
}

export default new MaterialRepository();
