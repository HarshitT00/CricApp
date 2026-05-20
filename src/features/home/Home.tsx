import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SessionCard } from '@/components/SessionCard';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { AttendanceButton } from '@/features/home/components/AttendanceButton';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { StatsGrid } from '@/features/home/components/StatsGrid';
import { RootStackParamList } from '@/navigation/types';
import { sessionStorage } from '@/services/sessionStorage';
import { Session } from '@/types/Session';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const parseTimeToTodayDate = (timeStr: string): Date => {
  const now = new Date();
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (match) {
    let [_, h, m, ampm] = match;
    let hours = parseInt(h, 10);
    const mins = parseInt(m, 10);
    if (ampm) {
      if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
      if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
    }
    now.setHours(hours, mins, 0, 0);
  }
  return now;
};

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const [todaySessions, setTodaySessions] = useState<Session[]>([]);
  const [upcomingSession, setUpcomingSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadHomeData = async () => {
        setIsLoading(true);
        try {
          const allSessions = await sessionStorage.getSessions();
          const now = new Date();
          const todayDayName = DAYS[now.getDay()];
          
          // Formats today as YYYY-MM-DD reliably
          const todayDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

          // 1. Filter for sessions happening specifically today
          const activeToday = allSessions.filter(session => {
            if (session.status === 'COMPLETED') return false;
            
            if (session.schedule.isRepeating) {
              if (!session.schedule.selectedDays.includes(todayDayName)) return false;
              if (session.schedule.startDate && new Date(session.schedule.startDate) > now) return false;
              if (session.schedule.endDate && new Date(session.schedule.endDate) < now) return false;
              return true;
            } else {
              return session.schedule.date === todayDateStr;
            }
          });

          // 2. Sort them chronologically by time
          activeToday.sort((a, b) => 
            parseTimeToTodayDate(a.schedule.startTime).getTime() - parseTimeToTodayDate(b.schedule.startTime).getTime()
          );

          // 3. Find if the NEXT session is within 30 minutes (or already running)
          let foundUpcoming = null;
          for (const session of activeToday) {
            const startTime = parseTimeToTodayDate(session.schedule.startTime);
            const diffMins = (startTime.getTime() - now.getTime()) / 60000;
            
            // If it starts in 30 mins or less, OR it already started and hasn't been marked COMPLETED
            if (diffMins <= 30) {
              foundUpcoming = session;
              break; 
            }
          }

          if (isActive) {
            setTodaySessions(activeToday);
            setUpcomingSession(foundUpcoming);
          }

        } catch (error) {
          console.error("Error loading home data", error);
        } finally {
          if (isActive) setIsLoading(false);
        }
      };

      loadHomeData();
      return () => { isActive = false; };
    }, [])
  );

  return (
    <ScreenWrapper>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <HomeHeader />

        <StatsGrid />

        {/* Dynamic Attendance Button */}
        <AttendanceButton 
          onPress={() => {
            if (upcomingSession) {
              navigation.navigate('MarkAttendance', { sessionId: upcomingSession.id });
            }
          }} 
          disabled={!upcomingSession}
          sessionName={upcomingSession?.name}
        />

        {/* Today's Schedule */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <Text style={styles.sectionSubtitle}>
            {todaySessions.length} {todaySessions.length === 1 ? 'Session' : 'Sessions'}
          </Text>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        ) : todaySessions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You have a clear schedule today.</Text>
            <Text style={styles.emptySubText}>Take a rest, or schedule a new session!</Text>
          </View>
        ) : (
          todaySessions.map((session) => (
            <SessionCard 
              key={session.id} 
              session={session} 
              height={140} 
              style={{ marginBottom: spacing.m }}
              onPress={() => navigation.navigate('CreateSession', { sessionInfo: session } as any)}
            />
          ))
        )}
        
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.m,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyContainer: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: spacing.s,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.text.secondary,
  }
});