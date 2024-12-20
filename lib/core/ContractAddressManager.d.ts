type ContractType = "PersonaFragments" | "ClanEmblems" | "TopicShares" | "MaterialFactory";
declare class ContractAddressManager {
    private contractAddresses;
    getContractAddress(contract: ContractType): `0x${string}`;
}
declare const _default: ContractAddressManager;
export default _default;
//# sourceMappingURL=ContractAddressManager.d.ts.map