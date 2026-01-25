/**
 * Service Worker Registration Script
 * Registers PWA Service Worker (production only)
 */

(function() {
  // Register service worker for PWA functionality (PRODUCTION ONLY)
  // Skip in development to avoid conflicts with Expo dev server
  const isProduction = window.location.hostname !== 'localhost' &&
                      !window.location.hostname.startsWith('192.168.') &&
                      !window.location.hostname.startsWith('10.0.');

  if ('serviceWorker' in navigator) {
    if (isProduction) {
      // Production: Register Service Worker
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('ServiceWorker registered:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available, prompt user to refresh
                  if (confirm('New version available! Reload to update?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            });
          })
          .catch((error) => {
            console.log('ServiceWorker registration failed:', error);
          });
      });

      // Reload page when new service worker takes control
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    } else {
      // Development: Unregister any existing Service Workers
      console.log('[PWA] Service Worker disabled in development mode');
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
          console.log('[PWA] Unregistered Service Worker:', registration.scope);
        });
      });
    }
  }

  // Add install prompt handling
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('Install prompt ready');
  });

  // Expose install function globally
  window.showInstallPrompt = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
      });
    }
  };
})();
