const CACHE_NAME = 'earnings-tracker-v2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './android-chrome-192x192.png',
    './android-chrome-512x512.png',
    // External CDN resources that we want to cache
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app shell');
                return cache.addAll(urlsToCache.filter(url => !url.startsWith('https://')));
            })
            .then(() => {
                // Cache external resources with error handling
                return caches.open(CACHE_NAME).then(cache => {
                    const externalUrls = urlsToCache.filter(url => url.startsWith('https://'));
                    return Promise.allSettled(
                        externalUrls.map(url => 
                            fetch(url).then(response => {
                                if (response.ok) {
                                    return cache.put(url, response);
                                }
                            }).catch(err => {
                                console.log(`Failed to cache ${url}:`, err);
                            })
                        )
                    );
                });
            })
            .then(() => {
                // Force the waiting service worker to become the active service worker
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all clients
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension requests
    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    console.log('Serving from cache:', event.request.url);
                    return response;
                }

                // Otherwise fetch from network
                console.log('Fetching from network:', event.request.url);
                return fetch(event.request).then(response => {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response since it's a stream
                    const responseToCache = response.clone();

                    // Cache the response for future use
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(error => {
                    console.log('Network fetch failed:', error);
                    
                    // Return a custom offline page for navigation requests
                    if (event.request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                    
                    throw error;
                });
            })
    );
});

// Background sync for offline data
self.addEventListener('sync', event => {
    if (event.tag === 'earnings-sync') {
        event.waitUntil(
            // Sync earnings data when back online
            syncEarningsData()
        );
    }
});

// Handle messages from the main app
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({version: CACHE_NAME});
    }
});

// Background sync function
async function syncEarningsData() {
    try {
        // In a real implementation, you might sync data to a backend
        console.log('Background sync: Earnings data synced');
        
        // Send a message to all clients about the sync
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'EARNINGS_SYNCED',
                timestamp: new Date().toISOString()
            });
        });
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handling (for future use)
self.addEventListener('push', event => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || 'You have a new earnings milestone!',
        icon: './android-chrome-192x192.png',
        badge: './android-chrome-192x192.png',
        vibrate: [200, 100, 200],
        data: data.data || {},
        actions: [
            {
                action: 'view',
                title: 'View Earnings',
                icon: './android-chrome-192x192.png'
            },
            {
                action: 'dismiss',
                title: 'Dismiss'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Earnings Tracker', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

console.log('Service Worker loaded');
