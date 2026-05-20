import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { AttendanceTrainee } from '@/features/attendance/MarkAttendance'; 

interface Props {
  trainee: AttendanceTrainee; 
  status: 'present' | 'absent' | 'pending';
  onStatusChange: (status: 'present' | 'absent') => void;
}

export const TraineeAttendanceRow = ({ trainee, status, onStatusChange }: Props) => {
  // Check if the trainee has a valid image URL
  const hasImage = !!trainee.image;

  return (
    <View style={styles.container}>
      <View style={styles.infoCol}>
        
        {/* Render Image or Fallback */}
        {hasImage ? (
          <Image source={{ uri: trainee.image }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>
              {trainee.name ? trainee.name.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
        )}

        <View>
          <Text style={styles.name}>{trainee.name}</Text>
          <Text style={styles.role}>{trainee.role || 'Player'}</Text>
        </View>
      </View>

      <View style={styles.actionsCol}>
        <TouchableOpacity
          style={[styles.statusBtn, status === 'present' && styles.presentActive]}
          onPress={() => onStatusChange('present')}
        >
          <Text style={[styles.statusText, status === 'present' && styles.activeText]}>P</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.statusBtn, status === 'absent' && styles.absentActive]}
          onPress={() => onStatusChange('absent')}
        >
          <Text style={[styles.statusText, status === 'absent' && styles.activeText]}>A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: spacing.m,
    borderRadius: 12,
    marginBottom: spacing.s,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
  },
  // Added style for the actual image
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceLight,
  },
  // Renamed from 'avatar' to clearly distinguish the fallback
  avatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  role: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  actionsCol: {
    flexDirection: 'row',
    gap: 12,
  },
  statusBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text.secondary,
  },
  presentActive: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  absentActive: { backgroundColor: '#F44336', borderColor: '#F44336' },
  activeText: { color: 'black' },
});