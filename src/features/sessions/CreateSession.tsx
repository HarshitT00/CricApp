import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Alert } from 'react-native';

import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { colors } from '@/constants/colors';
import { CreateSessionForm } from '@/features/sessions/components/CreateSessionForm';
import { batchStorage } from '@/services/batchStorage';
import { sessionStorage } from '@/services/sessionStorage';
import { Batch } from '@/types/Batch';

export const CreateSession = () => {
  const navigation = useNavigation();
  const [availableBatches, setAvailableBatches] = useState<Batch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchBatches = async () => {
        const storedBatches = await batchStorage.getBatches();
        setAvailableBatches(storedBatches || []);
        setIsLoading(false);
      };
      
      fetchBatches();
    }, [])
  );

  const handleSessionSubmit = async (sessionData: any) => {
    try {
      await sessionStorage.saveSession(sessionData);
      Alert.alert("Success", "Session created successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save the session.");
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        title="New Session"
        leftIconName="close"
        onLeftPress={() => navigation.goBack()}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          <CreateSessionForm 
            availableBatches={availableBatches} 
            onSubmit={handleSessionSubmit} 
          />
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});