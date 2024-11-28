export default interface PersonaEntity {
  wallet_address: string;

  name?: string;
  is_ens_name?: boolean;
  is_basename?: boolean;
  is_gaia_name?: boolean;

  profile_image_url?: string;
  profile_thumbnail_url?: string;

  nft_address?: string;
  nft_token_id?: string;

  bio?: string;

  created_at?: string;
}

export const PersonaQuery = "*";
