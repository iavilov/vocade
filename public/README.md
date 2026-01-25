# Wortday PWA Assets

This folder contains static assets for the Progressive Web App (PWA).

## Files

### Core PWA Files

- **index.html** - Custom HTML template with PWA meta tags
- **manifest.json** - PWA manifest (installability, theme, icons)
- **service-worker.js** - Offline caching and app updates

### Icons

- **icon-144.png** - App icon 144x144px
- **icon-192.png** - App icon 192x192px (minimum for Android)
- **icon-384.png** - App icon 384x384px
- **icon-512.png** - App icon 512x512px (for splash screen)
- **favicon.png** - Browser favicon

## Build Process

These files are automatically copied to `dist/` during PWA build:

```bash
npm run build:pwa
```

The build script (`scripts/build-pwa.sh`) handles:

1. Building web bundle with Expo
2. Copying PWA assets to dist/
3. Verifying critical files exist

## Deployment

When deploying to Vercel, the `vercel.json` configuration ensures:

- Service Worker gets correct headers
- Manifest has proper content-type
- Static assets are cached efficiently

## Do Not Delete

All files in this directory are required for PWA functionality. Removing any file will break:

- App installability
- Offline mode
- Proper app icons
- Service Worker updates

## Icon Guidelines

Icons should be:

- PNG format
- Square (1:1 aspect ratio)
- Simple, recognizable design
- Transparent or solid background
- Purpose: `any` or `maskable` in manifest

Current icon sizes match PWA best practices for:

- Android Home Screen (192x192)
- iOS Add to Home Screen (192x192)
- Splash Screen (512x512)
- Various display densities (144x144, 384x384)

## Updating Icons

If you need to update the app icon:

1. Replace `assets/images/icon.png` (1024x1024)
2. Run icon generation script:

```bash
cd public
sips -z 192 192 ../assets/images/icon.png --out icon-192.png
sips -z 512 512 ../assets/images/icon.png --out icon-512.png
sips -z 144 144 ../assets/images/icon.png --out icon-144.png
sips -z 384 384 ../assets/images/icon.png --out icon-384.png
```

3. Verify icons in manifest.json
4. Rebuild and test PWA

## Testing

After changes, verify:

1. Manifest validates: Chrome DevTools > Application > Manifest
2. Icons display correctly in install prompt
3. Service Worker registers: DevTools > Application > Service Workers
4. Lighthouse PWA audit passes

For detailed PWA documentation, see:

- `/docs/pwa-setup.md` - Complete setup guide
- `/docs/pwa-quick-start.md` - Quick reference
