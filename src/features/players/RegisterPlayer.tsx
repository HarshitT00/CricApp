import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { registerFace } from 'react-native-facerecognition';

import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { PlayerForm } from '@/features/players/components/PlayerForm';
import { RootStackParamList } from '@/navigation/types';
import { PlayerInfo } from '@/types/PlayerInfo';

export const RegisterPlayer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<Record<string, { playerInfo?: PlayerInfo }>, string>>();
  const isEditMode = !!route.params?.playerInfo;
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: PlayerInfo) => {
    if (!data.name || !data.image) {
      Alert.alert("Missing Info", "Please provide a name and capture a photo.");
      return;
    }

    try {
      setIsSubmitting(true);

      const playerId = data.id || `player_${Date.now()}`;

      console.log("Extracting facial features...");
      const mlResponse = await registerFace(playerId, data.image);
      console.log("ML Model Response:", mlResponse);

      const newPlayer: PlayerInfo = { ...data, id: playerId };

      const existingPlayersStr = await AsyncStorage.getItem('@players_list');
      const existingPlayers: PlayerInfo[] = existingPlayersStr ? JSON.parse(existingPlayersStr) : [];
      
      if (isEditMode) {
        const index = existingPlayers.findIndex(p => p.id === playerId);
        if (index > -1) existingPlayers[index] = newPlayer;
      } else {
        existingPlayers.push(newPlayer);
      }

      // Save back to storage
      await AsyncStorage.setItem('@players_list', JSON.stringify(existingPlayers));

      Alert.alert("Success!", "Player registered and face features saved successfully.");
      navigation.goBack();

    } catch (error: any) {
      console.error(error);
      Alert.alert("Registration Failed", error?.message || "Could not process face features.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title={isEditMode ? 'Player Details' : 'New Registration'}
          leftIconName="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />

        <PlayerForm
          initialData={isEditMode ? route.params?.playerInfo : undefined}
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