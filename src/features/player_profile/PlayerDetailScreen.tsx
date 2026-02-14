import { ScreenWrapper } from '@/components/ScreenWrapper';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Player } from '@/types/Player';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function PlayerDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const player = route.params.player as Player;

  return (
    <ScreenWrapper>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Back Button (Fixed) */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>

        {/* 2. Mark Attendance Button (At the Top) */}
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Attendance', { player: player })}
        >
          <Ionicons name="scan-circle" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.actionBtnText}>Mark Attendance</Text>
        </TouchableOpacity>

        {/* 3. Profile Info */}
        <View style={styles.center}>
          <Image source={{ uri: player.image }} style={styles.bigAvatar} />
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.info}>{player.country} • {player.role}</Text>
        </View>

        {/* 4. Stats Row */}
        <View style={styles.statsRow}>
          <StatBox label="Matches" value={player.stats.matches} />
          <StatBox label="Runs" value={player.stats.runs} />
          <StatBox label="Wickets" value={player.stats.wickets} />
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}

const StatBox = ({ label, value }: { label: string, value: number }) => (
  <View style={styles.stat}>
    <Text style={styles.statVal}>{value}</Text>
    <Text style={styles.statLbl}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl, 
  },
  backBtn: {
    marginBottom: spacing.m,
    alignSelf: 'flex-start',
    marginLeft: -spacing.s, 
    padding: spacing.s,
  },
  actionBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.l,
    borderRadius: spacing.borderRadius,
    marginBottom: spacing.xxl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  center: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  bigAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.l,
    backgroundColor: colors.surface,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.l,
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
  },
  stat: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  statLbl: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textTransform: 'uppercase',
  },
});