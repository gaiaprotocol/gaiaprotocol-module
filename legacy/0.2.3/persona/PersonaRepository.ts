import { SupabaseDataRepository } from "@common-module/supabase";
import PersonaEntity, { PersonaQuery } from "./PersonaEntity.js";

class PersonaRepository extends SupabaseDataRepository<PersonaEntity> {
  constructor() {
    super("personas", PersonaQuery);
  }

  public async fetchPersona(
    walletAddress: string,
  ): Promise<PersonaEntity | undefined> {
    return this.fetchSingle((b) => b.eq("wallet_address", walletAddress));
  }

  public async fetchPersonaByName(
    name: string,
  ): Promise<PersonaEntity | undefined> {
    return this.fetchSingle((b) => b.eq("name", name));
  }

  public async fetchWalletAddressByName(
    name: string,
  ): Promise<string | undefined> {
    const persona = await this.fetchSingle(
      (b) => b.eq("name", name),
      "wallet_address",
    );
    return persona?.wallet_address;
  }

  public async fetchPersonas(
    walletAddresses: string[],
  ): Promise<PersonaEntity[]> {
    return this.fetch((b) => b.in("wallet_address", walletAddresses));
  }
}

export default new PersonaRepository();
