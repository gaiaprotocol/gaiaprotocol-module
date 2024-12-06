export default interface PendingMaterialEntity {
  metadata_hash?: string;

  game_id: number;

  logo_image_url?: string;
  logo_thumbnail_url?: string;

  description?: string;

  created_at?: string;
}

export const PendingMaterialQuery = "*";
