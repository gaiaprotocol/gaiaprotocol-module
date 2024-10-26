import { User } from "@common-module/social-components";
import { AddressUtils } from "@common-module/wallet";
import PersonaEntity from "./PersonaEntity.js";

class PersonaUtils {
  public convertPersonaToSocialUser(persona: PersonaEntity): User {
    return {
      id: persona.wallet_address,
      name: persona.name ?? AddressUtils.shortenAddress(persona.wallet_address),
      username: AddressUtils.shortenAddress(persona.wallet_address),
      avatarUrl: persona.profile_image_url,
    };
  }
}

export default new PersonaUtils();
