import { StyleSheet, Button, Animated, Easing, Image, ToastAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { AppScale } from '@/AppScale';
import { ThemedButton } from '@/components/ThemedButton';
import { getTodayDateRange, getTotalScannedRange, updateScannedCode } from '@/api/Scanning';
import { setIsLoading, setTotalScanned } from '@/redux/slices/sessionSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { user, totalScanned } = useSelector((state: RootState) => state.session);
  const [facing] = useState<CameraType>('back');
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null); // Store scanned barcode data
  const [permission, requestPermission] = useCameraPermissions();
  const scanTimeout = useRef<NodeJS.Timeout | null>(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!scanned) {
      startScanAnimation();
    } else {
      animationRef.current?.stop();
    }
  }, [scanned]);

  const getData = async () => {
    if (user && user.user_id) {
      try {
        const response = await getTotalScannedRange(user.user_id, getTodayDateRange());
        if(response.data){
          const { data } = response;
          dispatch(setTotalScanned(data.total_scanned));
        }else{
          ToastAndroid.show(response.error?.message ?? 'An unknown error occurred', ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show('An unknown error occurred', ToastAndroid.LONG);
      }
    }
  };

  const startScanAnimation = () => {
    scanLineAnim.setValue(0);
    animationRef.current = Animated.loop(
      Animated.timing(scanLineAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animationRef.current.start();
  };

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    setScannedData(data);
    ToastAndroid.show(`Scanned ${data}`, ToastAndroid.SHORT);
    if (scanTimeout.current) {
      clearTimeout(scanTimeout.current);
    }
    scanTimeout.current = setTimeout(async () => {
      dispatch(setIsLoading(true));
      if (user && user.user_id) {
        const response = await updateScannedCode(user.user_id, data);
        if(response.data){
          dispatch(setTotalScanned(response.data.total_scanned));
        }else if(response.error?.message){
          ToastAndroid.show(response.error.message,ToastAndroid.SHORT);
        }
      }
      setScanned(false);
      setScannedData(null);
      ToastAndroid.show(`Added Successfully!`, ToastAndroid.SHORT);
      dispatch(setIsLoading(false));
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (scanTimeout.current) {
        clearTimeout(scanTimeout.current);
      }
    };
  }, []);

  const handleBarCodeScanCancel = () => {
    setScanned(false);
    setScannedData(null);
    if (scanTimeout.current) {
      clearTimeout(scanTimeout.current);
    }
  };

  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 450],
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Scan Barcode</ThemedText>
      <ThemedText style={{ marginBottom: AppScale(10) }}>Place your barcode inside below box</ThemedText>
      {
        permission && permission.granted ? (
          <ThemedView style={styles.cameraContainer}>
            <CameraView
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              facing={facing}
              style={styles.camera}
              barcodeScannerSettings={{
                barcodeTypes: [
                  "qr", "aztec", "ean13", "ean8", "qr", "pdf417", "upc_e",
                  "datamatrix", "code39", "code93", "itf14", "codabar", "code128", "upc_a"
                ]
              }}
            >
              <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
              {scannedData && (
                <ThemedView style={styles.scannedDataContainer}>
                  <ThemedText style={styles.scannedDataText}>Scanned: {scannedData}</ThemedText>
                </ThemedView>
              )}
            </CameraView>
          </ThemedView>
        ) : (
          <>
            <ThemedText style={{ marginBottom: AppScale(20) }}>We need your permission to show the camera</ThemedText>
            <ThemedButton onPress={requestPermission}>Grant Permission</ThemedButton>
          </>
        )
      }
      {
        scanned && <ThemedView style={{marginVertical : AppScale(10)}}>
          <Button title={"Cancel"} onPress={handleBarCodeScanCancel} />
        </ThemedView>
      }
      <ThemedView style={{marginVertical : AppScale(10)}}>
        <ThemedText>Current User: {user?.name}</ThemedText>
        <ThemedText>Total Piece Scanned: {totalScanned}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  camera: {
    marginVertical: AppScale(15),
    height: 450,
    width: 300,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 4,
    backgroundColor: 'red',
    opacity: 0.8,
  },
  scannedDataContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  scannedDataText: {
    color: 'white',
    fontSize: 16,
  },
  scannedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});