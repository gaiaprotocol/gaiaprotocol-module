import GaiaProtocolConfig from "./GaiaProtocolConfig.js";
class ContractAddressManager {
    contractAddresses = {
        mainnet: {
            PersonaFragments: "0x",
            ClanEmblems: "0x",
            TopicShares: "0x",
            MaterialFactory: "0x",
        },
        testnet: {
            PersonaFragments: "0xa7727F706e1cbF6E5e7C38596067ab47A770cbB2",
            ClanEmblems: "0x",
            TopicShares: "0x",
            MaterialFactory: "0x9EF42F082360c606d3D0480404F47924323B4D8b",
        },
    };
    getContractAddress(contract) {
        return this
            .contractAddresses[GaiaProtocolConfig.isTestnet ? "testnet" : "mainnet"][contract];
    }
}
export default new ContractAddressManager();
//# sourceMappingURL=ContractAddressManager.js.map