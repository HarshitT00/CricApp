import { ScreenWrapper } from '@/components/ScreenWrapper';
import { CameraFrame } from '@/components/CameraFrame';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function AttendanceScreen() {
  const navigation = useNavigation();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handlePhotoCaptured = (uri: string) => {
    setCapturedImage(uri);
    Alert.alert("Success", "Face scanned successfully!");
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Mark Attendance</Text>
      </View>

      <View style={styles.content}>
        
        {/* CONDITIONAL RENDERING */}
        {capturedImage ? (
          // 1. Show the captured result
          <View style={styles.resultContainer}>
             <Image source={{ uri: capturedImage }} style={styles.previewImage} />
             <Text style={styles.successText}>Player Verified</Text>
             
             <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake}>
               <Text style={styles.retakeText}>Scan Again</Text>
             </TouchableOpacity>
          </View>
        ) : (
          // 2. Show the Camera Component
          <>
            <Text style={styles.instruction}>
              Align face within the frame to mark attendance
            </Text>
            
            {/* The "Square Box" Component */}
            <CameraFrame 
              onPhotoCaptured={handlePhotoCaptured} 
            />
          </>
        )}

      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  backBtn: {
    padding: spacing.s,
    marginLeft: -spacing.s,
    marginRight: spacing.m,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    // Center content vertically if you prefer
    // justifyContent: 'center', 
  },
  instruction: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginBottom: spacing.l,
    fontSize: 16,
  },
  // Result Styles
  resultContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  previewImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: spacing.borderRadius * 2,
    marginBottom: spacing.l,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary, // Green or Blue
    marginBottom: spacing.xl,
  },
  retakeBtn: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: 50,
  },
  retakeText: {
    color: colors.text.primary,
    fontWeight: '600',
  },
});