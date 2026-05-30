// src/features/home/Home.tsx
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';

import { AttendanceButton } from '@/features/home/components/AttendanceButton';
import { NewsCard, NewsItem } from '@/components/NewsCard';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SessionCard } from '@/components/SessionCard';
import { colors } from '@/constants/colors';
import { UserRole } from '@/constants/menuConfig';
import { spacing } from '@/constants/spacing';
import { AppMenu } from '@/features/home/components/AppMenu';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { RootStackParamList } from '@/navigation/types';
import { sessionStorage } from '@/services/sessionStorage';
import { Session } from '@/types/Session';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Dummy data for News & Events
const DUMMY_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'India vs. Australia: Key Takeaways',
    date: 'May 29',
    imageUrl: { uri: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=500&auto=format&fit=crop' },
  },
  {
    id: '2',
    title: 'New Youth Training Program Announced',
    date: 'May 28',
    imageUrl: { uri: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=500&auto=format&fit=crop' },
  },
  {
    id: '3',
    title: 'League Final Weekend Preparation',
    date: 'May 27',
    imageUrl: { uri: 'https://images.unsplash.com/photo-1624526267942-ab0f0b580615?q=80&w=500&auto=format&fit=crop' },
  },
];

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

  // TODO: Replace with actual role from context
  const currentUserRole: UserRole = 'coach';

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadHomeData = async () => {
        setIsLoading(true);
        try {
          const allSessions = await sessionStorage.getSessions();
          const now = new Date();
          const todayDayName = DAYS[now.getDay()];
          const todayDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

          const activeToday = allSessions.filter((session) => {
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

          activeToday.sort(
            (a, b) =>
              parseTimeToTodayDate(a.schedule.startTime).getTime() -
              parseTimeToTodayDate(b.schedule.startTime).getTime()
          );

          let foundUpcoming: Session | null = null;
          for (const session of activeToday) {
            const startTime = parseTimeToTodayDate(session.schedule.startTime);
            const diffMins = (startTime.getTime() - now.getTime()) / 60000;
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
          console.error('Error loading home data', error);
        } finally {
          if (isActive) setIsLoading(false);
        }
      };

      loadHomeData();
      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeHeader />

        {/* ── Attendance Button ── shown only for roles that have Start Session */}
        {(currentUserRole === 'coach' || currentUserRole === 'admin') && (
          <AttendanceButton
            disabled={!upcomingSession}
            sessionName={upcomingSession?.name}
            onPress={() =>
              upcomingSession &&
              navigation.navigate('MarkAttendance', { sessionId: upcomingSession.id })
            }
          />
        )}

        {/* ── App Menu grid ── */}
        <AppMenu currentUserRole={currentUserRole} />

        {/* ── News & Events ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>News & Events</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
          style={styles.newsScrollView}
        >
          {DUMMY_NEWS.map((news) => (
            <NewsCard
              key={news.id}
              news={news}
              onPress={() => console.log('Navigate to news details')}
            />
          ))}
        </ScrollView>

        {/* ── Today's Sessions ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Sessions</Text>
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
    marginBottom: spacing.m,
    marginTop: spacing.m,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  newsScrollView: {
    marginHorizontal: -spacing.m,
  },
  horizontalScrollContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.s,
  },
  emptyContainer: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
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
  },
});