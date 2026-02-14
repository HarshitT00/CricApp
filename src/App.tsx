import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from '@/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#0d291e');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0d291e' }}>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}