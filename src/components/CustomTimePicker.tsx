import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface CustomTimePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelectTime: (time: string) => void;
}

const HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const MINUTES = ['00', '15', '30', '45'];
const PERIODS = ['AM', 'PM'];

const getDefaultTime = () => {
  const now = new Date();
  let h = now.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  let m = Math.round(now.getMinutes() / 15) * 15;
  if (m === 60) m = 45;
  return {
    hour: h.toString(),
    minute: m === 0 ? '00' : m.toString(),
    period: ampm,
  };
};

interface GridProps {
  data: string[];
  selectedValue: string;
  onSelect: (val: string) => void;
  itemStyle: object;
}

const Grid = ({ data, selectedValue, onSelect, itemStyle }: GridProps) => (
  <View style={styles.grid}>
    {data.map(item => (
      <TouchableOpacity
        key={item}
        style={[itemStyle, selectedValue === item && styles.gridItemSelected]}
        onPress={() => onSelect(item)}
        activeOpacity={0.7}>
        <Text style={[styles.gridItemText, selectedValue === item && styles.gridItemTextSelected]}>
          {item}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  visible,
  onClose,
  onSelectTime,
}) => {
  const defaultTime = getDefaultTime();
  const [selectedHour, setSelectedHour] = useState(defaultTime.hour);
  const [selectedMinute, setSelectedMinute] = useState(defaultTime.minute);
  const [selectedPeriod, setSelectedPeriod] = useState(defaultTime.period);

  const handleConfirm = () => {
    onSelectTime(`${selectedHour}:${selectedMinute} ${selectedPeriod}`);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.headerTitle}>Select Time</Text>

              <Text style={styles.sectionTitle}>Hour</Text>
              <Grid
                data={HOURS}
                selectedValue={selectedHour}
                onSelect={setSelectedHour}
                itemStyle={styles.hourItem}
              />

              <Text style={styles.sectionTitle}>Minute</Text>
              <Grid
                data={MINUTES}
                selectedValue={selectedMinute}
                onSelect={setSelectedMinute}
                itemStyle={styles.minuteItem}
              />

              <View style={styles.periodRow}>
                {PERIODS.map(period => (
                  <TouchableOpacity
                    key={period}
                    style={[
                      styles.periodButton,
                      selectedPeriod === period && styles.periodButtonSelected,
                    ]}
                    onPress={() => setSelectedPeriod(period)}
                    activeOpacity={0.7}>
                    <Text
                      style={[
                        styles.periodButtonText,
                        selectedPeriod === period && styles.periodButtonTextSelected,
                      ]}>
                      {period}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                activeOpacity={0.8}>
                <Text style={styles.confirmButtonText}>Confirm Time</Text>
              </TouchableOpacity>
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
  headerTitle: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.l,
  },
  sectionTitle: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.s,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
    marginBottom: spacing.m,
  },
  hourItem: {
    width: '14.5%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  minuteItem: {
    width: '23%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  gridItemSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  gridItemText: {
    color: colors.text.primary,
    fontSize: 16,
  },
  gridItemTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  periodRow: {
    flexDirection: 'row',
    gap: spacing.m,
    marginTop: spacing.s,
    marginBottom: spacing.xl,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  periodButtonSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  periodButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  periodButtonTextSelected: {
    color: colors.primary,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: spacing.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});