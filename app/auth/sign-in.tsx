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
import { login } from '@/api/Auth';

interface Credentials {
  mobile: string;
  password: string
}

export default function SignIn() {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const mobileAuthLogin = async () => {
    if(mobile.length < 10){
      return alert('Please enter a valid mobile number');
    }
    if(password.length < 1){
      return alert('Please enter a valid password');
    }
    // dispatch(setIsLoading(true));
    try {
      const { data : { token } } = await login(mobile, password);
      await AsyncStorage.setItem('authToken',token);
      dispatch(setAuthentication({ isAuthenticated: true, authToken: token }));
    } catch (error) {
      alert((error as Error).message);
    }
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
            value={mobile}
            keyboardType="numeric"
            onChangeText={(text) => setMobile(text)}
          />
        </ThemedView>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={{ marginBottom: 5, fontWeight: 'bold' }} >Password</ThemedText>
          <ThemedTextInput
            placeholder="Enter Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
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
