import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';

interface CreateSessionFabProps {
  onPress: () => void;
}

export const CreateSessionFab = ({ onPress }: CreateSessionFabProps) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="add" size={32} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});
