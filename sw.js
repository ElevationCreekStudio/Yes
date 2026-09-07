// Уникальный префикс проекта, чтобы кэш не конфликтовал с другими PWA на одном домене GitHub Pages
const CACHE_PREFIX = 'yes';
// Текущая версия кэша; при любом изменении стилей или разметки меняем '-v1' на '-v2', '-v3' и т.д.
const CACHE_NAME = `${CACHE_PREFIX}-v2`;

// Список критически важных файлов (каркас приложения), которые будут доступны без интернета
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


// Активация воркера и безопасная очистка только своего старого кэша
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Воркер успешно активирован (Activate)!');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          // Проверяем, что кэш принадлежит ИМЕННО этому проекту
          // И проверяем, что его имя не совпадает с текущей актуальной версией
          if (cache.startsWith(CACHE_PREFIX) && cache !== CACHE_NAME) {
            console.log('[Service Worker] Удален старый кэш текущего проекта:', cache);
            return caches.delete(cache);
          }
          // Кэши других проектов это условие просто проигнорирует
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
