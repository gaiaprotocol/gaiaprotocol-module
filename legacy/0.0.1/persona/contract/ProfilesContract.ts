import { Contract } from "@common-module/wallet";
import { Profiles } from "./abi/Profiles.js";
import ProfilesArtifact from "./abi/Profiles.json" assert {
  type: "json",
};

class ProfilesContract extends Contract<Profiles> {
  constructor() {
    super(ProfilesArtifact.abi);
  }

  public async getPfp(address: string) {
    return this.viewContract.pfpOf(address);
  }

  public async getProfileData(address: string): Promise<any> {
    try {
      return JSON.parse(
        (await this.viewContract.profiles(address)).profileData,
      );
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  public async updateProfile(
    pfpAddress: string,
    pfpTokenId: string,
    profileData: any,
  ) {
    return this.wait(async (contract) => {
      return contract.updateProfile(
        pfpAddress,
        pfpTokenId,
        JSON.stringify(profileData),
      );
    });
  }
}

export default new ProfilesContract();
