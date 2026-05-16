import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/colors';
import { Home } from '@/features/home/Home';
import { CreateSession } from '@/features/sessions/CreateSession';
import { SessionList } from '@/features/sessions/SessionList';
import { MarkAttendance } from '@/features/attendance/MarkAttendance';
import { RootStackParamList } from '@/navigation/types';
import { PlayersList } from '@/features/players/PlayersList';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// --- Placeholders for screens you haven't imported yet ---
const BatchesPlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Batches Screen</Text></View>;
const AccountPlaceholder = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Account Screen</Text></View>;
// ---------------------------------------------------------

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


function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: '#e0e0e0',
          height: 75,
          paddingTop: 8,
          paddingBottom: 12,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Sessions') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Batches') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Players') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Sessions" component={SessionList} />
      <Tab.Screen name="Batches" component={BatchesPlaceholder} />
      <Tab.Screen name="Players" component={PlayersList} />
      <Tab.Screen name="Account" component={AccountPlaceholder} />
    </Tab.Navigator>
  );
}

// --- THE ROOT STACK NAVIGATOR ---
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
        
        {/* MainTabs holds the Footer */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
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