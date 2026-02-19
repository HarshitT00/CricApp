import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export const SessionHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button (Absolute Positioned) */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
      </TouchableOpacity>

      {/* Title (Centered) */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>All Sessions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centers the title container
    marginTop: spacing.s,
    marginBottom: spacing.m,
    position: 'relative', // Context for absolute positioning
    paddingHorizontal: spacing.screenPadding,
  },
  backButton: {
    position: 'absolute',
    left: spacing.screenPadding, // Pins button to the left safe zone
    zIndex: 10,
    padding: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24, // Slightly reduced to fit better with back arrow
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
});