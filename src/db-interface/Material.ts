export default interface Material {
  chain: string;
  address: string;
  owner: string;
  name: string;
  symbol: string;
  supply: string;
  price: string;
  created_at: string;
  updated_at?: string;
}

export const MaterialQuery = "*, supply::text, price::text";
