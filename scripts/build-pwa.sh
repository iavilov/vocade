#!/bin/bash

# Build PWA Script for Wortday
# This script builds the web version with PWA support

set -e

echo "🚀 Building Wortday PWA..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Build web version
echo "📦 Building web bundle..."
npx expo export --platform web

# Copy PWA files to dist (but NOT index.html - Expo generates that)
echo "📋 Copying PWA assets..."
cp public/manifest.json dist/manifest.json
cp public/service-worker.js dist/service-worker.js
cp public/service-worker-register.js dist/service-worker-register.js
cp public/icon-*.png dist/
cp public/favicon.png dist/

# Inject PWA meta tags and Service Worker into Expo-generated index.html
echo "📝 Injecting PWA code into index.html..."
# Backup original
cp dist/index.html dist/index.original.html

# Insert PWA meta tags before </head>
perl -i -pe 's|</head>|  <!-- PWA Manifest -->\n  <link rel="manifest" href="/manifest.json" />\n  \n  <!-- PWA Icons -->\n  <link rel="apple-touch-icon" href="/icon-192.png" />\n  <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />\n  <link rel="apple-touch-icon" sizes="512x512" href="/icon-512.png" />\n  \n  <!-- PWA Meta Tags -->\n  <meta name="mobile-web-app-capable" content="yes" />\n  <meta name="apple-mobile-web-app-capable" content="yes" />\n  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />\n  <meta name="apple-mobile-web-app-title" content="Wortday" />\n</head>|' dist/index.html

# Insert Service Worker registration before </body>
perl -i -pe 's|</body>|  <!-- Service Worker Registration -->\n  <script src="/service-worker-register.js"></script>\n</body>|' dist/index.html

# Verify critical files
echo "✅ Verifying build..."
if [ ! -f "dist/manifest.json" ]; then
  echo "❌ Error: manifest.json not found in dist/"
  exit 1
fi

if [ ! -f "dist/service-worker.js" ]; then
  echo "❌ Error: service-worker.js not found in dist/"
  exit 1
fi

if [ ! -f "dist/icon-192.png" ]; then
  echo "❌ Error: icon-192.png not found in dist/"
  exit 1
fi

echo "✨ PWA build complete!"
echo "📊 Build size:"
du -sh dist/

echo ""
echo "To test locally:"
echo "  npx serve dist -l 8080"
echo ""
echo "To test PWA features (requires HTTPS):"
echo "  npx serve dist -l 8080 --ssl"
echo ""
