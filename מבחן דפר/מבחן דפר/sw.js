const CACHE_NAME = 'dapar-test-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/style.css',
    '/src/js/main.js',
    '/src/js/practice.js',
    '/src/js/tools.js',
    '/src/js/questions-db.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    return response;
                }

                // Clone the request because it can only be used once
                const fetchRequest = event.request.clone();

                // Try to fetch from network
                return fetch(fetchRequest)
                    .then(response => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response because it can only be used once
                        const responseToCache = response.clone();

                        // Add to cache
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // If network fails, show offline page
                        if (event.request.mode === 'navigate') {
                            return caches.match('/offline.html');
                        }
                    });
            })
    );
});

// Background sync for saving progress
self.addEventListener('sync', event => {
    if (event.tag === 'sync-progress') {
        event.waitUntil(
            // Implement progress syncing when online
            syncProgress()
        );
    }
});

async function syncProgress() {
    try {
        const progressData = await getProgressFromIndexedDB();
        // Implement server sync when online
        console.log('Progress synced');
    } catch (error) {
        console.error('Error syncing progress:', error);
    }
} 