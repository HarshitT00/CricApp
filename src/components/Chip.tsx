import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface ChipProps {
  label: string;
  onClose?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, onClose }) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
      {onClose && (
        <TouchableOpacity 
          onPress={onClose} 
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={18} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight, 
    borderRadius: 20,
    paddingVertical: 8, 
    paddingLeft: 14,
    paddingRight: 10,
  },
  chipText: {
    fontSize: 14,
    color: colors.primary, 
    fontWeight: '500',
    marginRight: 4,
  },
  closeButton: {
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});