import AsyncStorage from '@react-native-async-storage/async-storage';

import { PlayerInfo } from '@/types/PlayerInfo';

const PLAYERS_KEY = '@cricapp_players';

export const playerStorage = {
  // Fetch all players
  getPlayers: async (): Promise<PlayerInfo[]> => {
    try {
      const data = await AsyncStorage.getItem(PLAYERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting players', error);
      return [];
    }
  },

  // Save a new player or update an existing one
  savePlayer: async (player: Omit<PlayerInfo, 'id'> & { id?: string }): Promise<void> => {
    try {
      const players = await playerStorage.getPlayers();

      // If no ID exists, generate a unique one using timestamp
      const newPlayer = { ...player, id: player.id || `player_${Date.now()}` } as PlayerInfo;

      const existingIndex = players.findIndex(p => p.id === newPlayer.id);

      if (existingIndex >= 0) {
        players[existingIndex] = newPlayer; // Edit mode
      } else {
        players.push(newPlayer); // Create mode
      }

      await AsyncStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    } catch (error) {
      console.error('Error saving player', error);
      throw error;
    }
  },

  // Delete a player (for later use)
  deletePlayer: async (id: string): Promise<void> => {
    try {
      const players = await playerStorage.getPlayers();
      const filteredPlayers = players.filter(p => p.id !== id);
      await AsyncStorage.setItem(PLAYERS_KEY, JSON.stringify(filteredPlayers));
    } catch (error) {
      console.error('Error deleting player', error);
      throw error;
    }
  },
};
