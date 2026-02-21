import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CustomToggle } from '@/components/CustomToggle';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { SelectorInput } from '@/components/SelectorInput';
import { CustomDatePicker } from '@/components/CustomDatePicker';
import { CustomTimePicker } from '@/components/CustomTimePicker';

const WEEKDAYS = [
  { label: 'S', value: 'Sun' },
  { label: 'M', value: 'Mon' },
  { label: 'T', value: 'Tue' },
  { label: 'W', value: 'Wed' },
  { label: 'T', value: 'Thu' },
  { label: 'F', value: 'Fri' },
  { label: 'S', value: 'Sat' },
];

type FieldType = 'date' | 'startDate' | 'endDate' | 'startTime' | 'endTime' | null;

interface CreateSessionScheduleSectionProps {
  isRepeating: boolean;
  onToggleRepeat: (val: boolean) => void;
  date: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  selectedDays: string[];
  onToggleDay: (day: string) => void;
  // Updated from onPress... to onChange... to handle selection internally
  onChangeDate: (date: string) => void;
  onChangeStartDate: (date: string) => void;
  onChangeEndDate: (date: string) => void;
  onChangeStartTime: (time: string) => void;
  onChangeEndTime: (time: string) => void;
}

export const CreateSessionScheduleSection: React.FC<CreateSessionScheduleSectionProps> = ({
  isRepeating,
  onToggleRepeat,
  date,
  startDate,
  endDate,
  startTime,
  endTime,
  selectedDays,
  onToggleDay,
  onChangeDate,
  onChangeStartDate,
  onChangeEndDate,
  onChangeStartTime,
  onChangeEndTime,
}) => {
  // State to manage which picker is open and for which field
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [activeField, setActiveField] = useState<FieldType>(null);

  const openDatePicker = (field: 'date' | 'startDate' | 'endDate') => {
    setActiveField(field);
    setDatePickerVisible(true);
  };

  const openTimePicker = (field: 'startTime' | 'endTime') => {
    setActiveField(field);
    setTimePickerVisible(true);
  };

  const handleDateSelect = (selectedDate: string) => {
    if (activeField === 'date') onChangeDate(selectedDate);
    if (activeField === 'startDate') onChangeStartDate(selectedDate);
    if (activeField === 'endDate') onChangeEndDate(selectedDate);
    setDatePickerVisible(false);
  };

  const handleTimeSelect = (selectedTime: string) => {
    if (activeField === 'startTime') onChangeStartTime(selectedTime);
    if (activeField === 'endTime') onChangeEndTime(selectedTime);
    setTimePickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>SCHEDULE</Text>

      <CustomToggle label="Recurring Session" value={isRepeating} onValueChange={onToggleRepeat} />

      {isRepeating ? (
        <>
          <View style={styles.row}>
            <View style={styles.halfFieldLeft}>
              <SelectorInput
                label="Start Date"
                value={startDate}
                placeholder="Select date"
                icon="calendar-outline"
                onPress={() => openDatePicker('startDate')}
              />
            </View>
            <View style={styles.halfField}>
              <SelectorInput
                label="End Date"
                value={endDate}
                placeholder="Select date"
                icon="calendar-outline"
                onPress={() => openDatePicker('endDate')}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Repeat On</Text>
            <View style={styles.daysRow}>
              {WEEKDAYS.map(day => {
                const isSelected = selectedDays.includes(day.value);
                return (
                  <TouchableOpacity
                    key={day.value}
                    style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}
                    onPress={() => onToggleDay(day.value)}>
                    <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                      {day.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </>
      ) : (
        <SelectorInput
          label="Date"
          value={date}
          placeholder="Select date"
          icon="calendar-outline"
          onPress={() => openDatePicker('date')}
        />
      )}

      <View style={styles.row}>
        <View style={styles.halfFieldLeft}>
          <SelectorInput
            label="Start Time"
            value={startTime}
            placeholder="Select time"
            icon="time-outline"
            onPress={() => openTimePicker('startTime')}
          />
        </View>
        <View style={styles.halfField}>
          <SelectorInput
            label="End Time"
            value={endTime}
            placeholder="Select time"
            icon="time-outline"
            onPress={() => openTimePicker('endTime')}
          />
        </View>
      </View>
      {datePickerVisible && (
        <CustomDatePicker
          visible={datePickerVisible}
          onClose={() => setDatePickerVisible(false)}
          onSelectDate={handleDateSelect}
        />
      )}

      {timePickerVisible && (
        <CustomTimePicker
          visible={timePickerVisible}
          onClose={() => setTimePickerVisible(false)}
          onSelectTime={handleTimeSelect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.secondary,
    letterSpacing: 1,
    marginBottom: spacing.m,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    flex: 1,
  },
  halfFieldLeft: {
    flex: 1,
    marginRight: spacing.m,
  },
  fieldContainer: {
    marginBottom: spacing.l,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: spacing.s,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayCircleSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  dayTextSelected: {
    color: colors.background,
    fontWeight: 'bold',
  },
});