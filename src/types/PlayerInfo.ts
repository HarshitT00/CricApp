interface GuardianInfo {
  name: string;
  contactNumber: string;
}

export interface PlayerInfo {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All Rounder' | 'Wicket Keeper';
  image: string;
  contactNumber: string;
  age: string;
  guardianInfo: GuardianInfo;
}
