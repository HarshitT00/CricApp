import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

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

  const handleImagePick = () => {
    console.log('Open Camera/Gallery');
  };

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageSection}>
        <TouchableOpacity style={styles.imageCircle} onPress={handleImagePick} activeOpacity={0.8}>
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
        value={formData.guardianInfo.name}
        onChangeText={text => updateField('name', text)}
      />

      <CustomInput
        label="Guardian Contact"
        placeholder="Enter emergency number"
        keyboardType="phone-pad"
        value={formData.guardianInfo.contactNumber}
        onChangeText={text => updateGuardianField('contactNumber', text)}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => onSubmit(formData)}
        disabled={isSubmitting}>
        <Text style={styles.submitButtonText}>
          {initialData ? 'Update Player' : 'Register Player'}
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.m,
  },
  imageSection: {
    alignItems: 'center',
    marginVertical: spacing.l,
  },
  imageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  uploadText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.m,
    marginTop: spacing.s,
  },
  row: {
    flexDirection: 'row',
  },
  halfWidthLeft: {
    flex: 1,
    marginRight: spacing.s,
  },
  halfWidthRight: {
    flex: 1.5,
    marginLeft: spacing.s,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.m,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.l,
  },
  submitButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 40,
  },
});
