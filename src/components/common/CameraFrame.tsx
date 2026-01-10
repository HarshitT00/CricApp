import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Button } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface Props {
  onPhotoCaptured: (uri: string) => void;
  onClose?: () => void;
}

export const CameraFrame = ({ onPhotoCaptured, onClose }: Props) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access needed</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          // DIRECT CALLBACK: No navigation params, no useEffect!
          onPhotoCaptured(photo.uri); 
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  }

  return (
    <View style={styles.container}>
      {/* The Square Viewfinder */}
      <View style={styles.viewfinder}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
        
        {/* Optional: Close Button Overlay */}
        {onClose && (
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close-circle" size={32} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Controls Row */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
          <View style={styles.captureInner} />
        </TouchableOpacity>

        {/* Empty placeholder for balance */}
        <View style={{ width: 48 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  permissionContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius,
  },
  permissionText: {
    marginBottom: spacing.m,
    color: colors.text.secondary,
  },
  viewfinder: {
    width: '100%',
    aspectRatio: 1, // Forces Square Shape
    borderRadius: spacing.borderRadius * 2,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: spacing.l,
    position: 'relative',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  camera: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  controls: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  secondaryBtn: {
    padding: spacing.m,
    backgroundColor: colors.surface,
    borderRadius: 50,
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
});