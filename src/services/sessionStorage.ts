import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@/types/Session';

const SESSIONS_KEY = '@cricapp_sessions';

export const sessionStorage = {
  getSessions: async (): Promise<Session[]> => {
    try {
      const data = await AsyncStorage.getItem(SESSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting sessions', error);
      return [];
    }
  },

  saveSession: async (session: Omit<Session, 'id'> & { id?: string }): Promise<void> => {
    try {
      const sessions = await sessionStorage.getSessions();
      
      const newSession = { 
        ...session, 
        id: session.id || `session_${Date.now()}`,
        status: session.status || 'UPCOMING'
      } as Session;
      
      const existingIndex = sessions.findIndex(s => s.id === newSession.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = newSession; 
      } else {
        sessions.push(newSession); 
      }
      
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving session', error);
      throw error;
    }
  }
};