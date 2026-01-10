import React from 'react';
import { View, StyleSheet, StatusBar, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle; 
  edges?: readonly ('top' | 'right' | 'bottom' | 'left')[];
}

export const ScreenWrapper = ({ 
  children, 
  style, 
  edges = ['top'] 
}: Props) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={[styles.content, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding, 
  },
});