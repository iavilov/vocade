# PWA Setup Documentation

## Overview

Wortday is configured as a Progressive Web App (PWA) with full offline support and installability on mobile and desktop devices.

## Features

- **Standalone Display Mode**: Runs without browser UI (address bar, navigation buttons)
- **Offline Support**: Service Worker caches assets and API responses
- **Installable**: Can be installed to home screen/desktop
- **App-like Experience**: Full-screen mode with native app feel
- **Fast Loading**: Aggressive caching for instant load times
- **Auto-updates**: Automatic service worker updates with user notification

## File Structure

```
wortday/
├── public/
│   ├── index.html           # Custom HTML with PWA meta tags
│   ├── manifest.json        # PWA manifest configuration
│   ├── service-worker.js    # Service worker for offline support
│   ├── icon-144.png        # App icon 144x144
│   ├── icon-192.png        # App icon 192x192 (minimum for Android)
│   ├── icon-384.png        # App icon 384x384
│   ├── icon-512.png        # App icon 512x512 (for splash screen)
│   └── favicon.png         # Browser favicon
├── lib/
│   └── pwa-utils.ts        # PWA helper functions
├── hooks/
│   └── usePWA.ts           # React hook for PWA functionality
└── components/
    └── PWAInstallBanner.tsx # Install prompt UI component
```

## Configuration

### Manifest Settings

The `manifest.json` configures how the app behaves when installed:

- **Display Mode**: `standalone` (hides browser UI)
- **Orientation**: `portrait` (mobile-first)
- **Theme Color**: `#6BCF7F` (Wortday green)
- **Background Color**: `#FFFAF0` (cream background)
- **Icons**: Multiple sizes for different platforms
- **Shortcuts**: Quick access to Today's Word and History

### Service Worker Strategy

The service worker uses different caching strategies:

1. **Static Assets** (Cache First):
   - HTML, CSS, JavaScript
   - Images, fonts, icons
   - Served from cache, updated in background

2. **API Calls** (Network First):
   - Supabase REST API (`/rest/v1/`)
   - Supabase Auth API (`/auth/v1/`)
   - Fresh data preferred, cache as fallback

3. **Runtime Cache**:
   - Dynamic content cached as accessed
   - Cleaned up on service worker update

### Meta Tags

The custom `index.html` includes PWA-specific meta tags:

```html
<!-- Standalone mode -->
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- Status bar styling -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- Theme color -->
<meta name="theme-color" content="#6BCF7F" />

<!-- Prevent pull-to-refresh -->
<style>
  body { overscroll-behavior-y: contain; }
</style>
```

## Usage

### Installing the PWA

**iOS (Safari):**
1. Open app.wortday.com in Safari
2. Tap Share button (box with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

**Android (Chrome):**
1. Open app.wortday.com in Chrome
2. Tap the menu (⋮)
3. Tap "Install app" or "Add to Home screen"
4. Tap "Install"

**Desktop (Chrome/Edge):**
1. Open app.wortday.com
2. Click the install icon in address bar
3. Or use menu > "Install Wortday"
4. Click "Install"

### Using PWA Components

#### PWA Install Banner

Add to any screen to prompt installation:

```tsx
import { PWAInstallBanner } from '@/components/PWAInstallBanner';

export default function HomeScreen() {
  return (
    <View>
      <PWAInstallBanner />
      {/* Rest of your content */}
    </View>
  );
}
```

#### usePWA Hook

Access PWA state and functions:

```tsx
import { usePWA } from '@/hooks/usePWA';

export default function SettingsScreen() {
  const { isPWA, isInstallable, isOnline, hasUpdate, install, checkForUpdate } = usePWA();

  return (
    <View>
      {isPWA && <Text>Running as installed app</Text>}
      {isInstallable && (
        <Button onPress={install} title="Install App" />
      )}
      {!isOnline && <Text>Offline mode</Text>}
      {hasUpdate && (
        <Button onPress={() => window.location.reload()} title="Update Available" />
      )}
    </View>
  );
}
```

#### PWA Utilities

Direct utility functions:

```tsx
import { isPWA, promptInstall, shareContent, getDisplayMode } from '@/lib/pwa-utils';

// Check if running as PWA
if (isPWA()) {
  console.log('Running in standalone mode');
}

// Share content
await shareContent({
  title: 'Wortday',
  text: 'Check out this German learning app!',
  url: 'https://app.wortday.com'
});

// Get display mode
const mode = getDisplayMode(); // 'standalone', 'browser', etc.
```

## Testing

### Local Testing

1. Build web version:
   ```bash
   npm run build:web
   ```

2. Serve with HTTPS (required for service workers):
   ```bash
   npx serve dist -s -l 8080 --ssl-cert cert.pem --ssl-key key.pem
   ```

3. Open in browser and check:
   - Service worker registration in DevTools > Application
   - Manifest in DevTools > Application > Manifest
   - Install prompt appears
   - Offline mode works (DevTools > Network > Offline)

### Production Testing

1. Deploy to app.wortday.com (Vercel handles HTTPS)
2. Open in various browsers/devices
3. Test installation on each platform
4. Verify offline functionality
5. Check service worker updates

### DevTools

**Chrome DevTools > Application:**
- Service Workers: View active worker, force update
- Manifest: Validate manifest.json
- Storage: View cached assets
- Clear Site Data: Reset PWA state

**Lighthouse:**
- Run PWA audit
- Check installability criteria
- Verify offline support
- Validate manifest

## Troubleshooting

### Install Prompt Not Showing

**Causes:**
- Already installed
- Not served over HTTPS
- Manifest invalid
- Service worker failed to register
- User dismissed prompt recently

**Solutions:**
- Check DevTools > Console for errors
- Validate manifest.json
- Clear browser data and reload
- Test in incognito mode

### Service Worker Not Updating

**Causes:**
- Browser caching old worker
- skipWaiting() not called
- User hasn't reloaded page

**Solutions:**
- Force reload (Ctrl+Shift+R)
- Unregister worker in DevTools
- Update CACHE_NAME in service-worker.js
- Use "Update on reload" in DevTools

### Offline Mode Not Working

**Causes:**
- Service worker not registered
- Assets not precached
- Cache strategy incorrect

**Solutions:**
- Check service worker status in DevTools
- Verify PRECACHE_ASSETS list
- Test with DevTools > Network > Offline
- Check cache storage in Application tab

### Icons Not Appearing

**Causes:**
- Incorrect paths in manifest
- Icons not in public/ folder
- Wrong icon sizes

**Solutions:**
- Verify icon paths are relative to root (/)
- Check icons exist in public/
- Use correct sizes (192x192, 512x512)
- Validate with DevTools > Manifest

## Performance

### Caching Strategy Impact

- **First Load**: ~2-3s (network)
- **Subsequent Loads**: <500ms (cache)
- **Offline**: <100ms (cache only)

### Cache Size

- **Precache**: ~5-10 MB (app bundle + assets)
- **Runtime Cache**: ~50 MB max
- **Cleaned on Update**: Old caches auto-deleted

### Best Practices

1. **Minimize Precache**: Only cache critical assets
2. **Use Runtime Cache**: Cache on demand
3. **Set Cache Limits**: Prevent unlimited growth
4. **Regular Updates**: Keep service worker fresh

## Security

### HTTPS Required

PWA features require HTTPS (except localhost):
- Service Workers
- Push Notifications
- Geolocation API
- Camera/Microphone access

### Content Security Policy

Add to index.html if needed:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline';
               connect-src 'self' https://gsobjkutscaubnbiffsn.supabase.co">
```

### Service Worker Scope

Service worker is scoped to root (`/`):
- Controls all pages
- Cannot control parent directories
- Can be restricted with `scope` in registration

## Future Enhancements

### Push Notifications

1. Add Push API permission request
2. Store push subscription in database
3. Send notifications from backend
4. Handle notification clicks in service worker

### Background Sync

1. Queue failed API requests
2. Retry when online
3. Show success/failure notifications

### Periodic Background Sync

1. Update word cache in background
2. Pre-fetch tomorrow's word
3. Sync learning progress

### Share Target

Allow sharing to Wortday app:

```json
{
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url"
    }
  }
}
```

## Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Workbox](https://developers.google.com/web/tools/workbox) - Advanced SW library
- [PWA Builder](https://www.pwabuilder.com/) - PWA testing and validation
