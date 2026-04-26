// service-worker.js
const CACHE_NAME = 'lobby-staff-v2.0.0';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/offline.html',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css',
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Установка Service Worker и кэширование
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Service Worker: Caching files');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('✅ Service Worker: Installed');
                return self.skipWaiting();
            })
    );
});

// Активация и очистка старых кэшей
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker: Activated');
            return self.clients.claim();
        })
    );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
    // Пропускаем API-запросы
    if (event.request.url.includes('/api/')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Возвращаем кэш если есть + делаем запрос в сеть для обновления
                const fetchPromise = fetch(event.request)
                    .then((networkResponse) => {
                        // Кэшируем только успешные ответы
                        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Если нет сети - возвращаем оффлайн-страницу для HTML
                        if (event.request.headers.get('accept')?.includes('text/html')) {
                            return caches.match('/offline.html');
                        }
                    });
                
                return cachedResponse || fetchPromise;
            })
    );
});

// Фоновая синхронизация (опционально)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-messages') {
        console.log('🔄 Service Worker: Background sync');
        // Здесь можно отправлять накопленные данные
    }
});

// Push-уведомления (опционально)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data?.text() || 'Новое уведомление от LOBBY_STAFF',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [200, 100, 200],
    };
    
    event.waitUntil(
        self.registration.showNotification('LOBBY_STAFF', options)
    );
});