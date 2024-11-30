import { AddressUtils } from "@common-module/wallet-utils";
class PersonaUtils {
    convertPersonaToSocialUser(persona) {
        return {
            id: persona.wallet_address,
            name: persona.name ?? AddressUtils.shortenAddress(persona.wallet_address),
            username: AddressUtils.shortenAddress(persona.wallet_address),
            avatarUrl: persona.profile_image_url,
            isNftAvatar: persona.profile_nft_address !== undefined &&
                persona.profile_nft_token_id !== undefined,
        };
    }
}
export default new PersonaUtils();
//# sourceMappingURL=PersonaUtils.js.map