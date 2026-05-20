import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { PlayerForm } from '@/features/players/components/PlayerForm';
import { RootStackParamList } from '@/navigation/types';
import { playerStorage } from '@/services/playerStorage';

export const RegisterPlayer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 1. Strictly type the route so TypeScript knows what parameters exist
  const route = useRoute<RouteProp<RootStackParamList, 'RegisterPlayer'>>();

  // 2. Look for 'playerInfo' instead of 'player'
  const playerInfo = route.params?.playerInfo;
  const isEditMode = !!playerInfo;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      // 3. IMPORTANT: If editing, ensure we keep the original ID so it overwrites
      // instead of creating a duplicate player!
      const playerDataToSave = {
        ...data,
        id: playerInfo?.id,
      };

      await playerStorage.savePlayer(playerDataToSave);

      Alert.alert('Success', `Player successfully ${isEditMode ? 'updated' : 'registered'}!`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not save the player details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title={isEditMode ? 'Edit Player' : 'New Registration'}
          leftIconName="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />

        <PlayerForm
          // 4. Pass the correctly named parameter into the form
          initialData={playerInfo}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
