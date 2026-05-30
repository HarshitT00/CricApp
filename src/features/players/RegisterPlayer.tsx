import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { PlayerForm } from '@/features/players/components/PlayerForm';
import { RootStackParamList } from '@/navigation/types';
import { playerStorage } from '@/services/playerStorage';
import { PlayerInfo } from '@/types/PlayerInfo';

export const RegisterPlayer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'RegisterPlayer'>>();

  const playerInfo = route.params?.playerInfo;
  const isEditMode = !!playerInfo;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: PlayerInfo) => {
    try {
      setIsSubmitting(true);
      const playerDataToSave: PlayerInfo = {
        ...data,
        id: playerInfo?.id || data.id || '',
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
    <ScreenWrapper edges={['top', 'bottom']}>
      <View style={styles.container}>
        <ScreenHeader
          title={isEditMode ? 'Edit Player' : 'New Registration'}
          leftIconName="close"
          onLeftPress={() => navigation.goBack()}
        />
        <PlayerForm
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