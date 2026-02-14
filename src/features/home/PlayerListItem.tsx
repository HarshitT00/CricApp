import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Player } from '@/types/Player';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface Props {
  player: Player;
  onPress: (player: Player) => void;
}

export const PlayerListItem = ({ player, onPress }: Props) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(player)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: player.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{player.name}</Text>
        <Text style={styles.role}>{player.country} • {player.role}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.l,
    marginBottom: spacing.m,
    borderRadius: spacing.borderRadius,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: colors.surface 
  },
  info: { 
    flex: 1, 
    marginLeft: spacing.l 
  },
  name: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: colors.text.primary 
  },
  role: { 
    fontSize: 14, 
    color: colors.text.secondary,
    marginTop: 2
  },
  arrow: { 
    fontSize: 24, 
    color: colors.border, 
    fontWeight: '300' 
  },
});