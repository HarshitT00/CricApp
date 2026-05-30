import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { PlayerCard } from '@/components/PlayerCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SelectPlayersModal } from '@/components/SelectPlayersModal'; // <-- Reusable component!
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { RootStackParamList } from '@/navigation/types';
import { batchStorage } from '@/services/batchStorage';
import { playerStorage } from '@/services/playerStorage';
import { Batch } from '@/types/Batch';
import { PlayerInfo } from '@/types/PlayerInfo';

export const BatchDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BatchDetails'>>();
  const { batchId } = route.params;

  const [batch, setBatch] = useState<Batch | null>(null);
  const [allPlayers, setAllPlayers] = useState<PlayerInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempSelectedPlayerIds, setTempSelectedPlayerIds] = useState<string[]>([]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const batches = await batchStorage.getBatches();
      const currentBatch = batches.find(b => b.id === batchId);
      const players = await playerStorage.getPlayers();

      setBatch(currentBatch || null);
      setAllPlayers(players || []);
    } catch (error) {
      console.error('Failed to load batch details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [batchId]),
  );

  const openAddPlayersModal = () => {
    setTempSelectedPlayerIds(batch?.playerIds || []);
    setIsModalVisible(true);
  };

  const togglePlayerSelection = (playerId: string) => {
    setTempSelectedPlayerIds(prev =>
      prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId],
    );
  };

  const handleSavePlayers = async () => {
    if (!batch) return;
    const updatedBatch = { ...batch, playerIds: tempSelectedPlayerIds };
    await batchStorage.saveBatch(updatedBatch);
    setIsModalVisible(false);
    loadData();
  };

  const handlePlayerPress = (player: PlayerInfo) => {
    navigation.navigate('RegisterPlayer', { playerInfo: player });
  };

  if (isLoading || !batch) {
    return (
      <ScreenWrapper>
        <ScreenHeader
          title="Loading..."
          leftIconName="close"
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  const enrolledPlayers = allPlayers.filter(p => batch.playerIds.includes(p.id));

  return (
    <ScreenWrapper>
      <ScreenHeader
        title={batch.name}
        leftIconName="close"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {enrolledPlayers.length} {enrolledPlayers.length === 1 ? 'Player' : 'Players'} Enrolled
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={openAddPlayersModal}>
          <Ionicons name="person-add" size={18} color="black" />
          <Text style={styles.addButtonText}>Manage</Text>
        </TouchableOpacity>
      </View>

      {enrolledPlayers.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No players in this batch.</Text>
          <Text style={styles.emptySubText}>Tap 'Manage' to add players from your roster.</Text>
        </View>
      ) : (
        <FlatList
          data={enrolledPlayers}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <PlayerCard player={item as any} onPress={() => handlePlayerPress(item)} />
          )}
        />
      )}

      {/* The extracted modal component makes this perfectly clean! */}
      <SelectPlayersModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSavePlayers}
        allPlayers={allPlayers}
        selectedIds={tempSelectedPlayerIds}
        onToggleSelection={togglePlayerSelection}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: colors.text.primary, fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  emptySubText: { color: colors.text.secondary, fontSize: 14 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
    paddingHorizontal: spacing.s,
  },
  statsText: { fontSize: 16, fontWeight: '600', color: colors.text.primary },
  addButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    gap: 6,
  },
  addButtonText: { color: 'black', fontWeight: '600', fontSize: 14 },
  listContainer: { paddingBottom: spacing.xxl },
});
