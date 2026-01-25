/**
 * PWA Type Definitions
 * TypeScript declarations for Progressive Web App APIs
 */

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface Navigator {
  standalone?: boolean;
}

interface Window {
  deferredPrompt?: BeforeInstallPromptEvent;
  showInstallPrompt?: () => void;
}

interface WindowEventMap {
  beforeinstallprompt: BeforeInstallPromptEvent;
  appinstalled: Event;
}

// Service Worker types
interface ServiceWorkerGlobalScope {
  skipWaiting(): Promise<void>;
}

// Web Share API
interface Navigator {
  share?: (data: ShareData) => Promise<void>;
  canShare?: (data?: ShareData) => boolean;
}

interface ShareData {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

// Display Mode
interface MediaQueryList {
  matches: boolean;
  media: string;
  addEventListener(type: 'change', listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any): void;
  removeEventListener(type: 'change', listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any): void;
}

declare global {
  interface Window {
    matchMedia(query: string): MediaQueryList;
  }
}

export {};
