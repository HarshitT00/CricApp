import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Chip } from '@/components/Chip';
import { SearchBar, SearchResult } from '@/components/SearchBar'; // Ensure SearchResult is exported from SearchBar

interface CreateSessionTraineesSectionProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  selectedBatches: SearchResult[];
  onRemoveBatch: (id: string) => void;
  searchResults: SearchResult[];
  onSelectSearchResult: (batch: SearchResult) => void;
}

export const CreateSessionTraineesSection: React.FC<CreateSessionTraineesSectionProps> = ({
  searchQuery,
  onChangeSearch,
  selectedBatches,
  onRemoveBatch,
  searchResults,
  onSelectSearchResult,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>TRAINEES</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Assign Batches</Text>

        {/* The SearchBar now handles the dropdown automatically! */}
        <SearchBar 
          value={searchQuery}
          onChangeText={onChangeSearch}
          placeholder="Search trainees or batches..."
          results={searchResults}
          onSelectResult={onSelectSearchResult}
        />

        {/* Selected Batches Chips */}
        {selectedBatches.length > 0 && (
          <View style={styles.chipsContainer}>
            {selectedBatches.map((batch) => (
              <Chip 
                key={batch.id} 
                label={batch.name} 
                onClose={() => onRemoveBatch(batch.id)} 
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
    zIndex: 1000, // Ensure this entire section can float above subsequent sections
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
    zIndex: 1000, 
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: spacing.s,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
  },
});