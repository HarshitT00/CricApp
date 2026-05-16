import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { PlayerInfo } from '@/types/PlayerInfo';

interface PlayerCardProps {
  player: PlayerInfo;
  onPress?: () => void;
}

export const PlayerCard = ({ player, onPress }: PlayerCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: player.image }} style={styles.image} />
      </View>

      {/* Player Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {player.name}
        </Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{player.role}</Text>
        </View>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface, // Uses the slightly lighter green surface from your theme
    padding: spacing.m,
    borderRadius: 16,
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: colors.border, // Uses your theme's subtle border
  },
  imageContainer: {
    padding: 2,
    borderRadius: 30,
    backgroundColor: colors.primaryLight, // Gives a dark green ring around the image
    marginRight: spacing.m,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceLight,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  roleBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary, // Neon green text
    textTransform: 'uppercase',
  },
});
