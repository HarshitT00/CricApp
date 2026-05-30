// src/navigation/types.ts
import { PlayerInfo } from '@/types/PlayerInfo';
import { Session } from '@/types/Session';

export type RootStackParamList = {
  Home: undefined;
  Sessions: undefined;
  Batches: undefined;
  Players: undefined;
  Account: undefined;
  CreateSession: { sessionInfo?: Session } | undefined;
  MarkAttendance: { sessionId: string };
  RegisterPlayer: { playerInfo?: PlayerInfo } | undefined;
  BatchDetails: { batchId: string };
};