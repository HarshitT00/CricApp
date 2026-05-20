import AsyncStorage from '@react-native-async-storage/async-storage';

import { Batch } from '@/types/Batch';

const BATCHES_KEY = '@cricapp_batches';

export const batchStorage = {
  getBatches: async (): Promise<Batch[]> => {
    try {
      const data = await AsyncStorage.getItem(BATCHES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting batches', error);
      return [];
    }
  },

  // Save a new batch or update an existing one
  saveBatch: async (batch: Omit<Batch, 'id'> & { id?: string }): Promise<void> => {
    try {
      const batches = await batchStorage.getBatches();

      const newBatch = {
        ...batch,
        id: batch.id || `batch_${Date.now()}`,
        playerIds: batch.playerIds || [],
      } as Batch;

      const existingIndex = batches.findIndex(b => b.id === newBatch.id);

      if (existingIndex >= 0) {
        batches[existingIndex] = newBatch; // Edit mode
      } else {
        batches.push(newBatch); // Create mode
      }

      await AsyncStorage.setItem(BATCHES_KEY, JSON.stringify(batches));
    } catch (error) {
      console.error('Error saving batch', error);
      throw error;
    }
  },
};
