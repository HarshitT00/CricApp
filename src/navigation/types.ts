import { NavigatorScreenParams } from '@react-navigation/native';

import { PlayerInfo } from '@/types/PlayerInfo';
import { Session } from '@/types/Session';

export type MainTabParamList = {
  Home: undefined;
  Sessions: undefined;
  Batches: undefined;
  Players: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>; // Tells TS about the nested tabs
 CreateSession: { sessionInfo?: Session } | undefined;
  MarkAttendance: { sessionId: string };
  RegisterPlayer: { playerInfo?: PlayerInfo } | undefined;
  BatchDetails: { batchId: string };
};
