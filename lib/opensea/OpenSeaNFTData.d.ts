export type TokenStandard = "erc721" | "erc1155";
export default interface OpenSeaNFTData {
    identifier: string;
    collection: string;
    contract: string;
    token_standard: TokenStandard;
    name: string;
    description: string;
    updated_at: string;
    is_disabled: boolean;
    is_nsfw: boolean;
    image_url?: string;
    display_image_url?: string;
    display_animation_url?: string;
    metadata_url?: string;
    opensea_url?: string;
}
//# sourceMappingURL=OpenSeaNFTData.d.ts.map