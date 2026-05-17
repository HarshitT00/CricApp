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

      // ADD THESE LOGS
      console.log("=== REGISTRATION START ===");
      console.log("Player ID:", playerId);
      console.log("Player Name:", data.name);
      console.log("Image path:", data.image);
      console.log("Image type:", typeof data.image);

      console.log("=== IMAGE PATH ===", data.image);
      Alert.alert("Image Path", data.image);

      const mlResponse = await registerFace(playerId, data.image);
      console.log("=== ML SUCCESS ===", mlResponse);

    } catch (error: any) {
      console.error("=== REGISTRATION ERROR ===");
      console.error("Message:", error?.message);
      console.error("Full error:", JSON.stringify(error));
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