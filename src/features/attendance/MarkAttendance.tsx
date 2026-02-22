import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SessionCard } from '@/components/SessionCard';
import { TraineeAttendanceRow } from '@/features/attendance/components/TraineeAttendanceRow';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Player } from '@/types/Player';
import { Session } from '@/types/Session';

// --- MOCK DATA ---
const MOCK_TRAINEES: Player[] = [
  { id: '1', name: 'Rahul D.', role: 'Wicket Keeper', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
  { id: '2', name: 'Virat K.', role: 'Batsman', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
  { id: '3', name: 'Jasprit B.', role: 'Bowler', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
  { id: '4', name: 'Hardik P.', role: 'All Rounder', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
  { id: '5', name: 'Rohit S.', role: 'Batsman', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
];

const MOCK_SESSION: Session = {
  id: 's1',
  title: 'Morning Net Session',
  batch: 'Under-19 Elite Batch',
  time: '07:00 - 09:00 AM',
  location: 'Oval Ground A',
  status: 'ONGOING',
  image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=2067',
};

type AttendanceStatus = 'PRESENT' | 'ABSENT';

export const MarkAttendance = () => {
  const navigation = useNavigation();
  const [attendanceState, setAttendanceState] = useState<Record<string, AttendanceStatus>>({});

  const handleMarkTrainee = (id: string, status: AttendanceStatus) => {
    setAttendanceState(prev => ({ ...prev, [id]: status }));
  };

  const markedCount = Object.keys(attendanceState).length;

  return (
    <ScreenWrapper>
      <ScreenHeader
        title="Mark Attendance"
        leftIconName="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <SessionCard session={MOCK_SESSION} style={styles.sessionCard} />
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <MaterialCommunityIcons name="qrcode-scan" size={18} color={colors.text.primary} />
            <Text style={styles.actionBtnText}>Scan QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <MaterialCommunityIcons name="face-recognition" size={18} color={colors.text.primary} />
            <Text style={styles.actionBtnText}>Face ID</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.studentsHeader}>
          <Text style={styles.studentsTitle}>Students ({MOCK_TRAINEES.length})</Text>
          <View style={styles.markedPill}>
            <Text style={styles.markedPillText}>{markedCount}/{MOCK_TRAINEES.length} Marked</Text>
          </View>
        </View>

        <FlatList
          data={MOCK_TRAINEES}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TraineeAttendanceRow
              trainee={item}
              status={attendanceState[item.id] || null}
              onMarkPresent={() => handleMarkTrainee(item.id, 'PRESENT')}
              onMarkAbsent={() => handleMarkTrainee(item.id, 'ABSENT')}
            />
          )}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            console.log('Saved Attendance Data:', attendanceState);
            navigation.goBack();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit Attendance</Text>
          <View style={styles.submitCountBadge}>
            <Text style={styles.submitCountText}>{markedCount}/{MOCK_TRAINEES.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  sessionCard: {
    marginBottom: spacing.s,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.s,
    marginBottom: spacing.m,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    borderRadius: spacing.borderRadius,
  },
  actionBtnText: {
    color: colors.text.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  studentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  studentsTitle: {
    color: colors.text.primary,
    fontSize: 17,
    fontWeight: 'bold',
  },
  markedPill: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  markedPillText: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
  },

  listContent: {
    paddingBottom: spacing.xxl + 80,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.screenPadding,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: spacing.borderRadius,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  submitButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitCountBadge: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  submitCountText: {
    color: colors.background,
    fontSize: 13,
    fontWeight: 'bold',
  },
});