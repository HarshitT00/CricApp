// src/components/AttendanceButton.tsx
import { QrCodeIcon, LockIcon, ArrowRightIcon } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  sessionName?: string;
}

export const AttendanceButton = ({ onPress, disabled = false, sessionName }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {disabled ? (
          <LockIcon size={24} color={colors.text.secondary} weight="duotone" />
        ) : (
          <QrCodeIcon size={24} color="black" weight="bold" />
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, disabled && styles.disabledText]}>
          Start Session Attendance
        </Text>
        <Text style={[styles.subtitle, disabled && styles.disabledText]}>
          {disabled
            ? 'Available 30 mins before start'
            : `Tap to mark ${sessionName ? `for ${sessionName}` : 'attendance'}`}
        </Text>
      </View>

      {!disabled && (
        <ArrowRightIcon size={22} color="black" weight="bold" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowOpacity: 0,
    elevation: 0,
  },
  iconContainer: {
    marginRight: spacing.m,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: 'black',
    fontSize: 14,
  },
  disabledText: {
    color: colors.text.secondary,
  },
});