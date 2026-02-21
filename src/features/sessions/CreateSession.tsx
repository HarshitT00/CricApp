import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { ScreenWrapper } from '@/components/ScreenWrapper';

import { ScreenHeader } from '../../components/ScreenHeader';

import { CreateSessionForm } from './components/CreateSessionForm';

export const CreateSessionScreen = () => {
  const navigation = useNavigation();

  const handleSessionSubmit = (sessionData: any) => {
    console.log('New Session Data:', sessionData);
    // TODO: Save the session state here
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        title="New Session"
        leftIconName="close"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <CreateSessionForm onSubmit={handleSessionSubmit} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
