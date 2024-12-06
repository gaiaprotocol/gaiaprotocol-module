import { SupabaseDataRepository } from "@common-module/supabase";
import PendingMaterialEntity, {
  PendingMaterialQuery,
} from "./PendingMaterialEntity.js";

class PendingMaterialRepository
  extends SupabaseDataRepository<PendingMaterialEntity> {
  constructor() {
    super("pending_materials", PendingMaterialQuery);
  }
}

export default new PendingMaterialRepository();
