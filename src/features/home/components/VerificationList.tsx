import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export const VerificationList = () => {
  return (
    <View>
      <VerificationItem 
        name="Arjun K." 
        status="Face Match (98%)" 
        time="06:55 AM" 
        isVerified={true} 
      />
      <VerificationItem 
        name="Vihaan S." 
        status="Geofence Verified" 
        time="07:02 AM" 
        isVerified={false} 
      />
    </View>
  );
};

const VerificationItem = ({ name, status, time, isVerified }: any) => (
  <View style={styles.item}>
    <Image 
      source={{ uri: `https://ui-avatars.com/api/?name=${name}&background=random` }} 
      style={styles.avatar} 
    />
    <View style={styles.info}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.statusRow}>
        <Ionicons 
          name={isVerified ? "happy-outline" : "location-outline"} 
          size={14} 
          color={colors.text.accent} 
        />
        <Text style={styles.status}>{status}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.status.errorBg }]}>
        <Ionicons name="close" size={20} color={colors.status.error} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.status.successBg }]}>
        <Ionicons name="checkmark" size={20} color={colors.status.success} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.m,
    borderRadius: spacing.borderRadius,
    marginBottom: spacing.m,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.m,
  },
  info: {
    flex: 1,
  },
  name: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  status: {
    color: colors.text.accent,
    fontSize: 12,
  },
  time: {
    color: colors.text.secondary,
    fontSize: 12,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    padding: 8,
    borderRadius: 12,
  },
});