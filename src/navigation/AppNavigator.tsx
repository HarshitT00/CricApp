import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';

import { colors } from '@/constants/colors';
import { Home } from '@/features/home/Home';
import { CreateSession } from '@/features/sessions/CreateSession';
import { SessionList } from '@/features/sessions/SessionList';
import { RootStackParamList } from '@/navigation/types';
import { MarkAttendance } from '@/features/attendance/MarkAttendance';

const Stack = createStackNavigator<RootStackParamList>();

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

const transitionConfig = {
  animation: 'spring' as const,
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={CustomTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: colors.text.primary,
            fontWeight: '600',
            fontSize: 17,
          },
          headerTintColor: colors.primary,
          headerBackTitle: '',
          cardStyle: {
            backgroundColor: colors.background,
          },
          cardOverlayEnabled: false,
          cardShadowEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: transitionConfig,
            close: transitionConfig,
          },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SessionList"
          component={SessionList}
          options={{
            headerShown: false,
            title: 'All Sessions',
          }}
        />

        <Stack.Screen
          name="CreateSession"
          component={CreateSession}
          options={{
            headerShown: false,
            title: 'Create Sessions',
          }}
        />

        <Stack.Screen
          name="MarkAttendance"
          component={MarkAttendance}
          options={{
            headerShown: false,
            title: 'Mark Attendance',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
