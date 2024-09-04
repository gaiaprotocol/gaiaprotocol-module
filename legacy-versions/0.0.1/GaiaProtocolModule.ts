import ChainInfo from "@common-module/wallet/lib/ChainInfo.js";
import ProfilesContract from "./persona/contract/ProfilesContract.js";

class GaiaProtocolModule {
  public init(options: {
    baseChain: ChainInfo;
    profilesAddress: string;
  }) {
    ProfilesContract.init(options.baseChain, options.profilesAddress);
  }
}

export default new GaiaProtocolModule();
