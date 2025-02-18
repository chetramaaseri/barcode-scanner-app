import React from 'react';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LogoName from '@/components/logos/LogoName';
import { ThemedButton } from '@/components/ThemedButton';
import { AppScale } from '@/AppScale';
import { router } from 'expo-router';

export default function Index() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<LogoName />}
      contentContainerStyle={{flex:1}}
    >
      <ThemedView style={styles.container}>
        <ThemedText type='heading' style={{marginBottom : AppScale(40), textAlign : 'center'}}>Welcome to Barcode Scanner</ThemedText>
        <ThemedButton style={{ marginTop: 10}} onPress={()=> router.push('/auth/sign-in')}>
          Start Scanning
        </ThemedButton>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf : 'center'
  },
  inputContainer: {
    marginBottom: 15
  }
});
