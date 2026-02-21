import React, { useState, useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface CustomDatePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  currentDate?: string; // Format: YYYY-MM-DD
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  visible,
  onClose,
  onSelectDate,
}) => {
  const [baseDate, setBaseDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const days = useMemo(() => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    let daysArray = Array(firstDay).fill(null); // Empty slots for alignment
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    return daysArray;
  }, [baseDate]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(baseDate.setMonth(baseDate.getMonth() + offset));
    setBaseDate(new Date(newDate));
  };

  const handleDayPress = (day: number) => {
    const year = baseDate.getFullYear();
    const month = String(baseDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    onSelectDate(`${year}-${month}-${dayStr}`);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
                  <Ionicons name="chevron-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.monthText}>
                  {baseDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </Text>
                <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
                  <Ionicons name="chevron-forward" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>

              {/* Weekdays */}
              <View style={styles.weekRow}>
                {WEEKDAYS.map((day, idx) => (
                  <Text key={idx} style={styles.weekdayText}>{day}</Text>
                ))}
              </View>

              {/* Days Grid */}
              <View style={styles.daysGrid}>
                {days.map((day, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.dayCell, !day && styles.emptyCell]}
                    onPress={() => day && handleDayPress(day)}
                    disabled={!day}
                  >
                    {day && <Text style={styles.dayText}>{day}</Text>}
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalContainer: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
    padding: spacing.l,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  monthText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButton: {
    padding: spacing.s,
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.s,
  },
  weekdayText: {
    color: colors.text.secondary,
    width: 40,
    textAlign: 'center',
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 columns
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  dayText: {
    color: colors.text.primary,
    fontSize: 16,
  },
});