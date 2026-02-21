import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { SelectorInput } from '@/components/SelectorInput';

interface CreateSessionDetailsSectionProps {
  name: string;
  onChangeName: (name: string) => void;
  facility: string;
  onChangeFacility: (facility: string) => void;
}

export const CreateSessionDetailsSection: React.FC<CreateSessionDetailsSectionProps> = ({
  name,
  onChangeName,
  facility,
  onChangeFacility,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>SESSION DETAILS</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Session Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Morning Net Practice"
          placeholderTextColor={colors.text.secondary}
          value={name}
          onChangeText={onChangeName}
        />
      </View>
        <SelectorInput 
            label="Facility" 
            value={facility} 
            placeholder="Select Facility" 
            icon="location-outline" // or "chevron-forward"
            onPress={() => console.log('Open facility picker')} 
        />
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
  fieldContainer: {
    marginBottom: spacing.l,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: spacing.s,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
    paddingHorizontal: spacing.m,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text.primary,
  },
});
