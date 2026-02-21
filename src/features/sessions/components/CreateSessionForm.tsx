import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

import { CreateSessionDetailsSection } from './CreateSessionDetailsSection';
import { CreateSessionScheduleSection } from './CreateSessionScheduleSection';

interface CreateSessionFormProps {
  onSubmit: (sessionData: any) => void;
}

export const CreateSessionForm: React.FC<CreateSessionFormProps> = ({ onSubmit }) => {
  // Session Details State
  const [name, setName] = useState('');
  const [facility, setFacility] = useState('');

  // Schedule State
  const [isRepeating, setIsRepeating] = useState(false);
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Handlers
  const handleToggleDay = (day: string) => {
    setSelectedDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));
  };

  const handleSubmit = () => {
    onSubmit({
      name,
      facility,
      schedule: {
        isRepeating,
        date: isRepeating ? null : date,
        startDate: isRepeating ? startDate : null,
        endDate: isRepeating ? endDate : null,
        startTime,
        endTime,
        selectedDays: isRepeating ? selectedDays : [],
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* 1. Session Details */}
      <CreateSessionDetailsSection
        name={name}
        onChangeName={setName}
        facility={facility}
        onChangeFacility={setFacility}
      />

      {/* 2. Schedule */}
      <CreateSessionScheduleSection
        isRepeating={isRepeating}
        onToggleRepeat={setIsRepeating}
        date={date}
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        selectedDays={selectedDays}
        onToggleDay={handleToggleDay}
        onPressDate={() => console.log('Open Date Picker')}
        onPressStartDate={() => console.log('Open Start Date Picker')}
        onPressEndDate={() => console.log('Open End Date Picker')}
        onPressStartTime={() => console.log('Open Start Time Picker')}
        onPressEndTime={() => console.log('Open End Time Picker')}
      />

      {/* TODO: Add TraineesSection here later */}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.m,
    paddingBottom: spacing.xxl,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: spacing.borderRadius,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  submitButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
