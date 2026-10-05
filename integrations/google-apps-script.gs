/**
 * AS·окна — приём заявок с сайта.
 * Каждая заявка: 1) строка в Google Таблице, 2) письмо на почту.
 *
 * Установка — см. integrations/README.md
 * Проверка: выберите сверху функцию testLead → «Выполнить» → смотрите «Журнал выполнения» внизу.
 */

const EMAIL = 'as.george@mail.ru';

const SHEET_NAME = 'Заявки';
const HEADERS = ['Дата', 'Телефон', 'Имя', 'Откуда', 'Комментарий', 'Детали', 'Страница'];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    return reply_(saveLead_(data));
  } catch (err) {
    console.error(err);
    return reply_({ ok: false, error: String(err) });
  }
}

/** Запустите вручную из редактора: проверка доставки + выдача разрешений. */
function testLead() {
  // случайный номер, чтобы защита от повторов не мешала повторным тестам
  const tail = String(Math.floor(Math.random() * 1e7)).padStart(7, '0');
  const result = saveLead_({
    source: 'Тест из редактора',
    phone: '+7 (900) ' + tail.slice(0, 3) + '-' + tail.slice(3, 5) + '-' + tail.slice(5, 7),
    name: 'Тест',
    comment: 'Проверка доставки заявок',
    details: { Услуга: 'Ремонт' },
    t: 99999,
  });
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) throw new Error('Заявка не сохранена: ' + result.error);
  console.log('✅ Готово. Таблица с заявками: ' + result.sheetUrl);
}

function saveLead_(data) {
  const phone = String(data.phone || '');
  const digits = phone.replace(/\D/g, '');

  // Простая защита от спама: валидный номер, не «мгновенная» отправка, не чаще раза в 2 минуты с одного номера
  if (digits.length !== 11) return { ok: false, error: 'неверный номер телефона' };
  if (typeof data.t === 'number' && data.t < 1500) return { ok: false, error: 'слишком быстрая отправка (бот)' };
  const cache = CacheService.getScriptCache();
  if (cache.get('p' + digits)) return { ok: true, duplicate: true };

  const details = Object.keys(data.details || {})
    .map(function (k) { return k + ': ' + data.details[k]; })
    .join('\n');

  // 1) Таблица
  const ss = getSpreadsheet_();
  const sheet = getLeadsSheet_(ss);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([
    new Date(),
    "'" + phone, // апостроф — чтобы «+7…» не считалось формулой
    clean_(data.name),
    clean_(data.source),
    clean_(data.comment),
    details,
    clean_(data.page),
  ]);
  SpreadsheetApp.flush();
  cache.put('p' + digits, '1', 120); // только после успешной записи

  // 2) Почта (если письмо не ушло — заявка всё равно уже в таблице)
  let mailError = null;
  try {
    const text =
      'Новая заявка с сайта AS·окна\n\n' +
      'Телефон: ' + phone + '\n' +
      (data.name ? 'Имя: ' + clean_(data.name) + '\n' : '') +
      'Откуда: ' + clean_(data.source) + '\n' +
      (data.comment ? 'Комментарий: ' + clean_(data.comment) + '\n' : '') +
      (details ? details + '\n' : '');
    MailApp.sendEmail({
      to: EMAIL,
      subject: 'Заявка с сайта: ' + phone + ' — ' + clean_(data.source),
      body: text + '\nВсе заявки: ' + ss.getUrl(),
    });
  } catch (err) {
    mailError = String(err);
    console.error('Письмо не отправлено: ' + mailError);
  }

  return { ok: true, sheetUrl: ss.getUrl(), mailError: mailError };
}

/**
 * Таблица, в которую пишем заявки:
 * - если скрипт создан из таблицы (Расширения → Apps Script) — эта же таблица;
 * - если скрипт создан отдельно на script.google.com — создаём таблицу «Заявки AS·окна» и запоминаем её.
 */
function getSpreadsheet_() {
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SPREADSHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  const created = SpreadsheetApp.create('Заявки AS·окна');
  props.setProperty('SPREADSHEET_ID', created.getId());
  console.log('Создана таблица: ' + created.getUrl());
  return created;
}

/** Лист «Заявки». Если его нет, а первый лист пустой — используем первый лист (переименовываем), чтобы не плодить вкладки. */
function getLeadsSheet_(ss) {
  const named = ss.getSheetByName(SHEET_NAME);
  if (named) return named;
  const first = ss.getSheets()[0];
  if (first && first.getLastRow() === 0) {
    first.setName(SHEET_NAME);
    return first;
  }
  return ss.insertSheet(SHEET_NAME, 0); // новая вкладка — первой слева, чтобы её было видно
}

function clean_(v) {
  return String(v == null ? '' : v).slice(0, 1000).replace(/^[=+\-@]/, "'$&");
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
