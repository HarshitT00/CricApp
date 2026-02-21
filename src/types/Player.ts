export interface Player {
  id: string;
  name: string;
  country: string;
  role: 'Batsman' | 'Bowler' | 'All Rounder' | 'Wicket Keeper';
  image: string;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
  };
}
