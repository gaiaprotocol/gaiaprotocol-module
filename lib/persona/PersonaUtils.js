import { AddressUtils } from "@common-module/wallet";
class PersonaUtils {
    convertPersonaToSocialUser(persona) {
        return {
            id: persona.wallet_address,
            name: persona.name ?? AddressUtils.shortenAddress(persona.wallet_address),
            username: AddressUtils.shortenAddress(persona.wallet_address),
            avatarUrl: persona.profile_image_url,
        };
    }
}
export default new PersonaUtils();
//# sourceMappingURL=PersonaUtils.js.map