import React from 'react';
import { StyleSheet, Image, Platform, Button, View, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { increment, decrement, incrementByAmount } from '../../redux/slices/counterSlice';
import { setAuthentication, revokeAuthentication } from '../../redux/slices/sessionSlice';

export default function SignIn() {
  const count = useSelector((state: RootState) => state.counter.value);
  const {isAuthenticated, authToken} = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  return (
    <>
    <ThemedView style={{flex:1, justifyContent:'center'}}>
        <ThemedText>Text Login Page</ThemedText>
    </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
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
