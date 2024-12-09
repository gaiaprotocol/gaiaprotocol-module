import { EventContainer } from "@common-module/ts";
import MaterialEntity from "./MaterialEntity.js";
declare class MaterialDataManager extends EventContainer<{
    materialUpdated: (material: MaterialEntity) => void;
}> {
    private materialCache;
    private pendingRequests;
    setMaterial(material: MaterialEntity): void;
    getMaterial(materialAddress: string): Promise<MaterialEntity | undefined>;
    getMaterialsByGame(gameId: number): Promise<MaterialEntity[]>;
}
declare const _default: MaterialDataManager;
export default _default;
//# sourceMappingURL=MaterialDataManager.d.ts.map