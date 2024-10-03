import GaiaProtocolModuleConfig from "../GaiaProtocolModuleConfig.js";
class MaterialTechConnector {
    async getMaterialBalances(chainName, materialAddresses) {
    }
    openGameInfo(gameId) {
        const materialTechDomain = GaiaProtocolModuleConfig.isTestnet
            ? "https://testnet.material.tech"
            : "https://material.tech";
        window.open(`${materialTechDomain}/game/${gameId}`);
    }
}
export default new MaterialTechConnector();
//# sourceMappingURL=MaterialTechConnector.js.map