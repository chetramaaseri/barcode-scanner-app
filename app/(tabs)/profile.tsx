import { StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { revokeAuthentication } from '../../redux/slices/sessionSlice';
import { ThemedButton } from '@/components/ThemedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfileScreen() {
  const { user } = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    dispatch(revokeAuthentication());
  }

  return (
    <ThemedView style={styles.container}>
      <Image 
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }} 
        style={styles.profileImage} 
      />
      <ThemedText type="title" style={styles.name}>{user?.name || 'Guest User'}</ThemedText>
      <ThemedView style={{marginBottom : 10}}>
        <ThemedText type="defaultSemiBold">Username</ThemedText>
        <ThemedText style={styles.userDetail}>{user?.username}</ThemedText>
      </ThemedView>
      <ThemedView style={{marginBottom : 10}}>
        <ThemedText type="defaultSemiBold">Mobile</ThemedText>
        <ThemedText style={styles.userDetail}>{user?.mobile}</ThemedText>
      </ThemedView>
      <ThemedView style={{marginBottom : 10}}>
        <ThemedText type="defaultSemiBold">Email</ThemedText>
        <ThemedText style={styles.userDetail}>{user?.email}</ThemedText>
      </ThemedView>
      <ThemedView style={{marginBottom : 10}}>
        <ThemedText type="defaultSemiBold">Role</ThemedText>
        <ThemedText style={styles.userDetail}>{user?.role}</ThemedText>
      </ThemedView>
      <ThemedView style={{marginBottom : 10}}>
        <ThemedText type="defaultSemiBold">Total Scanned</ThemedText>
        <ThemedText style={styles.userDetail}>2500</ThemedText>
      </ThemedView>
      <ThemedButton style={{ marginTop: 10}} onPress={logout}>
        Logout
      </ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
  authStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  token: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  buttons: {
    marginTop: 20,
    width: '80%',
  },
  userDetail: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 5,
    paddingHorizontal : 10,
    paddingVertical : 8,
  }
});
