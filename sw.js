const CACHE_NAME = 'yes-pwa-v3';

const ASSETS = [
  './',
  './index.html',
  './main.css',
  './icon-192x192.png',
  './icon-512x512.png'
];

// Установка воркера и кэширование ресурсов
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Начало установки (Install)...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Ресурсы успешно закэшированы в:', CACHE_NAME);
      return cache.addAll(ASSETS);
    })
  );
});

// Активация воркера и автоматическая очистка старого кэша
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Воркер успешно активирован (Activate)!');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Обнаружен и удален старый кэш:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Перехват запросов для работы в офлайне
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('[Service Worker] Ресурс взят из кэша:', event.request.url);
        return cachedResponse;
      }
      console.log('[Service Worker] Запрос ушел в сеть:', event.request.url);
      return fetch(event.request);
    })
  );
});
