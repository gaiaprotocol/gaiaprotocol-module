import { Contract } from "@common-module/wallet";
import ProfilesArtifact from "./abi/Profiles.json" assert {
    type: "json"
};
class ProfilesContract extends Contract {
    constructor() {
        super(ProfilesArtifact.abi);
    }
}
export default new ProfilesContract();
//# sourceMappingURL=ProfilesContract.js.map