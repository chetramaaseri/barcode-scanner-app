import { StyleSheet, Button } from 'react-native';
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
  const [permission, requestPermission] = useCameraPermissions();
  const scanTimeout = useRef<NodeJS.Timeout | null>(null);

  const getData = async () => {
    if (user && user.user_id) {
      const { data } = await getTotalScannedRange(user.user_id, getTodayDateRange());
      dispatch(setTotalScanned(data.total_scanned));
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const handleBarCodeScanned = async ({ data, cornerPoints, type }: BarcodeScanningResult) => {
    setScanned(true);
    if (scanTimeout.current) {
      clearTimeout(scanTimeout.current);
    }
    scanTimeout.current = setTimeout(async () => {
      dispatch(setIsLoading(true));
      if (user && user.user_id) {
        const response = await updateScannedCode(user.user_id, data);
        dispatch(setTotalScanned(response.data.total_scanned));
      }
      setScanned(false);
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
    if (scanTimeout.current) {
      clearTimeout(scanTimeout.current);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Scan Barcode</ThemedText>
      <ThemedText style={{ marginBottom: AppScale(10) }}>Place your barcode inside below box</ThemedText>
      {
        permission && permission.granted ?
          <CameraView onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} facing={facing} style={{ marginVertical: AppScale(15), height: 450, width: 300 }} barcodeScannerSettings={{ barcodeTypes: ["qr", 'aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'] }}></CameraView>
          :
          <>
            <ThemedText style={{ marginBottom: AppScale(20) }}>We need your permission to show the camera</ThemedText>
            <ThemedButton onPress={requestPermission}>Grant Permission</ThemedButton>
          </>
      }
      {scanned && (
        <Button title={"Cancel"} onPress={handleBarCodeScanCancel} />
      )}
      <ThemedText>Current User: {user?.name}</ThemedText>
      <ThemedText>Total Piece Scanned: {totalScanned}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

});
