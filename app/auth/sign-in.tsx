import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch } from 'react-redux';
import { setAuthentication, setIsLoading } from '../../redux/slices/sessionSlice';
import LogoName from '@/components/logos/LogoName';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { AppScale } from '@/AppScale';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Credentials {
  mobile: string;
  password: string
}

export default function SignIn() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<Credentials>({
    mobile: '',
    password: ''
  });
  const mobileAuthLogin = async () => {
    if(credentials.mobile.length < 10){
      return alert('Please enter a valid mobile number');
    }
    if(credentials.password.length < 8){
      return alert('Please enter a valid password');
    }
    dispatch(setIsLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await AsyncStorage.setItem('authToken','loginToken');
    dispatch(setAuthentication({ isAuthenticated: true, authToken: 'loginToken' }));
    dispatch(setIsLoading(false));
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<LogoName />}>
      <ThemedView style={styles.container}>
        <ThemedText type='heading' style={{marginBottom : AppScale(40)}}>Sign In</ThemedText>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={{ marginBottom: 5, fontWeight: 'bold' }} >Mobile Number</ThemedText>
          <ThemedTextInput
            placeholder="Enter Mobile Number"
            value={credentials.mobile}
            keyboardType="numeric"
            onChangeText={(text) => setCredentials({...credentials, mobile: text})}
          />
        </ThemedView>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={{ marginBottom: 5, fontWeight: 'bold' }} >Password</ThemedText>
          <ThemedTextInput
            placeholder="Enter Password"
            value={credentials.password}
            secureTextEntry={true}
            onChangeText={(text) => setCredentials({...credentials, password: text})}
          />
        </ThemedView>
        <ThemedButton style={{ marginTop: 10}} onPress={mobileAuthLogin}>
          Sign In
        </ThemedButton>
        {/* <Link href="/auth/forgot-password" style={{marginVertical : AppScale(10)}}>
            <ThemedText type='link' style={{textAlign: 'center', fontSize : AppScale(14) }} >Forgot Password?</ThemedText>
        </Link> */}
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
