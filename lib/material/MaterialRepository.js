import { SupabaseDataRepository } from "@common-module/supabase";
import { MaterialQuery } from "./MaterialEntity.js";
class MaterialRepository extends SupabaseDataRepository {
    constructor() {
        super("materials", MaterialQuery);
    }
    async fetchByAddress(address) {
        return await this.fetchSingle((b) => b.eq("address", address));
    }
    async fetchByGame(gameId) {
        return await this.fetch((b) => b.eq("game_id", gameId));
    }
    async fetchNotAddedToGame() {
        return await this.fetch((b) => b.is("game_id", null));
    }
    async update(material) {
        return await this.safeUpdate((b) => b.eq("address", material.address), {
            logo_image_url: material.logo_image_url,
            logo_thumbnail_url: material.logo_thumbnail_url,
            description: material.description,
        });
    }
}
export default new MaterialRepository();
//# sourceMappingURL=MaterialRepository.js.map