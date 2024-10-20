import { Contract } from "@common-module/contract";
import { Profiles } from "./abi/Profiles.js";
import ProfilesArtifact from "./abi/Profiles.json" assert {
  type: "json",
};

class ProfilesContract extends Contract<Profiles> {
  constructor() {
    super(ProfilesArtifact.abi);
  }
}

export default new ProfilesContract();
