if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }

  const CACHE_NAME = 'my-cache-v1'; // Name your cache
  const urlsToCache = [
    // Root HTML file
    '/', 
    '/index.html',
    
// if non-existent file is tried to fetch by service worker it will cause an error so remove those files    
    '/css/index.css',
    '/js/index.js',    
    '/js/router.js',
  ];
  
  // Install event: Pre-cache essential resources
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Opened cache');
          return cache.addAll(urlsToCache); // Pre-cache resources
        })
    );
  });
  
  // Fetch event: Handle dynamic paths
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Skip caching for URLs without a file extension (only paths)
    const isFileRequest = /\.[a-z]+$/.test(url.pathname); // Check for file extensions
  
    if (isFileRequest) {
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          // const urlParts = url.split('/');
          // console.log(urlParts);
          console.log(url);
          if (cachedResponse) {
            // Return cached resource if available
            fetchAndUpdateCache(event.request);
            return cachedResponse;
          }
    
          // Handle dynamic paths by falling back to `index.html` for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html'); // Serve the SPA's main HTML file
          }
    
          // Fetch the resource from the network and cache it for future requests
          return fetch(event.request)
            .then(networkResponse => {
              return caches.open(CACHE_NAME).then(cache => {
                // Cache the resource for future use
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
            })
            .catch(error => {
              console.error('Fetch failed; returning offline fallback:', error);
              // Optionally serve a fallback page or resource
              return caches.match('/offline.html'); // Ensure you cache this during the install phase
            });
        })
      );
    } else {
      // For paths without file extensions, don't cache them
      // Just fetch and return the network response (no caching)
      event.respondWith(
        caches.match('/index.html').then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse; // Serve cached index.html for route navigation
          }
          return fetch(event.request).then(networkResponse => {
            return caches.open(CACHE_NAME).then(cache => {
              // Cache the network response for future navigations
              cache.put('/index.html', networkResponse.clone());
              return networkResponse;
            });
          });
        })
      );
    }
  });

  // Fetch and update the cache with the latest response from the network
function fetchAndUpdateCache(request) {
    // Fetch from the network
    fetch(request).then(networkResponse => {
      if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
        return;
      }
  
      // Open the cache and update with the new response
      caches.open(CACHE_NAME).then(cache => {
        cache.put(request, networkResponse.clone());
      });
    }).catch(error => {
      console.error('Failed to fetch and update cache:', error);
    });
  }
  
  // Activate event: Cleanup old caches
  self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME]; // Keep only the current cache
  
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  