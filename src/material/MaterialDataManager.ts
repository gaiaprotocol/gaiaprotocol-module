import { EventContainer, ObjectUtils } from "@common-module/ts";
import MaterialEntity from "./MaterialEntity.js";
import MaterialRepository from "./MaterialRepository.js";

class MaterialDataManager extends EventContainer<{
  materialUpdated: (material: MaterialEntity) => void;
}> {
  private materialCache = new Map<string, MaterialEntity>();
  private pendingRequests = new Map<string, Promise<MaterialEntity>>();

  public setMaterial(material: MaterialEntity) {
    if (material.address) {
      const cachedMaterial = this.materialCache.get(material.address);

      if (!ObjectUtils.isEqual(cachedMaterial, material)) {
        this.materialCache.set(material.address, material);
        this.emit("materialUpdated", material);
      }
    }
  }

  public async getMaterial(
    materialAddress: string,
  ): Promise<MaterialEntity | undefined> {
    const cachedMaterial = this.materialCache.get(materialAddress);
    if (cachedMaterial) return cachedMaterial;

    const pendingRequest = this.pendingRequests.get(materialAddress);
    if (pendingRequest) return pendingRequest;

    const material = await MaterialRepository.fetchByAddress(materialAddress);
    if (material) this.setMaterial(material);
    return material;
  }

  public async getMaterialsByGame(gameId: number): Promise<MaterialEntity[]> {
    const materials = await MaterialRepository.fetchByGame(gameId);
    materials.forEach((material) => this.setMaterial(material));
    return materials;
  }

  public async getMaterialsNotAddedToGame(): Promise<MaterialEntity[]> {
    const materials = await MaterialRepository.fetchNotAddedToGame();
    materials.forEach((material) => this.setMaterial(material));
    return materials;
  }

  public async updateMaterial(
    material: MaterialEntity,
  ): Promise<MaterialEntity> {
    const updatedMaterial = await MaterialRepository.update(material);
    this.setMaterial(updatedMaterial);
    return updatedMaterial;
  }
}

export default new MaterialDataManager();
