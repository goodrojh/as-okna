/**
 * AS·окна — приём заявок с сайта.
 * Каждая заявка: 1) строка в этой Google Таблице, 2) письмо на почту.
 *
 * Установка — см. integrations/README.md
 */

const EMAIL = 'as.george@mail.ru';

const SHEET_NAME = 'Заявки';
const HEADERS = ['Дата', 'Телефон', 'Имя', 'Откуда', 'Комментарий', 'Детали', 'Страница'];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const phone = String(data.phone || '');
    const digits = phone.replace(/\D/g, '');

    // Простая защита от спама: валидный номер, не «мгновенная» отправка, не чаще раза в 2 минуты с одного номера
    if (digits.length !== 11) return reply_({ ok: false, error: 'phone' });
    if (typeof data.t === 'number' && data.t < 1500) return reply_({ ok: false, error: 'too-fast' });
    const cache = CacheService.getScriptCache();
    if (cache.get('p' + digits)) return reply_({ ok: true, duplicate: true });
    cache.put('p' + digits, '1', 120);

    const details = Object.keys(data.details || {})
      .map(function (k) { return k + ': ' + data.details[k]; })
      .join('\n');

    // 1) Таблица
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
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

    // Текст уведомления
    const text =
      '🔔 Новая заявка с сайта AS·окна\n' +
      'Телефон: ' + phone + '\n' +
      (data.name ? 'Имя: ' + clean_(data.name) + '\n' : '') +
      'Откуда: ' + clean_(data.source) + '\n' +
      (data.comment ? 'Комментарий: ' + clean_(data.comment) + '\n' : '') +
      (details ? details + '\n' : '');

    // 2) Почта
    MailApp.sendEmail({
      to: EMAIL,
      subject: 'Заявка с сайта: ' + phone + ' — ' + clean_(data.source),
      body: text + '\nВсе заявки: ' + ss.getUrl(),
    });

    return reply_({ ok: true });
  } catch (err) {
    console.error(err);
    return reply_({ ok: false, error: String(err) });
  }
}

/** Запустите вручную один раз из редактора — проверка, что всё работает (и выдача разрешений). */
function testLead() {
  doPost({
    postData: {
      contents: JSON.stringify({
        source: 'Тест из редактора', phone: '+7 (900) 000-00-00', name: 'Тест',
        comment: 'Проверка доставки', details: { Услуга: 'Ремонт' }, t: 99999,
      }),
    },
  });
}

function clean_(v) {
  return String(v == null ? '' : v).slice(0, 1000).replace(/^[=+\-@]/, "'$&");
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
