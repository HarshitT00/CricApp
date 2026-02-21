import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useMemo, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SessionCard } from '@/components/SessionCard';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { RootStackParamList } from '@/navigation/types';
import { Session } from '@/types/Session';

import { CreateSessionFab } from './components/CreateSessionFab';
import { SessionTabs, SessionTabOption } from './components/SessionTabs';

const ALL_SESSIONS: Session[] = [
  {
    id: '1',
    title: 'U16 Match Day',
    location: 'Main Stadium',
    time: 'NOW',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067',
    status: 'LIVE',
  },
  {
    id: '2',
    title: 'Batting Drills',
    location: 'Nets Area 2',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=2067',
    status: 'UPCOMING',
  },
  {
    id: '3',
    title: 'Fitness Test',
    location: 'Gym',
    time: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2067',
    status: 'COMPLETED',
  },
  {
    id: '4',
    title: 'Strategy Meeting',
    location: 'Conf Room',
    time: 'Last Week',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067',
    status: 'COMPLETED',
  },
];

export const SessionListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<SessionTabOption>('Active');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const filteredSessions = useMemo(() => {
    if (activeTab === 'Active') {
      return ALL_SESSIONS.filter(s => s.status === 'LIVE' || s.status === 'UPCOMING').sort(a =>
        a.status === 'LIVE' ? -1 : 1,
      );
    } else {
      return ALL_SESSIONS.filter(s => s.status === 'COMPLETED');
    }
  }, [activeTab]);

  const handleCreateSession = () => {
    navigation.navigate('CreateSession');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="All Sessions"
          leftIconName="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />

        <SessionTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <FlatList
          data={filteredSessions}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: spacing.m }} />}
          renderItem={({ item }) => <SessionCard session={item} height={150} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} sessions found.</Text>
          }
        />

        <CreateSessionFab onPress={handleCreateSession} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.xs,
    paddingBottom: 100,
  },
  emptyText: {
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
