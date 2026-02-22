import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ScreenHeader } from '@/components/ScreenHeader';
import { CustomToggle } from '@/components/CustomToggle';
import { TraineeAttendanceRow } from '@/features/attendance/components/TraineeAttendanceRow';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Player } from '@/types/Player';

// --- MOCK DATA ---
const MOCK_TRAINEES: Player[] = [
  { id: '1', name: 'Arjun Singh', role: 'Batsman', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
  { id: '2', name: 'Rahul Sharma', role: 'Bowler', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
  { id: '3', name: 'Vikram Patel', role: 'All Rounder', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
  { id: '4', name: 'Ravi Kumar', role: 'Wicket Keeper', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
  { id: '5', name: 'Samir Desai', role: 'Batsman', image: '', country: 'IN', stats: { matches: 0, runs: 0, wickets: 0 } },
];

export const MarkAttendance = () => {
  const navigation = useNavigation();
  
  const [attendanceState, setAttendanceState] = useState<Record<string, 'PRESENT' | 'ABSENT'>>({});
  const [isAllPresent, setIsAllPresent] = useState(false);

  const handleToggleAll = (value: boolean) => {
    setIsAllPresent(value);
    const newState: Record<string, 'PRESENT' | 'ABSENT'> = {};
    MOCK_TRAINEES.forEach(t => {
      newState[t.id] = value ? 'PRESENT' : 'ABSENT';
    });
    setAttendanceState(newState);
  };

  const handleMarkTrainee = (id: string, status: 'PRESENT' | 'ABSENT') => {
    setAttendanceState(prev => ({ ...prev, [id]: status }));
    if (status === 'ABSENT') setIsAllPresent(false);
  };

  const presentCount = Object.values(attendanceState).filter(s => s === 'PRESENT').length;

  return (
    <ScreenWrapper>
      <ScreenHeader 
        title="Mark Attendance" 
        leftIconName="arrow-back" 
        onLeftPress={() => navigation.goBack()} 
      />

      <View style={styles.content}>
        <View style={styles.summaryBox}>
          <Text style={styles.sessionTitle}>U16 Nets Practice</Text>
          <Text style={styles.presentCount}>
            <Text style={styles.highlight}>{presentCount}</Text> / {MOCK_TRAINEES.length} Present
          </Text>
        </View>

        <CustomToggle 
          label="Mark All Present" 
          value={isAllPresent} 
          onValueChange={handleToggleAll} 
        />

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
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 80, 
  },
  summaryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    padding: spacing.m,
    borderRadius: spacing.borderRadius,
    marginBottom: spacing.l,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sessionTitle: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  presentCount: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  highlight: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingTop: spacing.s,
    paddingBottom: spacing.xxl,
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
  },
  submitButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});