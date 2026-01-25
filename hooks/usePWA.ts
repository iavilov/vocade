/**
 * PWA Hook
 * React hook for PWA functionality
 */

import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { isPWA, isInstallable, promptInstall, getDisplayMode, checkForUpdate } from '@/lib/pwa-utils';

interface PWAState {
  isPWA: boolean;
  isInstallable: boolean;
  displayMode: 'browser' | 'standalone' | 'minimal-ui' | 'fullscreen';
  isOnline: boolean;
  hasUpdate: boolean;
}

export function usePWA() {
  const [state, setState] = useState<PWAState>({
    isPWA: false,
    isInstallable: false,
    displayMode: 'browser',
    isOnline: true,
    hasUpdate: false,
  });

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Initialize state
    setState({
      isPWA: isPWA(),
      isInstallable: isInstallable(),
      displayMode: getDisplayMode(),
      isOnline: navigator.onLine,
      hasUpdate: false,
    });

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      (window as any).deferredPrompt = e;
      setState(prev => ({ ...prev, isInstallable: true }));
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setState(prev => ({ ...prev, isInstallable: false, isPWA: true }));
    };

    // Listen for online/offline status
    const handleOnline = () => {
      setState(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setState(prev => ({ ...prev, isOnline: false }));
    };

    // Listen for service worker updates
    const handleControllerChange = () => {
      setState(prev => ({ ...prev, hasUpdate: true }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      }
    };
  }, []);

  return {
    ...state,
    install: promptInstall,
    checkForUpdate,
  };
}
