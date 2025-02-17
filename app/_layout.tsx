import '~/global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { Toaster } from 'sonner-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);
  const router = useRouter();

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status', error);
    }
  };

  React.useEffect(() => {
    if (!hasMounted.current) {
      setIsColorSchemeLoaded(true);
      hasMounted.current = true;
      checkLoginStatus();
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn !== null) {
      if (isLoggedIn) {
        router.replace('/(home)');
      } else {
        router.replace('/(auth)');
      }
    }
  }, [isLoggedIn]);

  if (!isColorSchemeLoaded || isLoggedIn === null) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <Stack screenOptions={{ animation: 'ios_from_right' }}>
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='(home)/index' options={{ headerShown: false }} />
        </Stack>
        <Toaster position='bottom-center' />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
