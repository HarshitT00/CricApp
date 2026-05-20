import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';

import { AddButton } from '@/components/AddButton';
import { PlayerCard } from '@/components/PlayerCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SearchBar } from '@/components/SearchBar';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { RootStackParamList } from '@/navigation/types';
import { playerStorage } from '@/services/playerStorage';
import { PlayerInfo } from '@/types/PlayerInfo';

export const PlayersList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadPlayers = async () => {
        setIsLoading(true);
        try {
          const storedPlayers = await playerStorage.getPlayers();
          if (isActive) {
            setPlayers(storedPlayers || []);
          }
        } catch (error) {
          console.error('Failed to fetch players:', error);
        } finally {
          if (isActive) setIsLoading(false);
        }
      };

      loadPlayers();
      return () => {
        isActive = false;
      };
    }, []),
  );

  const handleRegisterPlayer = () => {
    navigation.navigate('RegisterPlayer');
  };

  const handlePlayerPress = (player: PlayerInfo) => {
    navigation.navigate('RegisterPlayer', { playerInfo: player });
  };

  const filteredPlayers = players.filter(player =>
    (player?.name || '').toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ScreenWrapper>
      <ScreenHeader title="Players Roster" />

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by player name..."
        />
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : filteredPlayers.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No players found.</Text>
          <Text style={styles.emptySubText}>Tap the + button to register one.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPlayers}
          keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
          renderItem={({ item }) => (
            <PlayerCard player={item as any} onPress={() => handlePlayerPress(item)} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <AddButton onPress={handleRegisterPlayer} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: spacing.m,
  },
  listContainer: {
    paddingBottom: 100, // Extra padding for FAB
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
});
