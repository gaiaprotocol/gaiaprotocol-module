import { Contract } from "@common-module/wallet";
import ProfilesArtifact from "./abi/Profiles.json" assert {
    type: "json"
};
class ProfilesContract extends Contract {
    constructor() {
        super(ProfilesArtifact.abi);
    }
    async getPfp(address) {
        return this.viewContract.pfpOf(address);
    }
    async getProfileData(address) {
        try {
            return JSON.parse((await this.viewContract.profiles(address)).profileData);
        }
        catch (e) {
            console.error(e);
            return {};
        }
    }
    async updateProfile(pfpAddress, pfpTokenId, profileData) {
        return this.wait(async (contract) => {
            return contract.updateProfile(pfpAddress, pfpTokenId, JSON.stringify(profileData));
        });
    }
}
export default new ProfilesContract();
//# sourceMappingURL=ProfilesContract.js.map