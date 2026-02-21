import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export interface Batch {
  id: string;
  name: string;
}

interface CreateSessionTraineesSectionProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  selectedBatches: Batch[];
  onRemoveBatch: (id: string) => void;
}

export const CreateSessionTraineesSection: React.FC<CreateSessionTraineesSectionProps> = ({
  searchQuery,
  onChangeSearch,
  selectedBatches,
  onRemoveBatch,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>TRAINEES</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Assign Batches</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search trainees or batches..."
            placeholderTextColor={colors.text.secondary}
            value={searchQuery}
            onChangeText={onChangeSearch}
          />
        </View>

        {selectedBatches.length > 0 && (
          <View style={styles.chipsContainer}>
            {selectedBatches.map((batch) => (
              <View key={batch.id} style={styles.chip}>
                <Text style={styles.chipText}>{batch.name}</Text>
                <TouchableOpacity 
                  onPress={() => onRemoveBatch(batch.id)} 
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={styles.closeButton}
                >
                  {/* Changed the icon color to primary to match the green theme */}
                  <Ionicons name="close" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
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
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight, // Using your new deep green color
    borderRadius: 20,
    paddingVertical: 8, // Slightly increased padding for better touch target
    paddingLeft: 14,
    paddingRight: 10,
  },
  chipText: {
    fontSize: 14,
    color: colors.primary, // Make text bright green to pop against the dark green background
    fontWeight: '500',
    marginRight: 4,
  },
  closeButton: {
    // Completely removed backgroundColor and borderRadius
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});