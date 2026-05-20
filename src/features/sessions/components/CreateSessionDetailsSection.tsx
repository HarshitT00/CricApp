import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { CustomInput } from '@/components/CustomInput';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface Props {
  name: string;
  onChangeName: (val: string) => void;
  facility: 'Gym' | 'Pitch';
  onChangeFacility: (val: 'Gym' | 'Pitch') => void;
}

export const CreateSessionDetailsSection = ({ name, onChangeName, facility, onChangeFacility }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Session Details</Text>
      
      <CustomInput
        label="Session Name"
        placeholder="e.g. Morning Fielding Drill"
        value={name}
        onChangeText={onChangeName}
      />

      <Text style={styles.label}>Facility</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleBtn, facility === 'Pitch' && styles.activeToggle]}
          onPress={() => onChangeFacility('Pitch')}
        >
          <Text style={[styles.toggleText, facility === 'Pitch' && styles.activeText]}>Pitch</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.toggleBtn, facility === 'Gym' && styles.activeToggle]}
          onPress={() => onChangeFacility('Gym')}
        >
          <Text style={[styles.toggleText, facility === 'Gym' && styles.activeText]}>Gym</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: spacing.l },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.m },
  label: { fontSize: 14, fontWeight: '600', color: colors.text.secondary, marginBottom: spacing.s },
  toggleContainer: { flexDirection: 'row', gap: spacing.m, marginBottom: spacing.m },
  toggleBtn: { flex: 1, padding: spacing.m, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', alignItems: 'center', backgroundColor: colors.background },
  activeToggle: { backgroundColor: colors.primary, borderColor: colors.primary },
  toggleText: { fontSize: 16, fontWeight: '600', color: colors.text.primary },
  activeText: { color: '#fff' },
});