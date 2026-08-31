console.log('app.js: начинаем проверку поддержки Service Worker...');

if ('serviceWorker' in navigator) {
  console.log('app.js: браузер поддерживает Service Worker. Будем регистрировать.');

  window.addEventListener('load', () => {
    console.log('app.js: страница полностью загружена. Регистрируем сервис-воркер...');

    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('app.js: сервис-воркер успешно зарегистрирован.', registration);
        console.log('app.js: теперь приложение может работать офлайн и кэшировать ресурсы.');
      })
      .catch(err => {
        console.error('app.js: Ошибка регистрации сервис-воркера:', err);
        console.error('app.js: Проверьте, что файл sw.js существует, доступен по HTTPS (или localhost) и не содержит синтаксических ошибок.');
      });
  });
} else {
  console.warn('app.js: браузер не поддерживает Service Worker. PWA-функциональность недоступна.');
}