import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { CreateSessionDetailsSection } from '@/features/sessions/components/CreateSessionDetailsSection';
import { CreateSessionScheduleSection } from '@/features/sessions/components/CreateSessionScheduleSection';
import { CreateSessionTraineesSection } from '@/features/sessions/components/CreateSessionsTraineesSection';
import { Batch } from '@/types/Batch';

interface CreateSessionFormProps {
  availableBatches: Batch[]; // Now accepts REAL batches from the parent
  onSubmit: (sessionData: any) => void;
}

export const CreateSessionForm: React.FC<CreateSessionFormProps> = ({ availableBatches, onSubmit }) => {
  // Session Details State
  const [name, setName] = useState('');
  const [facility, setFacility] = useState<'Gym' | 'Pitch'>('Pitch');

  // Schedule State
  const [isRepeating, setIsRepeating] = useState(false);
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
  // Batches State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatches, setSelectedBatches] = useState<Batch[]>([]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return availableBatches.filter(
      batch =>
        batch.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedBatches.find(selected => selected.id === batch.id),
    );
  }, [searchQuery, selectedBatches, availableBatches]);

  const handleSelectSearchResult = (batch: Batch) => {
    setSelectedBatches(prev => [...prev, batch]);
    setSearchQuery('');
  };

  const handleRemoveBatch = (idToRemove: string) => {
    setSelectedBatches(prev => prev.filter(batch => batch.id !== idToRemove));
  };

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
      batchIds: selectedBatches.map(b => b.id) // Map array of objects into array of simple strings
    });
  };

  return (
    <View style={styles.container}>
      <CreateSessionDetailsSection
        name={name}
        onChangeName={setName}
        facility={facility}
        onChangeFacility={setFacility}
      />

      <CreateSessionScheduleSection
        isRepeating={isRepeating}
        onToggleRepeat={setIsRepeating}
        date={date}
        onChangeDate={setDate}
        startDate={startDate}
        onChangeStartDate={setStartDate}
        endDate={endDate}
        onChangeEndDate={setEndDate}
        startTime={startTime}
        onChangeStartTime={setStartTime}
        endTime={endTime}
        onChangeEndTime={setEndTime}
        selectedDays={selectedDays}
        onToggleDay={handleToggleDay}
      />

      <CreateSessionTraineesSection
        searchQuery={searchQuery}
        onChangeSearch={setSearchQuery}
        selectedBatches={selectedBatches}
        onRemoveBatch={handleRemoveBatch}
        searchResults={searchResults}
        onSelectSearchResult={handleSelectSearchResult}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: spacing.m, paddingBottom: spacing.xxl },
  submitButton: { backgroundColor: colors.primary, padding: 16, borderRadius: spacing.borderRadius, alignItems: 'center', marginTop: spacing.xl },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});