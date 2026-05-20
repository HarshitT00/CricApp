import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface SearchBarProps<T> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  results?: T[];
  onSelectResult?: (item: T) => void;
}

export function SearchBar<T extends { id: string; name: string }>({
  value,
  onChangeText,
  placeholder = 'Search...',
  results = [],
  onSelectResult,
}: SearchBarProps<T>) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Dropdown Results - Swapped FlatList for ScrollView */}
      {results.length > 0 && onSelectResult && (
        <View style={styles.dropdown}>
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
            {results.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.dropdownItem}
                onPress={() => onSelectResult(item)}
              >
                <Text style={styles.dropdownItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
    paddingHorizontal: spacing.m,
    height: 48,
  },
  icon: {
    marginRight: spacing.s,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  dropdown: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    maxHeight: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.text.primary,
  },
});