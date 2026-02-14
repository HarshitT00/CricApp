import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export const HomeHeader = () => {
  const today = new Date();

  const dateString = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(today);

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{dateString}</Text>
        <Text style={styles.greeting}>
          {getGreeting()}, Coach Harshit
        </Text>
      </View>
      <View style={styles.bellContainer}>
        <Ionicons name="notifications-outline" size={28} color={colors.icon} />
        <View style={styles.badge} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.s,
  },
  date: {
    color: colors.text.secondary,
    fontSize: 14,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  greeting: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bellContainer: {
    position: 'relative',
    padding: spacing.xs,
    backgroundColor: colors.surfaceLight, 
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.status.error,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
});