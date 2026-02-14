import { HomeScreen } from '@/features/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}