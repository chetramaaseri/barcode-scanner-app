import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ExpoRoot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { registerRootComponent } from 'expo';
import { RootState, store } from './redux/store';
import { AppLoader } from './components/AppLoader';
import { loadSession } from './redux/slices/sessionSlice';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const { isLoading, isLoaded } = useSelector((state: RootState) => state.session);

    useEffect(() => {
      const initializeApp = async () => {
        await dispatch(loadSession());
      };
      initializeApp();
    }, [dispatch]);
  
    if (isLoading || !isLoaded) {
      return <AppLoader />;
    }
  
    return <>{children}</>;
  }

export default function App() {
    const ctx = require.context('./app');
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <PaperProvider>
                    <AppInitializer>
                        <ExpoRoot context={ctx} />
                        <StatusBar style="auto" />
                    </AppInitializer>
                </PaperProvider>
            </ThemeProvider>
        </Provider>
    );
}


registerRootComponent(App);