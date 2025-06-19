
let currentLang = 'he';

function toggleSub(id) {
  const el = document.getElementById(id);
  el.classList.toggle('hidden');
}

function showOutput(msg) {
  document.getElementById('output').innerText = '▶ ' + msg;
}

function toggleLanguage() {
  const btn = document.getElementById('langBtn');
  if (currentLang === 'he') {
    currentLang = 'en';
    btn.innerText = '🌐 Language: English';
    document.body.dir = 'ltr';
    showOutput('Language switched to English');
  } else if (currentLang === 'en') {
    currentLang = 'ru';
    btn.innerText = '🌐 Язык: Русский';
    showOutput('Язык переключен на русский');
  } else {
    currentLang = 'he';
    btn.innerText = '🌐 שפה: עברית';
    document.body.dir = 'rtl';
    showOutput('השפה חזרה לעברית');
  }
}

function triggerSOD() {
  document.body.style.background = '#300';
  showOutput('💥 פיצוץ בוצע! המערכת הופעלה מחדש');
  setTimeout(() => {
    document.body.style.background = '#0c1c24';
  }, 1500);
}

function showSchedule() {
  showOutput(`🗓️ יום רביעי:
05:50 – קימה
06:50 – יציאה לירושלים
09:40 – הגעה לטכנולוגית
10:00–12:30 – מבוא למחשבים
12:45–14:15 – פייתון
14:30–16:00 – שפת C`);
}
