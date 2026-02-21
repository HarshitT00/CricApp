import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export const StatsGrid = () => {
  return (
    <View style={styles.container}>
      <StatCard label="PRESENT" value="24" sub="Students checked in" icon="people" />
      <View style={{ width: spacing.m }} />
      <StatCard label="AVG. RATE" value="92%" sub="Weekly average" icon="stats-chart" trend="+2%" />
    </View>
  );
};

const StatCard = ({ label, value, sub, icon, trend }: any) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Ionicons name={icon} size={16} color={colors.text.secondary} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.valueRow}>
      <Text style={styles.value}>{value}</Text>
      {trend && <Text style={styles.trend}>{trend}</Text>}
    </View>
    <Text style={styles.sub}>{sub}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.l,
    borderRadius: spacing.borderRadius,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
    gap: 6,
  },
  label: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  value: {
    color: colors.text.primary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  trend: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginLeft: 6,
  },
  sub: {
    color: colors.text.secondary,
    fontSize: 12,
  },
});
