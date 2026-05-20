import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useMemo, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { AddButton } from '@/components/AddButton';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SessionCard } from '@/components/SessionCard';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { SessionTabOption, SessionTabs } from '@/features/sessions/components/SessionTabs';
import { RootStackParamList } from '@/navigation/types';
import { sessionStorage } from '@/services/sessionStorage';
import { Session } from '@/types/Session';

export const SessionList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<SessionTabOption>('Active');
  
  // Real Data State
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Fetch from storage whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const loadSessions = async () => {
        setIsLoading(true);
        try {
          const storedSessions = await sessionStorage.getSessions();
          setSessions(storedSessions || []);
        } catch (error) {
          console.error("Failed to load sessions:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadSessions();
    }, [])
  );

  // Filter based on active tab
  const filteredSessions = useMemo(() => {
    if (activeTab === 'Active') {
      return sessions
        .filter(s => s.status === 'LIVE' || s.status === 'UPCOMING' || s.status === 'ONGOING')
        .sort((a, b) => (a.status === 'LIVE' ? -1 : 1));
    } else {
      return sessions.filter(s => s.status === 'COMPLETED');
    }
  }, [activeTab, sessions]);

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

        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredSessions}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: spacing.m }} />}
            renderItem={({ item }) => <SessionCard session={item} height={150} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No {activeTab.toLowerCase()} sessions found.</Text>
                {activeTab === 'Active' && (
                  <Text style={styles.emptySubText}>Tap the + button to create one!</Text>
                )}
              </View>
            }
          />
        )}

        <AddButton onPress={handleCreateSession} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.xs,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubText: {
    color: colors.primary,
    fontSize: 14,
    marginTop: 8,
  }
});