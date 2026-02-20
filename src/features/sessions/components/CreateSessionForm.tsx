import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FormInput } from '@/components/FormInput';
import { colors } from '@/constants/colors';

interface CreateSessionFormProps {
  onSubmit: (sessionData: { title: string; location: string; date: string; overs: string }) => void;
}

export const CreateSessionForm: React.FC<CreateSessionFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [overs, setOvers] = useState('');

  const handleSubmit = () => {
    if (!title) return; 
    
    onSubmit({ title, location, date, overs });
  };

  return (
    <View style={styles.container}>
      <FormInput 
        label="Session Name" 
        placeholder="e.g., Weekend Practice" 
        value={title}
        onChangeText={setTitle}
      />
      
      <FormInput 
        label="Location / Ground" 
        placeholder="e.g., Central Park Ground" 
        value={location}
        onChangeText={setLocation}
      />

      <FormInput 
        label="Date & Time" 
        placeholder="e.g., 24 Feb, 10:00 AM" 
        value={date}
        onChangeText={setDate}
      />

      <FormInput 
        label="Total Overs" 
        placeholder="e.g., 20" 
        keyboardType="numeric"
        value={overs}
        onChangeText={setOvers}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});