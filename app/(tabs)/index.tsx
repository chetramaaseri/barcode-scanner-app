import { Image, StyleSheet, Platform, Button } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import React, { useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { increment, decrement, incrementByAmount } from '../../redux/slices/counterSlice';
import { setAuthentication, revokeAuthentication } from '../../redux/slices/sessionSlice';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { AppLoader } from '@/components/AppLoader';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AppScale } from '@/AppScale';

export default function HomeScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const count = useSelector((state: RootState) => state.counter.value);
  const {isAuthenticated, authToken} = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  const handleBarCodeScanned = ({ data, cornerPoints, type }: BarcodeScanningResult) => {
    setScanned(true);
    alert(`Type: ${type}\nData: ${data}`);
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Scan Barcode</ThemedText>
      <ThemedText style={{marginBottom : AppScale(10)}}>Place your barcode inside below box</ThemedText>
      {
        permission && permission.granted ?
            <CameraView onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} facing={facing} style={{marginVertical: AppScale(15),height: 450, width : 300}} barcodeScannerSettings={{barcodeTypes: ["qr", 'aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a']}}></CameraView>
          :
            <>
              <ThemedText style={{marginBottom : AppScale(20)}}>We need your permission to show the camera</ThemedText>
              <Button onPress={requestPermission} title="grant permission" />
            </>
      }
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </ThemedView>
  )
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
    
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore {authToken}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
        <MaterialIcons name="home" size={24} color="black" />
        <IconSymbol size={28} name="paperplane.fill" color={"#000"} />
      </ThemedView>
      {
        permission && !permission.granted &&
            <ThemedView style={styles.container}>
              <ThemedText>We need your permission to show the camera</ThemedText>
              <Button onPress={requestPermission} title="grant permission" />
            </ThemedView>
      }
      <CameraView onBarcodeScanned={()=>{console.log("davdvkjn")}} style={{width:300,height:300}} barcodeScannerSettings={{barcodeTypes: ["qr", 'aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],}} type={'back'} permission={permission}>

      </CameraView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
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
