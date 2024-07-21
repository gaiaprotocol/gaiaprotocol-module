import { Contract } from "@common-module/wallet";
import { Profiles } from "./abi/Profiles.js";
declare class ProfilesContract extends Contract<Profiles> {
    constructor();
    getPfp(address: string): Promise<[string, bigint]>;
    getProfileData(address: string): Promise<any>;
    updateProfile(pfpAddress: string, pfpTokenId: string, profileData: any): Promise<void>;
}
declare const _default: ProfilesContract;
export default _default;
//# sourceMappingURL=ProfilesContract.d.ts.map