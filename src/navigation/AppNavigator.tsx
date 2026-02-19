import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';

// Screens
import { HomeScreen } from '@/features/home/HomeScreen';
import { SessionListScreen } from '@/features/sessions/SessionListScreen';

// Constants & Types
import { colors } from '@/constants/colors';
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

// Custom Animation Config
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
          // Defines the standard iOS-style slide from right
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: transitionConfig,
            close: transitionConfig,
          },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
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
            // HIDDEN: We use our custom <SessionHeader /> component inside the screen
            headerShown: false, 
            title: 'All Sessions',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}