import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import "../global.css";

import { Colors } from '@/constants/design-tokens';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { initializeNotifications } from '@/lib/notifications';
import { useSettingsStore } from '@/store/settings-store';
import { useWordStore } from '@/store/word-store';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  const { hasCompletedOnboarding, _hasHydrated: settingsHydrated, hydrate: hydrateSettings } = useSettingsStore();
  const { _hasHydrated: wordHydrated, hydrate: hydrateWords } = useWordStore();

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  // Hydrate stores and initialize notifications on mount
  useEffect(() => {
    const init = async () => {
      await Promise.all([
        hydrateSettings(),
        hydrateWords(),
      ]);

      // Initialize notifications (iOS/Android only)
      await initializeNotifications();

      setIsReady(true);
    };
    init();
  }, []);

  // Handle navigation after hydration
  useEffect(() => {
    if (!isReady || !fontsLoaded || !settingsHydrated || !wordHydrated) {
      return;
    }

    const inOnboarding = segments[0] === 'onboarding';

    if (!hasCompletedOnboarding && !inOnboarding) {
      router.replace('/onboarding');
    } else if (hasCompletedOnboarding && inOnboarding) {
      router.replace('/(tabs)');
    }

    SplashScreen.hideAsync();
  }, [isReady, fontsLoaded, settingsHydrated, wordHydrated, hasCompletedOnboarding, segments]);

  if (!fontsLoaded || !isReady || !settingsHydrated || !wordHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1, width: '100%', backgroundColor: Colors.background }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="history" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
        </Stack>
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
