import ProfilesContract from "./persona/contract/ProfilesContract.js";
class GaiaProtocolModule {
    init(options) {
        ProfilesContract.init(options.baseChain, options.profilesAddress);
    }
}
export default new GaiaProtocolModule();
//# sourceMappingURL=GaiaProtocolModule.js.map