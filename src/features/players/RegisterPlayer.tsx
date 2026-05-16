import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { PlayerForm } from '@/features/players/components/PlayerForm';
import { RootStackParamList } from '@/navigation/types';
import { PlayerInfo } from '@/types/PlayerInfo';

export const RegisterPlayer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<Record<string, { playerInfo?: PlayerInfo }>, string>>();
  const isEditMode = !!route.params?.playerInfo;

  const handleSubmit = (data: any) => {
    console.log('Form Submitted with data:', data);
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
