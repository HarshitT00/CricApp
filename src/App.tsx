import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from '@/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#0d291e');
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d291e',
  },
});
