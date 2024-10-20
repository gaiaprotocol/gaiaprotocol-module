export default interface PersonaData {
  wallet_address: string;
  ens_domain: string;
  pfp_address: string;
  pfp_token_id: string;
  name: string;
  bio: string;
  social_links: string[];
  is_on_chain_profile: boolean;
  created_at: string;
  updated_at: string;
}
