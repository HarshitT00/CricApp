import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';

import { colors } from '@/constants/colors';
import { HomeScreen } from '@/features/home/HomeScreen';
import { CreateSessionScreen } from '@/features/sessions/CreateSession';
import { SessionListScreen } from '@/features/sessions/SessionListScreen';
import { RootStackParamList } from '@/navigation/types';

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
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SessionList"
          component={SessionListScreen}
          options={{
            headerShown: false,
            title: 'All Sessions',
          }}
        />

        <Stack.Screen
          name="CreateSession"
          component={CreateSessionScreen}
          options={{
            headerShown: false,
            title: 'Create Sessions',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
