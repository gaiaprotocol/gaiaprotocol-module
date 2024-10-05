export default interface Material {
    chain: string;
    address: string;
    owner: string;
    name: string;
    symbol: string;
    supply: string;
    created_at: string;
    updated_at?: string;
}
export declare const MaterialQuery = "*, supply::text";
//# sourceMappingURL=Material.d.ts.map