// TrendOS core — restored for dashboard.html
window.TrendOS = window.TrendOS || {};
const mk = (id, name, cat, desc) => ({ id, name, category: cat, description: desc, strength: 40 + (id % 60) });
const basic = [
  'מספר יומי','צבע טרנדי','מילה טרנדית','רגש דומיננטי','פלטפורמה מובילה',
  'סגנון צילום','קצב עריכה','תאורה טרנדית','חיה טרנדית','חפץ טרנדי',
  'שעת יום','מזג אוויר','כיוון טרנדי','מרקם טרנדי','סוג שאלות',
].map((n,i)=>mk(i+1,n,'בסיסי','רכיב טרנד '+n));
const advanced = [
  'מקצב דיבור','שפת גוף','מבט עיניים','הבעות פנים','מוזיקת רקע',
  'אפקט קול','פילטר ויזואלי','מעבר צבע','טקסט על מסך','קריאה לפעולה',
].map((n,i)=>mk(100+i,n,'מתקדם','רכיב מתקדם'));
const secret = [
  'טריגר פסיכולוגי','דפוס נוירולוגי','קונטרסט רגשי','עומק שדה','סימטריה',
].map((n,i)=>mk(200+i,n,'סודי','טכניקה '+n));

TrendOS.database = { basicComponents: basic, advancedComponents: advanced, secretTechniques: secret };
let selected = new Set(JSON.parse(localStorage.getItem('selectedTrends')||'[]').map(String));

function createTrendCard(trend, container) {
  const card = document.createElement('div');
  card.className = 'trend-card';
  card.dataset.trendId = trend.id;
  card.dataset.strength = trend.strength;
  card.innerHTML = '<h3>'+trend.name+'</h3><p>'+trend.description+'</p><div class="strength-bar-wrap"><div class="strength-bar"></div></div>';
  card.onclick = () => toggleTrendCard(card, trend.name);
  container.appendChild(card);
  const bar = card.querySelector('.strength-bar');
  if (bar) { bar.style.width = trend.strength + '%'; }
}

function toggleTrendCard(card, name) {
  if (selected.has(name)) { selected.delete(name); card.classList.remove('selected'); }
  else { selected.add(name); card.classList.add('selected'); }
  localStorage.setItem('selectedTrends', JSON.stringify([...selected]));
}

TrendOS.selectedTrends = () => [...selected];
TrendOS.conflicts = () => 0;
TrendOS.viralPotential = () => Math.min(99, selected.size * 11 + 12);

function initTrendCards() {
  const c = document.getElementById('trendsContainer');
  if (!c || c.children.length) return;
  [...basic, ...advanced.slice(0,5)].forEach(t => createTrendCard(t, c));
}

function wrapContent() {
  const text = document.getElementById('userText')?.value?.trim();
  if (!text) return alert('הכנס טקסט');
  const arr = [...selected];
  const out = document.getElementById('wrappedOutput');
  if (out) {
    out.style.display = 'block';
    out.textContent = arr.length ? '🌟 ['+arr.join(' + ')+']\n'+text : text;
  }
}

function continueToNext() {
  if (!selected.size) return alert('בחר לפחות טרנד אחד');
  localStorage.setItem('selectedTrends', JSON.stringify([...selected]));
  location.href = 'generate_script.html';
}

document.addEventListener('DOMContentLoaded', initTrendCards);
window.wrapContent = wrapContent;
window.continueToNext = continueToNext;
window.createTrendCard = createTrendCard;
