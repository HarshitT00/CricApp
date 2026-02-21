import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface CustomToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const CustomToggle: React.FC<CustomToggleProps> = ({
  label,
  description,
  value,
  onValueChange,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.containerDisabled]}
      onPress={() => !disabled && onValueChange(!value)}
      activeOpacity={0.8}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>

      <View style={[styles.track, value && styles.trackActive]}>
        <View style={[styles.thumb, value && styles.thumbActive]} />
      </View>
    </TouchableOpacity>
  );
};

const TRACK_HEIGHT = 28;
const THUMB_SIZE = 22;
const THUMB_PADDING = 3;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
    marginBottom: spacing.l,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  textContainer: {
    flex: 1,
    paddingRight: spacing.m,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary, // ✅ matches your app
  },
  description: {
    fontSize: 12,
    color: colors.text.secondary, // ✅ matches your app
    marginTop: spacing.xs,
  },
  track: {
    width: 50,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: colors.surfaceLight, // ✅ off state
    padding: THUMB_PADDING,
    justifyContent: 'center',
  },
  trackActive: {
    backgroundColor: colors.primary, // ✅ on state = green
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.text.primary, // ✅ white thumb
    alignSelf: 'flex-start', // left = off
  },
  thumbActive: {
    alignSelf: 'flex-end', // right = on
  },
});
