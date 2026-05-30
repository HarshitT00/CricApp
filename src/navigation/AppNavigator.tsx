// src/navigation/AppNavigator.tsx
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Platform } from 'react-native';

import { colors } from '@/constants/colors';
import { MarkAttendance } from '@/features/attendance/MarkAttendance';
import { BatchDetails } from '@/features/batches/BatchDetails';
import { BatchesList } from '@/features/batches/BatchesList';
import { Home } from '@/features/home/Home';
import { PlayersList } from '@/features/players/PlayersList';
import { RegisterPlayer } from '@/features/players/RegisterPlayer';
import { CreateSession } from '@/features/sessions/CreateSession';
import { SessionList } from '@/features/sessions/SessionList';
import { RootStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AccountPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
    <Text style={{ color: colors.text.primary }}>Account Screen</Text>
  </View>
);

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.background,
    text: colors.text.primary,
    border: colors.background,
    notification: colors.primary,
  },
};

const screenOptions = {
  headerShown: false,
  animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
  contentStyle: { backgroundColor: colors.background },
} as const;

export function AppNavigator() {
  return (
    <NavigationContainer theme={CustomTheme}>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sessions" component={SessionList} />
        <Stack.Screen name="Batches" component={BatchesList} />
        <Stack.Screen name="Players" component={PlayersList} />
        <Stack.Screen name="Account" component={AccountPlaceholder} />
        <Stack.Screen name="CreateSession" component={CreateSession} />
        <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
        <Stack.Screen name="RegisterPlayer" component={RegisterPlayer} />
        <Stack.Screen name="BatchDetails" component={BatchDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}