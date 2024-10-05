export default interface Game {
  id: string;
  owner: string;
  name: string;
  created_at: string;
  updated_at?: string;
}

export const GameQuery = "*";
