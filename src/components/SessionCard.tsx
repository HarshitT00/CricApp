import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DimensionValue,
  ViewStyle,
  Image,
} from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Session } from '@/types/Session';

interface SessionCardProps {
  session: Session;
  onPress?: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ViewStyle;
}

const STATUS_LABEL: Record<string, string> = {
  LIVE: 'LIVE',
  ONGOING: 'ONGOING',
  UPCOMING: 'UPCOMING',
  COMPLETED: 'COMPLETED',
};

export const SessionCard = ({ session, onPress, width, height = 170, style }: SessionCardProps) => {
  const isLive = session.status === 'LIVE';
  const isOngoing = session.status === 'ONGOING';
  const isActive = isLive || isOngoing;
  
  // The new session type doesn't have images by default, but we check just in case
  const hasImage = !!(session as any).image; 

  // Map the new fields (with fallbacks just in case old dummy data exists)
  const displayTitle = session.name || (session as any).title || 'Unnamed Session';
  const displayLocation = session.facility || (session as any).location || 'Unknown Facility';
  
  // Format the time from the schedule object
  const displayTime = session.schedule?.startTime 
    ? `${session.schedule.date ? session.schedule.date + ' • ' : ''}${session.schedule.startTime}`
    : (session as any).time || 'TBD';

  // Count the assigned batches
  const batchCount = session.batchIds?.length || 0;
  const displayBatch = batchCount > 0 
    ? `${batchCount} ${batchCount === 1 ? 'Batch' : 'Batches'} Assigned`
    : (session as any).batch || 'No batches assigned';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.cardContainer,
        hasImage ? { width: width || '100%', height } : { width: width || '100%' },
        style,
      ]}>
      {hasImage ? (
        <Image source={{ uri: (session as any).image }} style={styles.image} resizeMode="cover" />
      ) : null}
      {hasImage && <View style={styles.overlay} />}
      <View style={[styles.content, !hasImage && styles.contentNoImage]}>
        <View style={styles.topRow}>
          <View style={[styles.badge, isActive && styles.activeBadge]}>
            {isLive && <Text style={styles.liveDot}>● </Text>}
            <Text style={[styles.badgeText, isActive && styles.activeBadgeText]}>
              {STATUS_LABEL[session.status] ?? session.status}
            </Text>
          </View>
          <View style={[styles.iconBox, hasImage && styles.iconBoxOnImage]}>
            <MaterialCommunityIcons name="cricket" size={20} color={colors.primary} />
          </View>
        </View>

        <View>
          <Text style={[styles.title, hasImage && styles.titleOnImage]} numberOfLines={1}>
            {displayTitle}
          </Text>
          <Text style={[styles.batch, hasImage && styles.batchOnImage]} numberOfLines={1}>
            {displayBatch}
          </Text>

          <View style={[styles.divider, !hasImage && styles.dividerNoImage]} />

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons
                name="time-outline"
                size={13}
                color={hasImage ? (colors.text as any).onImage : colors.primary}
              />
              <Text style={[styles.metaText, hasImage && styles.metaTextOnImage]}>
                {displayTime}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons
                name="location-outline"
                size={13}
                color={hasImage ? (colors.text as any).onImage : colors.primary}
              />
              <Text
                style={[styles.metaText, hasImage && styles.metaTextOnImage]}
                numberOfLines={1}>
                {displayLocation}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
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
    backgroundColor: colors.overlay,
  },
  content: {
    flex: 1,
    padding: spacing.m,
    justifyContent: 'space-between',
  },
  contentNoImage: {
    flex: undefined,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeBadge: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  liveDot: {
    color: colors.text.light,
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgeText: {
    color: colors.text.secondary,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  activeBadgeText: {
    color: colors.background,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBoxOnImage: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.borderOnImage,
  },
  title: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  titleOnImage: {
    color: colors.text.light,
  },
  batch: {
    color: colors.text.secondary,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  batchOnImage: {
    color: colors.text.onImageSubtle,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderOnImage,
    marginBottom: spacing.xs,
  },
  dividerNoImage: {
    backgroundColor: colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  metaTextOnImage: {
    color: colors.text.onImage,
  },
});
