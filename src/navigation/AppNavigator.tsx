import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/feature/home/HomeScreen';
import { PlayerDetailScreen } from '@/feature/player_profile/PlayerDetailScreen';
import { AttendanceScreen } from '@/feature/attendance/AttendanceScreen';

import { Player } from '@/types/Player';

export type RootStackParamList = {
  Home: undefined;
  PlayerDetail: { player: Player };
  Attendance: { player: Player };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // We handle headers inside the screens
          contentStyle: { backgroundColor: '#FFFFFF' },
          animation: 'slide_from_right', // iOS style animation
        }}>
        
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlayerDetail" component={PlayerDetailScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} /> 
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}