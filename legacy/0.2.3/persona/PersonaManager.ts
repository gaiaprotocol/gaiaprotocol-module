import {
  SocialCompConfig,
  UserManager,
} from "@common-module/social-components";
import GaiaProtocolConfig from "../core/GaiaProtocolConfig.js";
import PersonaEntity from "./PersonaEntity.js";

class PersonaManager {
  private getNameValidationError(name: string): string | undefined {
    if (name.length > 100) return "The name is too long.";

    const validCharsRegex = /^[\p{L}\p{N}\p{Emoji}-]+$/u;
    if (!validCharsRegex.test(name)) {
      return "The name contains invalid characters. Allowed characters are letters, numbers, emojis, and hyphen (-).";
    }

    if (name.startsWith("-") || name.endsWith("-")) {
      return "The name cannot start or end with a hyphen (-).";
    }

    if (name.includes(".") || name.includes("--")) {
      return "The name cannot contain consecutive hyphens (--) or periods (.).";
    }

    if (name !== name.normalize("NFC")) {
      return "The name is not properly formatted (Unicode NFC normalization issue).";
    }
  }

  public async savePersona(persona: PersonaEntity) {
    if (
      persona.name &&
      !persona.is_ens_name && !persona.is_basename && !persona.is_gaia_name
    ) {
      const nameValidationError = this.getNameValidationError(persona.name);
      if (nameValidationError) throw new Error(nameValidationError);
    }

    await GaiaProtocolConfig.supabaseConnector.callEdgeFunction(
      "save-persona",
      persona,
    );

    // refetch user to get the updated data
    UserManager.setUser(
      await SocialCompConfig.fetchUser(persona.wallet_address),
    );
  }
}

export default new PersonaManager();
