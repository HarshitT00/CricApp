import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Session } from '@/types/Session';

interface SessionListProps {
  sessions: Session[];
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85; 
const SPACING_GAP = spacing.m;

export const SessionCard = ({ sessions }: SessionListProps) => {
  
  const renderItem = ({ item }: { item: Session }) => (
    <View style={styles.cardContainer}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.image}
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.row}>
              <Ionicons name="location-sharp" size={14} color={colors.text.secondary} />
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatList} 
        contentContainerStyle={styles.listContent}
        snapToInterval={CARD_WIDTH + SPACING_GAP} 
        decelerationRate="fast"
        ItemSeparatorComponent={() => <View style={{ width: SPACING_GAP }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: -spacing.screenPadding, 
    flexGrow: 0,
  },
  listContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.s,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: 180,
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