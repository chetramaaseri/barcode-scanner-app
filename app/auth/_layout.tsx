import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function AuthLayout() {
  const { isAuthenticated, isLoaded } = useSelector((state: RootState) => state.session);
  if (isLoaded && isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
    </Stack>
  )
}
