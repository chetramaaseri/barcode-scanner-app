import React, { useState } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch } from 'react-redux';
import { setAuthentication, setIsLoading, setUser } from '../../redux/slices/sessionSlice';
import LogoName from '@/components/logos/LogoName';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { AppScale } from '@/AppScale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '@/api/Auth';

export default function SignIn() {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState<string>("8528965989");
  const [password, setPassword] = useState<string>("12345678");
  const mobileAuthLogin = async () => {
    if(mobile.length < 10){
      return alert('Please enter a valid mobile number');
    }
    if(password.length < 1){
      return alert('Please enter a valid password');
    }
    dispatch(setIsLoading(true));
    try {
      const response = await login(mobile, password);
      if(response.data){
        const { data } = response;
        await AsyncStorage.setItem('authToken',data.token);
        dispatch(setUser({ user_id : data.user_id, name : data.name, username : data.username,  mobile : data.mobile, email : data.email, role : data.role, scope : data.scope,  created_at : data.created_at}))
        dispatch(setAuthentication({ isAuthenticated: true, authToken: data.token }));
      }else if(response.error?.message){
        ToastAndroid.show(response.error.message,ToastAndroid.SHORT);
      }
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
            onChangeText={setMobile}
          />
        </ThemedView>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={{ marginBottom: 5, fontWeight: 'bold' }} >Password</ThemedText>
          <ThemedTextInput
            placeholder="Enter Password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
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
