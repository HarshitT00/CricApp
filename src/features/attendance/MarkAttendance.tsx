import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { recognizeFace } from 'react-native-facerecognition';

import { TraineeAttendanceRow } from './components/TraineeAttendanceRow';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { RootStackParamList } from '@/navigation/types';
import { batchStorage } from '@/services/batchStorage';
import { playerStorage } from '@/services/playerStorage';
import { sessionStorage } from '@/services/sessionStorage';
import { PlayerInfo } from '@/types/PlayerInfo';
import { Session } from '@/types/Session';

export interface AttendanceTrainee extends PlayerInfo {
  status: 'present' | 'absent' | 'pending';
}

export const MarkAttendance = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'MarkAttendance'>>();
  const { sessionId } = route.params;

  const [session, setSession] = useState<Session | null>(null);
  const [trainees, setTrainees] = useState<AttendanceTrainee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const allSessions = await sessionStorage.getSessions();
          const currentSession = allSessions.find(s => s.id === sessionId);
          if (!currentSession) return;
          setSession(currentSession);

          const allBatches = await batchStorage.getBatches();
          const sessionBatches = allBatches.filter(b => currentSession.batchIds.includes(b.id));

          const playerIds = new Set<string>();
          sessionBatches.forEach(batch => {
            batch.playerIds.forEach(id => playerIds.add(id));
          });

          const allPlayers = await playerStorage.getPlayers();
          const sessionPlayers = allPlayers.filter(p => playerIds.has(p.id));
          
          setTrainees(
            sessionPlayers.map(p => ({ ...p, status: 'pending' }))
          );

        } catch (error) {
          console.error("Failed to load attendance data", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadData();
    }, [sessionId])
  );

  const handleStatusChange = async (traineeId: string, newStatus: AttendanceTrainee['status']) => {
    if (newStatus === 'present') {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permission Required', 'Camera permission is required to verify attendance.');
        return;
      }

      try {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'], 
          allowsEditing: false,
          quality: 0.85,
        });

        if (!result.canceled && result.assets.length > 0) {
          const imagePath = result.assets[0].uri;
          const trainee = trainees.find(t => t.id === traineeId);
          
          // Call the custom facial recognition library
          const recognizedName = await recognizeFace(imagePath);
          
          if (recognizedName === trainee?.name) {
            Alert.alert('Verification Successful', 'Face matched successfully.');
            setTrainees(prev =>
              prev.map(t => (t.id === traineeId ? { ...t, status: 'present' } : t))
            );
          } else {
            Alert.alert('Verification Failed', 'Face did not match the selected trainee.');
          }
        }
      } catch (error) {
        console.error("Face recognition error:", error);
        Alert.alert('Error', 'Face recognition failed. Please try again.');
      }
    } else {
      setTrainees(prev =>
        prev.map(t => (t.id === traineeId ? { ...t, status: newStatus } : t))
      );
    }
  };

  const handleSaveAttendance = () => {
    navigation.goBack();
  };

  const displayTime = session?.schedule?.startTime 
    ? `${session.schedule.date ? session.schedule.date + ' • ' : ''}${session.schedule.startTime}`
    : 'Time TBD';

  if (isLoading || !session) {
    return (
      <ScreenWrapper>
        <ScreenHeader title="Mark Attendance" leftIconName="arrow-back" onLeftPress={() => navigation.goBack()} />
        <View style={styles.centerContainer}><ActivityIndicator size="large" color={colors.primary} /></View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScreenHeader
        title="Mark Attendance"
        leftIconName="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.sessionCard}>
        <Text style={styles.sessionTitle}>{session.name}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={18} color={colors.text.secondary} />
            <Text style={styles.metaText}>{displayTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={18} color={colors.text.secondary} />
            <Text style={styles.metaText}>{session.facility}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rosterHeader}>
        <Text style={styles.rosterTitle}>
          Trainees ({trainees.filter(t => t.status === 'present').length}/{trainees.length})
        </Text>
      </View>

      {trainees.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No trainees enrolled.</Text>
          <Text style={styles.emptySubText}>Add players to the batches assigned to this session.</Text>
        </View>
      ) : (
        <FlatList
          data={trainees}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TraineeAttendanceRow
              trainee={item} 
              status={item.status}
              onStatusChange={status => handleStatusChange(item.id, status)}
            />
          )}
        />
      )}

      {trainees.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAttendance}>
            <Text style={styles.saveBtnText}>Save Attendance</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: colors.text.primary, fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  emptySubText: { color: colors.text.secondary, fontSize: 14, textAlign: 'center', paddingHorizontal: spacing.xl },
  sessionCard: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    minHeight: 120,
    justifyContent: 'center',
    borderRadius: spacing.borderRadius,
    marginBottom: spacing.l,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sessionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.m,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.l,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 15,
    color: colors.text.secondary,
  },
  rosterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  rosterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  listContainer: {
    paddingBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.m,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  saveBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: spacing.borderRadius,
    alignItems: 'center',
  },
  saveBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});