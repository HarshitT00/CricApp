import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { AddButton } from '@/components/AddButton';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SearchBar } from '@/components/SearchBar';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { RootStackParamList } from '@/navigation/types';
import { batchStorage } from '@/services/batchStorage';
import { Batch } from '@/types/Batch';

export const BatchesList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBatchName, setNewBatchName] = useState('');

  const loadBatches = async () => {
    setIsLoading(true);
    try {
      const storedBatches = await batchStorage.getBatches();
      setBatches(storedBatches || []);
    } catch (error) {
      console.error('Failed to fetch batches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBatches();
    }, []),
  );

  const handleCreateBatch = async () => {
    if (!newBatchName.trim()) return;

    await batchStorage.saveBatch({
      name: newBatchName.trim(),
      playerIds: [],
    });

    setNewBatchName('');
    setIsModalVisible(false);
    loadBatches();
  };

  // Filter batches based on the search query
  const filteredBatches = batches.filter(batch =>
    (batch?.name || '').toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ScreenWrapper>
      <ScreenHeader title="Training Batches" />

      {/* Added Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search batches..."
        />
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : filteredBatches.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No batches found.</Text>
          <Text style={styles.emptySubText}>Tap the + button to create one.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBatches}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.batchCard}
              onPress={() => {
                navigation.navigate('BatchDetails', { batchId: item.id });
              }}>
              <Text style={styles.batchName}>{item.name}</Text>
              <Text style={styles.playerCount}>
                {item.playerIds.length} {item.playerIds.length === 1 ? 'Player' : 'Players'}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Creation Modal */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Batch</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Morning U-19"
              placeholderTextColor={colors.text.secondary || '#999'}
              value={newBatchName}
              onChangeText={setNewBatchName}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateBatch} style={styles.saveButton}>
                <Text style={styles.saveText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AddButton onPress={() => setIsModalVisible(true)} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: spacing.m,
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
  listContainer: {
    paddingBottom: 100,
  },
  batchCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: spacing.m,
    borderRadius: 12,
    marginBottom: spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batchName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  playerCount: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: spacing.l,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
    padding: spacing.l,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.m,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: spacing.m,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: spacing.l,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.m,
  },
  cancelButton: {
    padding: spacing.m,
  },
  cancelText: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
