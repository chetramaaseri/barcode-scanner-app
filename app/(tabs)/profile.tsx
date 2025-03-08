import { StyleSheet, Image, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setAuthentication, revokeAuthentication } from '../../redux/slices/sessionSlice';

export default function UserProfileScreen() {
  const { isAuthenticated, authToken } = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();

  return (
    <ThemedView style={styles.container}>
      <Image source={{uri : 'https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} style={styles.profileImage} />
      <ThemedText type="title">User Profile</ThemedText>
      <ThemedText style={styles.info}>Authentication Status: {isAuthenticated ? 'Logged In' : 'Logged Out'}</ThemedText>
      {isAuthenticated && <ThemedText style={styles.info}>Auth Token: {authToken}</ThemedText>}
      
      <ThemedView style={styles.buttons}>
        {isAuthenticated ? (
          <Button title="Logout" onPress={() => dispatch(revokeAuthentication())} />
        ) : (
          <Button title="Login" onPress={() => dispatch(setAuthentication({ isAuthenticated: true, authToken: 'cheeku' }))} />
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttons: {
    marginTop: 20,
  },
});