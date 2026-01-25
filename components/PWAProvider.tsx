/**
 * PWA Provider Component
 * Wraps app with PWA functionality and monitoring
 */

import React, { useEffect } from 'react';
import { Platform } from 'react-native';

interface PWAProviderProps {
  children: React.ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  useEffect(() => {
    // Only run on web
    if (Platform.OS !== 'web') return;

    // Log PWA status
    const checkPWAStatus = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      const isPWA = isStandalone || isIOSStandalone;

      console.log('[PWA] Status:', {
        isPWA,
        isStandalone,
        isIOSStandalone,
        userAgent: navigator.userAgent,
      });
    };

    checkPWAStatus();

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => {
      console.log('[PWA] Display mode changed:', e.matches ? 'standalone' : 'browser');
    };

    mediaQuery.addEventListener('change', handleChange);

    // Listen for app installed
    const handleAppInstalled = () => {
      console.log('[PWA] App was installed');
      // You can track this event in analytics
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return <>{children}</>;
}
