import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { CreateSessionDetailsSection } from '@/features/sessions/components/CreateSessionDetailsSection';
import { CreateSessionScheduleSection } from '@/features/sessions/components/CreateSessionScheduleSection';
import { CreateSessionTraineesSection } from '@/features/sessions/components/CreateSessionsTraineesSection';
import { Batch } from '@/types/Batch';
import { Session } from '@/types/Session'; // <-- Import Session

interface CreateSessionFormProps {
  availableBatches: Batch[];
  initialData?: Session; // <-- Add this optional prop
  onSubmit: (sessionData: any) => void;
}

export const CreateSessionForm: React.FC<CreateSessionFormProps> = ({ availableBatches, initialData, onSubmit }) => {
  // Pre-fill State if initialData exists
  const [name, setName] = useState(initialData?.name || '');
  const [facility, setFacility] = useState<'Gym' | 'Pitch'>(initialData?.facility || 'Pitch');

  const [isRepeating, setIsRepeating] = useState(initialData?.schedule.isRepeating || false);
  const [date, setDate] = useState(initialData?.schedule.date || '');
  const [startDate, setStartDate] = useState(initialData?.schedule.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.schedule.endDate || '');
  const [startTime, setStartTime] = useState(initialData?.schedule.startTime || '');
  const [endTime, setEndTime] = useState(initialData?.schedule.endTime || '');
  const [selectedDays, setSelectedDays] = useState<string[]>(initialData?.schedule.selectedDays || []);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cross-reference saved batch IDs with the real batch objects to populate the chips
  const [selectedBatches, setSelectedBatches] = useState<Batch[]>(
    initialData?.batchIds 
      ? availableBatches.filter(b => initialData.batchIds.includes(b.id)) 
      : []
  );

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
      batchIds: selectedBatches.map(b => b.id)
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
        <Text style={styles.submitButtonText}>
          {initialData ? 'Update Session' : 'Create Session'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: spacing.m, paddingBottom: spacing.xxl },
  submitButton: { backgroundColor: colors.primary, padding: 16, borderRadius: spacing.borderRadius, alignItems: 'center', marginTop: spacing.xl },
  submitButtonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
});