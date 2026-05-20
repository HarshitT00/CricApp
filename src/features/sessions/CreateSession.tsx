import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Alert } from 'react-native';

import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { colors } from '@/constants/colors';
import { CreateSessionForm } from '@/features/sessions/components/CreateSessionForm';
import { RootStackParamList } from '@/navigation/types';
import { batchStorage } from '@/services/batchStorage';
import { sessionStorage } from '@/services/sessionStorage';
import { Batch } from '@/types/Batch';

export const CreateSession = () => {
  const navigation = useNavigation();
  
  // 1. Check if we are in Edit Mode
  const route = useRoute<RouteProp<RootStackParamList, 'CreateSession'>>();
  const sessionInfo = route.params?.sessionInfo;
  const isEditMode = !!sessionInfo;

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
      // 2. Attach the ID if we are editing!
      const finalData = { ...sessionData, id: sessionInfo?.id };
      
      await sessionStorage.saveSession(finalData);
      Alert.alert("Success", `Session ${isEditMode ? 'updated' : 'created'} successfully!`);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save the session.");
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        title={isEditMode ? "Edit Session" : "New Session"}
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
            initialData={sessionInfo} // 3. Pass data to the form
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