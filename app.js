/* ===========================💮💮💮=========================== */
// Скрипт регистрации Service Worker (Исправленная версия)
// ---------------------------------------------------------------

// ТЕКУЩАЯ ВЕРСИЯ ПРИЛОЖЕНИЯ. Меняй её (например, на '2', '3'), когда обновляешь CSS/HTML!
const APP_VERSION = '9'; 

function showLog(message) {
  const loggerBox = document.getElementById('logger-content');
  if (loggerBox) {
    if (loggerBox.innerHTML === 'Ожидание запуска...') loggerBox.innerHTML = '';
    loggerBox.innerHTML += `<div class="log-entry">📱 ${message}</div>`;
    const parentContainer = document.getElementById('pwa-logger');
    if (parentContainer) parentContainer.scrollTop = parentContainer.scrollHeight;
  }
}

if ('serviceWorker' in navigator) {
  
  // Кэш-бастер теперь стабильный на протяжении одной версии (например: ?v=2)
  const swUrl = `./sw.js?v=${APP_VERSION}`;
  showLog(`Попытка регистрации воркера (Версия ${APP_VERSION})...`);

  navigator.serviceWorker.register(swUrl)
    .then((reg) => {
      showLog('Успешно зарегистрирован!');
      showLog(`Сфера: ${reg.scope.replace(window.location.origin, '')}`);
      
      // Принудительно заставляем браузер проверить sw.js на сервере GitHub
      reg.update(); 
    })
    .catch((error) => {
      showLog(`Ошибка регистрации: ${error.message}`);
    });

  // Если воркер обновился в фоне, сообщаем пользователю
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    showLog('✨ Обновление получено! Перезапустите приложение.');
  });
} else {
  showLog('Браузер НЕ поддерживает Service Worker!');
}
