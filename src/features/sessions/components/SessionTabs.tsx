import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export type SessionTabOption = 'Active' | 'Completed';

interface SessionTabsProps {
  activeTab: SessionTabOption;
  onTabChange: (tab: SessionTabOption) => void;
}

export const SessionTabs = ({ activeTab, onTabChange }: SessionTabsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Active' && styles.activeTab]} 
        onPress={() => onTabChange('Active')}
      >
        <Text style={[styles.tabText, activeTab === 'Active' && styles.activeTabText]}>
          Active
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.tab, activeTab === 'Completed' && styles.activeTab]} 
        onPress={() => onTabChange('Completed')}
      >
        <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTabText]}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    // CHANGED: Use spacing.xs (4px) instead of screenPadding (20px) to make tabs wider
    marginHorizontal: spacing.xs, 
    borderRadius: 12,
    padding: 4,
    marginBottom: spacing.l,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.surfaceLight,
  },
  tabText: {
    color: colors.text.secondary,
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
});