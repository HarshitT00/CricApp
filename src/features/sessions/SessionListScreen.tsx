import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SessionCard } from '@/components/SessionCard';
import { spacing } from '@/constants/spacing';
import { Session } from '@/types/Session';

const ALL_SESSIONS: Session[] = [
  {
    id: '1', 
    title: 'U16 Nets Practice', 
    location: 'Pitch 3, North Wing', 
    time: '07:00 AM', 
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067', 
    status: 'UPCOMING' 
  },
  {
    id: '2', 
    title: 'Fielding Drills', 
    location: 'Main Ground', 
    time: '09:30 AM', 
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2067', 
    status: 'UPCOMING' 
  },
  {
    id: '3', 
    title: 'Match Simulation', 
    location: 'Pitch 1', 
    time: '02:00 PM', 
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=2067', 
    status: 'UPCOMING' 
  },
];

export const SessionListScreen = () => {
  return (
    <ScreenWrapper>
      <FlatList
        data={ALL_SESSIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.m }} />}
        renderItem={({ item }) => (
          <SessionCard 
            session={item} 
            height={150} // Reduced length (from default 180)
          />
        )}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.s,
    paddingTop: spacing.m,
    paddingBottom: 100,
  },
});