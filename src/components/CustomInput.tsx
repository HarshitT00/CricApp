import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const CustomInput = ({ label, error, style, ...props }: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, style, error ? styles.inputError : null]}
        placeholderTextColor={colors.text.secondary}
        selectionColor={colors.primary}
        {...props}
      />

      {/* FIX: Using ternary operator prevents empty strings from crashing the app */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.m,
    paddingVertical: 14,
    color: colors.text.primary,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.status.error,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
