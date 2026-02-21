import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

import { ScreenWrapper } from '@/components/ScreenWrapper';
import { SessionCard } from '@/components/SessionCard';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { AttendanceButton } from '@/features/home/components/AttendanceButton';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { StatsGrid } from '@/features/home/components/StatsGrid';
import { VerificationList } from '@/features/home/components/VerificationList';
import { RootStackParamList } from '@/navigation/types';
import { Session } from '@/types/Session';

const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    title: 'U16 Nets Practice',
    location: 'Pitch 3, North Wing',
    time: '07:00 AM',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067',
    status: 'UPCOMING',
  },
  {
    id: '2',
    title: 'Fielding Drills',
    location: 'Main Ground',
    time: '09:30 AM',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2067',
    status: 'UPCOMING',
  },
  {
    id: '3',
    title: 'Batting Practice',
    location: 'Pitch 1, South Wing',
    time: '02:00 PM',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2067',
    status: 'UPCOMING',
  },
];

const { width } = Dimensions.get('window');

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <HomeHeader />

        <SectionHeader
          title="Today's Sessions"
          action="View All"
          onPress={() => navigation.navigate('SessionList')}
        />
        <FlatList
          data={MOCK_SESSIONS}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={styles.flatListBreakout}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <SessionCard session={item} />
            </View>
          )}
        />

        <View style={styles.spacer} />
        <AttendanceButton onPress={() => console.log('Start Attendance')} />
        <StatsGrid />
        <SectionHeader title="Pending Verifications" badge={2} />
        <VerificationList />
      </ScrollView>
    </ScreenWrapper>
  );
}

const SectionHeader = ({ title, action, badge, onPress }: any) => (
  <View style={styles.sectionHeader}>
    <View style={styles.titleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
    {action && (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.actionText}>{action}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  flatListBreakout: {
    marginHorizontal: -spacing.screenPadding,
    flexGrow: 0,
  },
  cardWrapper: {
    width: width,
    paddingHorizontal: spacing.screenPadding,
  },
  spacer: {
    height: spacing.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: colors.text.primary,
    fontSize: 12,
  },
  actionText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
