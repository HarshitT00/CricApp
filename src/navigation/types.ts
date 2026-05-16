import { NavigatorScreenParams } from '@react-navigation/native';

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
};