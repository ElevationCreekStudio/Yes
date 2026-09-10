/* ===========================💮💮💮=========================== */
// Скрипт регистрации Service Worker с выводом логов на экран
// ---------------------------------------------------------------

// Функция для вывода логов на экран смартфона/браузера
function showLog(message) {
  const loggerBox = document.getElementById('logger-content');
  if (loggerBox) {
    // Если это первый лог, очищаем надпись "Ожидание запуска..."
    if (loggerBox.innerHTML === 'Ожидание запуска...') {
      loggerBox.innerHTML = '';
    }
    // Добавляем новую строчку лога сверху или снизу (сейчас добавляется снизу)
    loggerBox.innerHTML += `<div class="log-entry">📱 ${message}</div>`;
    
    // Автоматически прокручиваем окошко логов вниз
    const parentContainer = document.getElementById('pwa-logger');
    if (parentContainer) {
      parentContainer.scrollTop = parentContainer.scrollHeight;
    }
  }
}

// Начинаем регистрацию
if ('serviceWorker' in navigator) {
  
  const swUrl = `./sw.js?v=${new Date().getTime()}`;
  showLog('Попытка регистрации воркера...');

  navigator.serviceWorker.register(swUrl)
    .then((reg) => {
      showLog('Успешно зарегистрирован!');
      showLog(`Сфера: ${reg.scope.replace(window.location.origin, '')}`);
      
      // Запускаем проверку обновлений
      showLog('Проверка обновлений на сервере...');
      reg.update(); 
    })
    .catch((error) => {
      showLog(`Ошибка регистрации: ${error.message}`);
    });

  // Дополнительно: слушаем, когда появляется новый воркер и устанавливается
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    showLog('Приложение обновилось! Перезапустите страницу.');
  });
} else {
  showLog('Браузер НЕ поддерживает Service Worker!');
}
