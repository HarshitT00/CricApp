import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Chip } from '@/components/Chip';
import { SearchBar } from '@/components/SearchBar';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Batch } from '@/types/Batch'; // <-- Import the real Batch type

interface CreateSessionTraineesSectionProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  // Replace SearchResult with Batch!
  selectedBatches: Batch[];
  onRemoveBatch: (id: string) => void;
  searchResults: Batch[];
  onSelectSearchResult: (batch: Batch) => void;
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

        <SearchBar
          value={searchQuery}
          onChangeText={onChangeSearch}
          placeholder="Search trainees or batches..."
          results={searchResults}
          onSelectResult={onSelectSearchResult}
        />

        {selectedBatches.length > 0 && (
          <View style={styles.chipsContainer}>
            {selectedBatches.map(batch => (
              <Chip key={batch.id} label={batch.name} onClose={() => onRemoveBatch(batch.id)} />
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
    zIndex: 1000,
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
    marginTop: spacing.m, // Added a tiny bit of margin to separate chips from the search bar
  },
});