import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Player } from '@/types/Player';

type AttendanceStatus = 'PRESENT' | 'ABSENT';

interface TraineeAttendanceRowProps {
  trainee: Player;
  status: AttendanceStatus | null;
  onMarkPresent: () => void;
  onMarkAbsent: () => void;
}

// Role abbreviation map
const ROLE_ABBR: Record<string, string> = {
  Batsman: 'BAT',
  Bowler: 'BWL',
  'All Rounder': 'ALL',
  'Wicket Keeper': 'WK',
};

export const TraineeAttendanceRow: React.FC<TraineeAttendanceRowProps> = ({
  trainee,
  status,
  onMarkPresent,
  onMarkAbsent,
}) => {
  const statusLabel = status === 'PRESENT' ? 'Present' : status === 'ABSENT' ? 'Absent' : null;

  const statusColor =
    status === 'PRESENT'
      ? colors.status.success
      : status === 'ABSENT'
        ? colors.status.error
        : colors.text.secondary;

  const roleAbbr = ROLE_ABBR[trainee.role] ?? trainee.role.slice(0, 3).toUpperCase();

  return (
    <View style={styles.container}>
      {/* Avatar with role badge */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color={colors.text.secondary} />
        </View>
        <View style={styles.roleBadge}>
          <Text style={styles.roleBadgeText}>{roleAbbr}</Text>
        </View>
      </View>

      {/* Name & Status */}
      <View style={styles.infoSection}>
        <Text style={styles.name}>{trainee.name}</Text>
        <Text style={[styles.subLabel, { color: statusColor }]}>{statusLabel ?? trainee.role}</Text>
      </View>

      {/* P / A / L Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={[styles.actionButton, status === 'PRESENT' && styles.presentActive]}
          onPress={onMarkPresent}
          activeOpacity={0.7}>
          <Text style={[styles.actionText, status === 'PRESENT' && styles.presentTextActive]}>
            P
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, status === 'ABSENT' && styles.absentActive]}
          onPress={onMarkAbsent}
          activeOpacity={0.7}>
          <Text style={[styles.actionText, status === 'ABSENT' && styles.absentTextActive]}>A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 12,
    paddingHorizontal: spacing.m,
    borderRadius: spacing.borderRadius,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Avatar
  avatarWrapper: {
    position: 'relative',
    marginRight: spacing.m,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  roleBadge: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    transform: [{ translateX: -14 }],
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 28,
    alignItems: 'center',
  },
  roleBadgeText: {
    color: colors.text.secondary,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },

  // Info
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: colors.text.primary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Actions
  actionSection: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Active States
  presentActive: {
    backgroundColor: colors.status.successBg,
    borderWidth: 1,
    borderColor: colors.status.success,
  },
  presentTextActive: {
    color: colors.status.success,
  },
  absentActive: {
    backgroundColor: colors.status.errorBg,
    borderWidth: 1,
    borderColor: colors.status.error,
  },
  absentTextActive: {
    color: colors.status.error,
  },
});
