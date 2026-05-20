import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
const Tab = createBottomTabNavigator();

const AccountPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Account Screen</Text>
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

// Shared screen options applied to every stack screen
const screenOptions = {
  headerShown: false,
  animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
  // Fix green flash: set background on the native screen itself, not just contentStyle
  contentStyle: { backgroundColor: colors.background },
} as const;

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
      <Tab.Screen name="Batches" component={BatchesList} />
      <Tab.Screen name="Players" component={PlayersList} />
      <Tab.Screen name="Account" component={AccountPlaceholder} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={CustomTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            animation: 'none',
            contentStyle: { backgroundColor: colors.background },
          }}
        />

        <Stack.Screen
          name="CreateSession"
          component={CreateSession}
          options={{
            contentStyle: { backgroundColor: colors.background },
          }}
        />

        <Stack.Screen
          name="MarkAttendance"
          component={MarkAttendance}
          options={{
            contentStyle: { backgroundColor: colors.background },
          }}
        />

        <Stack.Screen
          name="RegisterPlayer"
          component={RegisterPlayer}
          options={{
            contentStyle: { backgroundColor: colors.background },
          }}
        />

        <Stack.Screen
          name="BatchDetails"
          component={BatchDetails}
          options={{
            contentStyle: { backgroundColor: colors.background },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
