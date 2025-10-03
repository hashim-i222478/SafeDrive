import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Camera, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import { useTheme } from '../../theme';
import { Button } from '../../components/ui';

type PermissionState = 'unknown' | 'granted' | 'denied' | 'blocked' | 'unavailable';

const PermissionGate: React.FC<{ children: React.ReactNode; onGranted?: () => void; }> = ({ children, onGranted }) => {
  const theme = useTheme();
  const { hasPermission, requestPermission } = useCameraPermission();

  const openSettings = useCallback(() => {
    Linking.openSettings().catch(() => {
      // no-op fallback
    });
  }, []);

  if (hasPermission) {
    return <>{children}</>;
  }

  return (
    <View style={[styles.gateContainer, { backgroundColor: theme.colors.background.primary }]}> 
      <Icon name="camera-alt" size={48} color={theme.colors.warning[500]} />
      <Text style={[styles.gateTitle, theme.typography.heading.h4, { color: theme.colors.text.primary }]}>Camera access needed</Text>
      <Text style={[styles.gateSubtitle, theme.typography.body.medium, { color: theme.colors.text.secondary }]}>We need your permission to access the camera.</Text>
      <Button 
        title="Allow Camera" 
        onPress={async () => {
          const granted = await requestPermission();
          if (granted) {
            onGranted && onGranted();
          }
        }} 
        style={{ marginTop: theme.spacing[4], width: '100%' }} 
        fullWidth 
      />
      <Button 
        title="Open Settings" 
        onPress={openSettings} 
        variant="outline"
        style={{ marginTop: theme.spacing[2], width: '100%' }} 
        fullWidth 
      />
    </View>
  );
};

export const CameraScreen: React.FC = () => {
  const theme = useTheme();
  const devices = useCameraDevices();
  const [frontDevice, setFrontDevice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Find front camera device
  useEffect(() => {
    if (devices && Object.keys(devices).length > 0) {
      const front = Object.values(devices).find((device: any) => device.position === 'front');
      setFrontDevice(front || null);
      setIsLoading(false);
    }
  }, [devices]);

  const renderCameraContent = () => {
    if (isLoading) {
      return (
        <View style={styles.center}>
          <Icon name="refresh" size={48} color={theme.colors.primary[500]} />
          <Text style={[styles.previewText, theme.typography.body.medium, { color: theme.colors.text.secondary }]}>
            Discovering camera devices...
          </Text>
        </View>
      );
    }

    if (!frontDevice) {
      return (
        <View style={styles.center}>
          <Icon name="camera-alt" size={48} color={theme.colors.warning[500]} />
          <Text style={[styles.previewText, theme.typography.body.medium, { color: theme.colors.text.secondary }]}>
            No front camera found
          </Text>
        </View>
      );
    }

    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={frontDevice}
        isActive={true}
        pixelFormat="yuv"
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}> 
      <View style={styles.header}> 
        <Text style={[styles.title, theme.typography.heading.h3, { color: theme.colors.text.primary }]}> 
          Camera Preview 
        </Text>
        <Text style={[styles.subtitle, theme.typography.body.medium, { color: theme.colors.text.secondary }]}> 
          AI drowsiness monitoring active
        </Text>
      </View>

      <View style={[styles.preview, { backgroundColor: theme.colors.background.secondary }]}> 
        <PermissionGate>
          {renderCameraContent()}
        </PermissionGate>
      </View>

      <View style={styles.actions} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {},
  preview: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  previewText: {
    marginTop: 12,
    textAlign: 'center',
  },
  actions: {
    padding: 16,
  },
  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  gateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  gateTitle: {
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  gateSubtitle: {
    textAlign: 'center',
  },
});

export default CameraScreen;


