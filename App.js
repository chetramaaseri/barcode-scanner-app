import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ExpoRoot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { store } from './redux/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


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
                    <ExpoRoot context={ctx} />
                    <StatusBar style="auto" />
                </PaperProvider>
            </ThemeProvider>
        </Provider>
    );
}


registerRootComponent(App);