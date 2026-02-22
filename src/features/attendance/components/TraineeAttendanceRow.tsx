import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Player } from '@/types/Player';

interface TraineeAttendanceRowProps {
  trainee: Player;
  status: 'PRESENT' | 'ABSENT' | null;
  onMarkPresent: () => void;
  onMarkAbsent: () => void;
}

export const TraineeAttendanceRow: React.FC<TraineeAttendanceRowProps> = ({
  trainee,
  status,
  onMarkPresent,
  onMarkAbsent,
}) => {
  return (
    <View style={styles.container}>
      {/* Trainee Info */}
      <View style={styles.infoSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={16} color={colors.text.secondary} />
        </View>
        <View>
          <Text style={styles.name}>{trainee.name}</Text>
          <Text style={styles.role}>{trainee.role}</Text>
        </View>
      </View>

      {/* Attendance Actions - Keeping only P and A */}
      <View style={styles.actionSection}>
        {/* Absent Button */}
        <TouchableOpacity
          style={[styles.actionButton, status === 'ABSENT' && styles.absentActive]}
          onPress={onMarkAbsent}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, status === 'ABSENT' && styles.absentTextActive]}>
            A
          </Text>
        </TouchableOpacity>

        {/* Present Button */}
        <TouchableOpacity
          style={[styles.actionButton, status === 'PRESENT' && styles.presentActive]}
          onPress={onMarkPresent}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, status === 'PRESENT' && styles.presentTextActive]}>
            P
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    // Reduced padding for a slimmer row
    paddingVertical: 10, 
    paddingHorizontal: spacing.m,
    borderRadius: spacing.borderRadius,
    // Decreased margin between rows to pack them closer
    marginBottom: spacing.xs, 
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36, // Slightly smaller avatar to match tighter row
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  name: {
    color: colors.text.primary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  role: {
    color: colors.text.secondary,
    fontSize: 12,
  },
  actionSection: {
    flexDirection: 'row',
    gap: spacing.s,
  },
  actionButton: {
    width: 32, // Scaled down slightly for the compact design
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  actionText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Active States
  presentActive: {
    backgroundColor: colors.status.successBg,
    borderColor: colors.status.success,
  },
  presentTextActive: {
    color: colors.status.success,
  },
  absentActive: {
    backgroundColor: colors.status.errorBg,
    borderColor: colors.status.error,
  },
  absentTextActive: {
    color: colors.status.error,
  },
});