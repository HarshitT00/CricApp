import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { PlayerListItem } from '@/components/player/PlayerListItem';
import { Player } from '@/types/Player';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

const PLAYERS: Player[] = [
  { id: '1', name: 'Virat Kohli', country: 'India', role: 'Batsman', image: 'https://placehold.co/100', stats: { matches: 250, runs: 12000, wickets: 4 } },
  { id: '2', name: 'Steve Smith', country: 'Australia', role: 'Batsman', image: 'https://placehold.co/100', stats: { matches: 140, runs: 8000, wickets: 17 } },
  { id: '3', name: 'Jasprit Bumrah', country: 'India', role: 'Bowler', image: 'https://placehold.co/100', stats: { matches: 70, runs: 50, wickets: 150 } },
];

export function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenWrapper> 
      <FlatList
        data={PLAYERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlayerListItem 
            player={item} 
            onPress={(p) => navigation.navigate('PlayerDetail', { player: p })} 
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>CricApp</Text>
            <Text style={styles.subtitle}>Live Scores & Stats</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.xl,
  },
  header: { 
    marginTop: spacing.s,
    marginBottom: spacing.l, 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: { 
    fontSize: 16, 
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});