import { EventContainer, ObjectUtils } from "@common-module/ts";
import MaterialRepository from "./MaterialRepository.js";
class MaterialDataManager extends EventContainer {
    materialCache = new Map();
    pendingRequests = new Map();
    setMaterial(material) {
        if (material.address) {
            const cachedMaterial = this.materialCache.get(material.address);
            if (!ObjectUtils.isEqual(cachedMaterial, material)) {
                this.materialCache.set(material.address, material);
                this.emit("materialUpdated", material);
            }
        }
    }
    async getMaterial(materialAddress) {
        const cachedMaterial = this.materialCache.get(materialAddress);
        if (cachedMaterial)
            return cachedMaterial;
        const pendingRequest = this.pendingRequests.get(materialAddress);
        if (pendingRequest)
            return pendingRequest;
        const material = await MaterialRepository.fetchByAddress(materialAddress);
        if (material)
            this.setMaterial(material);
        return material;
    }
    async getMaterialsByGame(gameId) {
        const materials = await MaterialRepository.fetchByGame(gameId);
        materials.forEach((material) => this.setMaterial(material));
        return materials;
    }
}
export default new MaterialDataManager();
//# sourceMappingURL=MaterialDataManager.js.map