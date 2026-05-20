import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { PlayerInfo } from '@/types/PlayerInfo';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  allPlayers: PlayerInfo[];
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
}

export const SelectPlayersModal = ({
  visible,
  onClose,
  onSave,
  allPlayers,
  selectedIds,
  onToggleSelection,
}: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Players</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={allPlayers}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: spacing.l }}
            renderItem={({ item }) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <TouchableOpacity
                  style={[styles.selectableRow, isSelected && styles.selectedRow]}
                  onPress={() => onToggleSelection(item.id)}>
                  <Text style={styles.selectableName}>{item.name}</Text>
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={isSelected ? colors.primary : colors.text.secondary}
                  />
                </TouchableOpacity>
              );
            }}
          />

          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save Batch Roster</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: colors.background,
    height: '80%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.l,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text.primary },
  selectableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedRow: { backgroundColor: 'rgba(13, 41, 30, 0.05)' },
  selectableName: { fontSize: 16, color: colors.text.primary, fontWeight: '500' },
  saveButton: {
    backgroundColor: colors.primary,
    padding: spacing.m,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.m,
  },
  saveButtonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
});
