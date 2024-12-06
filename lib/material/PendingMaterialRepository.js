import { SupabaseDataRepository } from "@common-module/supabase";
import { PendingMaterialQuery, } from "./PendingMaterialEntity.js";
class PendingMaterialRepository extends SupabaseDataRepository {
    constructor() {
        super("pending_materials", PendingMaterialQuery);
    }
}
export default new PendingMaterialRepository();
//# sourceMappingURL=PendingMaterialRepository.js.map