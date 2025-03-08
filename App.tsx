import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ExpoRoot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { registerRootComponent } from 'expo';
import { AppDispatch, RootState, store } from './redux/store';
import { AppLoader } from './components/AppLoader';
import { loadSession } from './redux/slices/sessionSlice';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


const paperThemeLight = {
    ...MD3LightTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

const paperThemeDark = {
    ...MD3LightTheme,
    colors: {
        ...DarkTheme.colors,
    },
};

function AppInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, isLoaded } = useSelector((state: RootState) => state.session);

    useEffect(() => {
        const initializeApp = async () => {
            dispatch(loadSession());
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
        UbuntuBold: require('./assets/fonts/Ubuntu-Bold.ttf'),
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
                <PaperProvider theme={colorScheme === 'dark' ? paperThemeDark : paperThemeLight}>
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