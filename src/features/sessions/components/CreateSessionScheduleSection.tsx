import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

const WEEKDAYS = [
  { label: 'S', value: 'Sun' },
  { label: 'M', value: 'Mon' },
  { label: 'T', value: 'Tue' },
  { label: 'W', value: 'Wed' },
  { label: 'T', value: 'Thu' },
  { label: 'F', value: 'Fri' },
  { label: 'S', value: 'Sat' },
];

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
  onPressDate: () => void;
  onPressStartDate: () => void;
  onPressEndDate: () => void;
  onPressStartTime: () => void;
  onPressEndTime: () => void;
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
  onPressDate,
  onPressStartDate,
  onPressEndDate,
  onPressStartTime,
  onPressEndTime,
}) => {

  const SelectorInput = ({ label, value, placeholder, icon, onPress }: any) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.inputWithIcon} onPress={onPress}>
        <Text style={[styles.inputValue, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Ionicons name={icon} size={20} color={colors.text.secondary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>SCHEDULE</Text>

      {/* Repeat Toggle */}
      <View style={styles.toggleRow}>
        <Text style={styles.label}>Repeat Session</Text>
        <Switch
          value={isRepeating}
          onValueChange={onToggleRepeat}
          trackColor={{ false: colors.surfaceLight, true: colors.primary }}
          thumbColor={colors.text.primary}
          ios_backgroundColor={colors.surfaceLight}
        />
      </View>

      {/* Conditionally Render Date Fields */}
      {isRepeating ? (
        <>
          {/* REPEATING ON: Start Date & End Date Row */}
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: spacing.m }}>
              <SelectorInput 
                label="Start Date" 
                value={startDate} 
                placeholder="Select date" 
                icon="calendar-outline" 
                onPress={onPressStartDate} 
              />
            </View>
            <View style={{ flex: 1 }}>
              <SelectorInput 
                label="End Date" 
                value={endDate} 
                placeholder="Select date" 
                icon="calendar-outline" 
                onPress={onPressEndDate} 
              />
            </View>
          </View>

          {/* Days of the week selection */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Repeat On</Text>
            <View style={styles.daysRow}>
              {WEEKDAYS.map((day) => {
                const isSelected = selectedDays.includes(day.value);
                return (
                  <TouchableOpacity
                    key={day.value}
                    style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}
                    onPress={() => onToggleDay(day.value)}
                  >
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
        /* REPEATING OFF: Single Date */
        <SelectorInput 
          label="Date" 
          value={date} 
          placeholder="Select date" 
          icon="calendar-outline" 
          onPress={onPressDate} 
        />
      )}

      {/* Start Time & End Time Row (Always visible) */}
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: spacing.m }}>
          <SelectorInput 
            label="Start Time" 
            value={startTime} 
            placeholder="Select time" 
            icon="time-outline" 
            onPress={onPressStartTime} 
          />
        </View>
        <View style={{ flex: 1 }}>
          <SelectorInput 
            label="End Time" 
            value={endTime} 
            placeholder="Select time" 
            icon="time-outline" 
            onPress={onPressEndTime} 
          />
        </View>
      </View>

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
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
    backgroundColor: colors.surface,
    padding: spacing.m,
    borderRadius: spacing.borderRadius,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
    paddingHorizontal: spacing.m,
    paddingVertical: 14,
  },
  inputValue: {
    fontSize: 16,
    color: colors.text.primary,
  },
  placeholderText: {
    color: colors.text.secondary,
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