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
import { useAuth } from '@/store/use-auth';

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
  const setToken = useAuth(state => state.setToken)

  const checkLoginStatus = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const expiresAt = await AsyncStorage.getItem('expiresAt');
      const isAccessTokenValid = expiresAt && new Date().getTime() < parseInt(expiresAt, 10);

      if (accessToken && refreshToken && isAccessTokenValid) {
        setToken(accessToken, refreshToken)
        setIsLoggedIn(true);
      } else if (refreshToken) {
        const response = await useAuth.getState().getAccessToken();
        if (response.success) {
          await AsyncStorage.setItem("accessToken", response.data.accessToken);
          await AsyncStorage.setItem("expiresAt", (Date.now() + 60 * 60 * 1000 * 24).toString());
          setToken(response.data.accessToken, refreshToken)
          setIsLoggedIn(true);
        } else {
          await AsyncStorage.multiRemove(["accessToken", "refreshToken", "expiresAt"]);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
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
      <Toaster position='bottom-center' />
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <Stack screenOptions={{ animation: 'ios_from_right' }}>
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='(home)' options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
