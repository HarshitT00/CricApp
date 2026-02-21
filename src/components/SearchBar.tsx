import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export interface SearchResult {
  id: string;
  name: string;
}

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  results?: SearchResult[];
  onSelectResult?: (result: SearchResult) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder = "Search...", 
  results = [],
  onSelectResult,
  ...props 
}) => {
  const showResults = value.length > 0 && results.length > 0;

  return (
    <View style={styles.wrapper}>
      {/* Search Input Container */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
      </View>

      {/* Floating Dropdown Results */}
      {showResults && (
        <View style={styles.dropdownContainer}>
          <ScrollView 
            keyboardShouldPersistTaps="handled" 
            style={styles.scrollView}
            nestedScrollEnabled={true}
          >
            {results.map((result) => (
              <TouchableOpacity 
                key={result.id} 
                style={styles.searchResultItem}
                onPress={() => onSelectResult && onSelectResult(result)}
              >
                <Text style={styles.searchResultText}>{result.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // This makes the dropdown position itself relative to this container
    position: 'relative', 
    zIndex: 1000, // Important for iOS to ensure dropdown stays on top
    marginBottom: spacing.m,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
    paddingHorizontal: spacing.m,
  },
  searchIcon: {
    marginRight: spacing.s,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text.primary,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 54, // Places it right below the search bar
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceLight,
    borderRadius: spacing.borderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: 200, // Limits height and makes it scrollable if there are many results
    zIndex: 1000, 
    elevation: 5, // Adds a shadow on Android
    shadowColor: '#000', // Adds a shadow on iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scrollView: {
    flexGrow: 0,
  },
  searchResultItem: {
    paddingVertical: 12,
    paddingHorizontal: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchResultText: {
    color: colors.text.primary,
    fontSize: 14,
  }
});