import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, DimensionValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Session } from '@/types/Session';

interface SessionCardProps {
  session: Session;
  onPress?: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
}

export const SessionCard = ({ session, onPress, width, height = 180 }: SessionCardProps) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onPress}
      // Apply the height prop here
      style={[styles.cardContainer, { width: width || '100%', height }]} 
    >
      <Image 
        source={{ uri: session.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <View style={[styles.badge, session.status === 'LIVE' && styles.liveBadge]}>
          <Text style={styles.badgeText}>
            {session.status === 'LIVE' ? '● LIVE' : session.status}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1}>{session.title}</Text>
            <View style={styles.row}>
              <Ionicons name="location-sharp" size={14} color={colors.text.secondary} />
              <Text style={styles.location} numberOfLines={1}>{session.location}</Text>
            </View>
          </View>
          <Text style={styles.time}>{session.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // Height is now handled via style prop in component
    borderRadius: spacing.borderRadius,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    padding: spacing.l,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveBadge: {
    backgroundColor: '#FF3B30',
  },
  badgeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  infoContainer: {
    flex: 1,
    marginRight: spacing.m,
  },
  title: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: colors.text.secondary,
    marginLeft: 4,
    fontSize: 14,
  },
  time: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});