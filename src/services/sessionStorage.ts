import AsyncStorage from '@react-native-async-storage/async-storage';

import { Session } from '@/types/Session';

const SESSIONS_KEY = '@cricapp_sessions';

/**
 * Helper to check if a session is past its scheduled end time.
 */
const checkIsCompleted = (session: Session): boolean => {
  // If it's already completed, ignore it
  if (session.status === 'COMPLETED') return true;

  const now = new Date();
  const schedule = session.schedule;
  
  // For repeating sessions, we check the endDate. For single sessions, we check the date.
  const dateStr = schedule.isRepeating ? schedule.endDate : schedule.date;
  
  // If no date is set (e.g., a repeating session with no end date), it never auto-completes
  if (!dateStr) return false; 

  const targetDate = new Date(dateStr);
  if (isNaN(targetDate.getTime())) return false; // Failsafe for invalid dates

  // Parse the exact end time if it exists (e.g., "05:00 PM" or "17:00")
  if (schedule.endTime) {
    const timeMatch = schedule.endTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    
    if (timeMatch) {
      let [_, hours, minutes, ampm] = timeMatch;
      let h = parseInt(hours, 10);
      const m = parseInt(minutes, 10);
      
      if (ampm) {
        if (ampm.toUpperCase() === 'PM' && h < 12) h += 12;
        if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
      }
      
      targetDate.setHours(h, m, 0, 0);
    } else {
      // If we can't parse the time, default to 11:59 PM to be safe
      targetDate.setHours(23, 59, 59, 999);
    }
  } else {
    // If no end time was provided, it completes at midnight
    targetDate.setHours(23, 59, 59, 999);
  }

  // Auto-complete if the current time is strictly greater than the target end time
  return now > targetDate;
};


export const sessionStorage = {
  getSessions: async (): Promise<Session[]> => {
    try {
      const data = await AsyncStorage.getItem(SESSIONS_KEY);
      if (!data) return [];
      
      let sessions: Session[] = JSON.parse(data);
      let hasUpdates = false;

      // Map through and dynamically mark expired sessions as COMPLETED
      sessions = sessions.map(session => {
        if (session.status !== 'COMPLETED' && checkIsCompleted(session)) {
          hasUpdates = true;
          return { ...session, status: 'COMPLETED' };
        }
        return session;
      });

      // If any sessions automatically changed status, save the new list back to storage
      if (hasUpdates) {
        await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
      }

      return sessions;
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