import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
// ADDED IMPORT
import { registerFace } from 'react-native-facerecognition';

import { CustomInput } from '@/components/CustomInput';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { PlayerInfo } from '@/types/PlayerInfo';

interface PlayerFormProps {
  initialData?: PlayerInfo;
  onSubmit: (data: PlayerInfo) => void;
  isSubmitting?: boolean;
}

export const PlayerForm = ({ initialData, onSubmit, isSubmitting }: PlayerFormProps) => {
  const [formData, setFormData] = useState<PlayerInfo>({
    id: initialData?.id || '',
    name: initialData?.name || '',
    age: initialData?.age || '',
    role: initialData?.role || 'Batsman',
    contactNumber: initialData?.contactNumber || '',
    image: initialData?.image || '',
    guardianInfo: {
      name: initialData?.guardianInfo?.name || '',
      contactNumber: initialData?.guardianInfo?.contactNumber || '',
    },
  });

  const updateField = (key: keyof PlayerInfo, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const updateGuardianField = (key: 'name' | 'contactNumber', value: string) => {
    setFormData(prev => ({
      ...prev,
      guardianInfo: {
        ...prev.guardianInfo,
        [key]: value,
      },
    }));
  };

  const handleOpenCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission Required', 'Camera permission is required to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'], // Fixed deprecation warning
      allowsEditing: false,
      quality: 0.85,
    });

    if (!result.canceled && result.assets.length > 0) {
      console.log('📸 Camera captured image:', result.assets[0].uri);
      updateField('image', result.assets[0].uri);
    }
  };

  // UPDATED: Made async and added registerFace logic
  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation', 'Please enter a player name.');
      return;
    }

    if (formData.image) {
      try {
        console.log(`🤖 Attempting to register face for: ${formData.name}`);
        const registerStatus = await registerFace(formData.name, formData.image);
        console.log('✅ Face registration success:', registerStatus);
      } catch (error) {
        console.error('❌ Failed to register face in library:', error);
        Alert.alert('Warning', 'Player details will be saved, but face registration failed.');
      }
    } else {
      console.log('⚠️ No image provided, skipping face registration.');
    }

    onSubmit(formData);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}>  

      <View style={styles.imageSection}>
        <TouchableOpacity
          style={styles.imageCircle}
          onPress={handleOpenCamera}
          activeOpacity={0.8}>
          {formData.image ? (
            <Image source={{ uri: formData.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="camera" size={40} color={colors.primary} />
              <Text style={styles.uploadText}>Add Photo</Text>
            </View>
          )}
          <View style={styles.editBadge}>
            <Ionicons name="pencil" size={14} color={colors.background} />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Player Details</Text>

      <CustomInput
        label="Full Name"
        placeholder="Enter player's full name"
        value={formData.name}
        onChangeText={text => updateField('name', text)}
      />

      <View style={styles.row}>
        <View style={styles.halfWidthLeft}>
          <CustomInput
            label="Age"
            placeholder="e.g. 18"
            keyboardType="number-pad"
            value={formData.age}
            onChangeText={text => updateField('age', text)}
          />
        </View>
        <View style={styles.halfWidthRight}>
          <CustomInput
            label="Role"
            placeholder="e.g. Batsman"
            value={formData.role}
            onChangeText={text => updateField('role', text as any)}
          />
        </View>
      </View>

      <CustomInput
        label="Contact Number"
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={formData.contactNumber}
        onChangeText={text => updateField('contactNumber', text)}
      />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Emergency Contact</Text>

      <CustomInput
        label="Guardian Name"
        placeholder="Enter guardian's name"
        value={formData.guardianInfo?.name}
        onChangeText={text => updateGuardianField('name', text)}
      />

      <CustomInput
        label="Guardian Contact"
        placeholder="Enter emergency number"
        keyboardType="phone-pad"
        value={formData.guardianInfo?.contactNumber}
        onChangeText={text => updateGuardianField('contactNumber', text)}
      />

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSave}
        disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>
            {initialData ? 'Update Player' : 'Register Player'}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: spacing.m },
  imageSection: { alignItems: 'center', marginVertical: spacing.l },
  imageCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  profileImage: { width: '100%', height: '100%', borderRadius: 60 },
  placeholderContainer: { alignItems: 'center' },
  uploadText: { color: colors.primary, fontSize: 12, fontWeight: '600', marginTop: 4 },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.background },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.m, marginTop: spacing.s },
  row: { flexDirection: 'row' },
  halfWidthLeft: { flex: 1, marginRight: spacing.s },
  halfWidthRight: { flex: 1.5, marginLeft: spacing.s },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.m },
  submitButton: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: spacing.l },
  submitButtonDisabled: { opacity: 0.7 },
  submitButtonText: { color: colors.background, fontSize: 16, fontWeight: 'bold' },
  bottomPadding: { height: 40 },
  scrollContent: { flexGrow: 1 },
});