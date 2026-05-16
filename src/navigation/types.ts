import { NavigatorScreenParams } from '@react-navigation/native';

import { PlayerInfo } from '@/types/PlayerInfo';

export type MainTabParamList = {
  Home: undefined;
  Sessions: undefined;
  Batches: undefined;
  Players: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>; // Tells TS about the nested tabs
  CreateSession: undefined;
  MarkAttendance: undefined;
  RegisterPlayer: { playerInfo?: PlayerInfo } | undefined;
};
