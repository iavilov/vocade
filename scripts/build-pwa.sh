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

# Copy PWA files to dist
echo "📋 Copying PWA assets..."
cp public/index.production.html dist/index.html
cp public/manifest.json dist/manifest.json
cp public/service-worker.js dist/service-worker.js
cp public/icon-*.png dist/
cp public/favicon.png dist/

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
