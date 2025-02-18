import React, { useState } from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { increment, decrement, incrementByAmount } from '../../redux/slices/counterSlice';
import { setAuthentication, revokeAuthentication } from '../../redux/slices/sessionSlice';
import { Image } from 'expo-image';
import LogoName from '@/components/logos/LogoName';
import { Button, TextInput } from 'react-native-paper';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { AppScale } from '@/AppScale';
import { Link } from 'expo-router';

interface Credentials {
  mobile: string;
  password: string
}

export default function SignIn() {
  const [credentials, setCredentials] = useState<Credentials>({
    mobile: '',
    password: ''
  });
  const [mobile, setMobile] = useState<string>("");
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<LogoName />}>
      <ThemedView style={styles.container}>
        <ThemedText type='heading' style={{marginBottom : AppScale(40)}}>Forgot Password</ThemedText>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={{ marginBottom: 5, fontWeight: 'bold' }} >Mobile Number</ThemedText>
          <ThemedTextInput
            placeholder="Enter Mobile Number"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />
        </ThemedView>
        <ThemedButton style={{ marginTop: 10}} onPress={()=>{}}>
          Send OTP
        </ThemedButton>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 15
  }
});
