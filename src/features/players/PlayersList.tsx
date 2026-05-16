// src/features/players/PlayersList.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, FlatList } from 'react-native';

import { CreateSessionFab } from '@/components/AddButton';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { spacing } from '@/constants/spacing';
import { PlayerCard } from '@/features/players/components/PlayerCard';
import { RootStackParamList } from '@/navigation/types';
import { PlayerInfo } from '@/types/PlayerInfo';

// Mock Data to test our UI
const MOCK_PLAYERS: PlayerInfo[] = [
  {
    id: '1',
    name: 'Virat Kohli',
    role: 'Batsman',
    image: 'https://i.pravatar.cc/150?img=11',
    age: "18",
    contactNumber: "1234567890",
    guardianInfo: {
      name: "John Doe",
      contactNumber: "9876543210"
    }
  },
  {
    id: '2',
    name: 'Jasprit Bumrah',
    role: 'Bowler',
    image: 'https://i.pravatar.cc/150?img=12',
    age: "18",
    contactNumber: "1234567890",
    guardianInfo: {
      name: "John Doe",
      contactNumber: "9876543210"
    }
  },
  {
    id: '3',
    name: 'Hardik Pandya',
    role: 'All Rounder',
    image: 'https://i.pravatar.cc/150?img=13',
    age: "18",
    contactNumber: "1234567890",
    guardianInfo: {
      name: "John Doe",
      contactNumber: "9876543210"
    }
  },
  {
    id: '4',
    name: 'MS Dhoni',
    role: 'Wicket Keeper',
    image: 'https://i.pravatar.cc/150?img=14',
    age: "18",
    contactNumber: "1234567890",
    guardianInfo: {
      name: "John Doe",
      contactNumber: "9876543210"
    }
  },
];

export const PlayersList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRegisterPlayer = () => {
    navigation.navigate('RegisterPlayer');
  };

  const handleEditPlayer = (playerInfo: PlayerInfo) => {
    navigation.navigate('RegisterPlayer', { playerInfo });
  };


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Players"
          leftIconName="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />

        {/* The FlatList renders the PlayerCard efficiently */}
        <FlatList
          data={MOCK_PLAYERS}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlayerCard player={item} onPress={() => handleEditPlayer(item)} />
          )}
        />

        <CreateSessionFab onPress={handleRegisterPlayer} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: 100, // Extra space at the bottom so the FAB doesn't block the last item
    paddingTop: spacing.s,
  },
});
