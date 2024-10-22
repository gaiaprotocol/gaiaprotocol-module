export default interface Persona {
  walletAddress: string;

  name?: string;
  isEnsName: boolean;
  isBasename: boolean;
  isGaiaName: boolean;

  profileImageUrl?: string;
  nftAddress?: string;
  nftTokenId?: string;

  bio: string;
  socialLinks: string[];
}
