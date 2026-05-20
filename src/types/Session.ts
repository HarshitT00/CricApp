export interface SessionSchedule {
  isRepeating: boolean;
  date: string | null;
  startDate: string | null;
  endDate: string | null;
  startTime: string;
  endTime: string;
  selectedDays: string[];
}

export interface Session {
  id: string;
  name: string;
  facility: 'Gym' | 'Pitch';
  schedule: SessionSchedule;
  batchIds: string[]; // Store the IDs of the batches assigned to this session
  status: 'UPCOMING' | 'COMPLETED' | 'LIVE' | 'ONGOING';
}