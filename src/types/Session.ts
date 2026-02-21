export interface Session {
  id: string;
  title: string;
  location: string;
  time: string;
  image: string;
  status: 'UPCOMING' | 'COMPLETED' | 'LIVE';
}
