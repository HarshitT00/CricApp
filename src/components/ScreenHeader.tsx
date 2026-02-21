import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface ScreenHeaderProps {
  title: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  onLeftPress?: () => void;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  leftIconName,
  onLeftPress,
  rightIconName,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Icon Button */}
      {leftIconName && onLeftPress && (
        <TouchableOpacity
          onPress={onLeftPress}
          style={[styles.sideComponent, styles.leftComponent]}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} // Increased hitSlop for easy tapping
        >
          <Ionicons name={leftIconName} size={28} color={colors.text.primary} />
        </TouchableOpacity>
      )}

      {/* Center Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Right Icon Button */}
      {rightIconName && onRightPress && (
        <TouchableOpacity
          onPress={onRightPress}
          style={[styles.sideComponent, styles.rightComponent]}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
          <Ionicons name={rightIconName} size={28} color={colors.text.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.s,
    marginBottom: spacing.m,
    position: 'relative',
    // We can keep the padding for the title, but the absolute icons will ignore it
    paddingHorizontal: spacing.screenPadding,
  },
  sideComponent: {
    position: 'absolute',
    zIndex: 10,
    // Removed the padding: 4 from here so the icon sits flush
  },
  leftComponent: {
    // Changed from spacing.screenPadding (20) to spacing.m (12) or spacing.l (16) to push it left
    left: spacing.l,
  },
  rightComponent: {
    // Changed to match the left side, pushing it further right
    right: spacing.l,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
});
