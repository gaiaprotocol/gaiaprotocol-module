export default interface ClanEntity {
  id?: number;

  owner?: string;

  name?: string;

  logo_image_url?: string;
  logo_thumbnail_url?: string;

  description?: string;

  created_at?: string;
  updated_at?: string;
}

export const ClanQuery = "*";
