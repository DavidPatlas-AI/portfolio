// main.js - גרסה חדשה מותאמת ל-HTML ולפיצ'רים מתקדמים
import { TRENDS } from './trends.js';

// שמירה ב-localStorage
function saveSelectedTrends(trends) {
    localStorage.setItem('selectedTrends', JSON.stringify(trends));
}
function loadSelectedTrends() {
    try {
        return JSON.parse(localStorage.getItem('selectedTrends')) || [];
    } catch {
        return [];
    }
}

// מעבר בין שלבים
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active-section');
        sec.classList.add('hidden-section');
    });
    const section = document.getElementById(sectionId);
    section.classList.remove('hidden-section');
    section.classList.add('active-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// שלב 1: מעבר לשלב 2
const startBtn = document.getElementById('start-button');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        // מעבר לשלב הבא תמיד, גם אם לא מולאו פרטים
        showSection('trend-selection');
        renderTrends();
        renderSelectedTrends();
    });
}

// שלב 2: טעינת טרנדים וגרירה
let selectedTrends = loadSelectedTrends();

function renderTrends() {
    const available = document.getElementById('availableTrends');
    available.innerHTML = '';
    TRENDS.forEach(trend => {
        const div = document.createElement('div');
        div.className = 'trend-block';
        div.textContent = trend.name + ' - ' + trend.desc;
        div.draggable = true;
        div.dataset.trend = trend.name;
        div.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', trend.name);
        });
        available.appendChild(div);
    });
}

// טוסט (הודעות קופצות)
function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.background = type === 'error' ? '#e74c3c' : (type === 'info' ? '#3498db' : '#27ae60');
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '1.1em';
    toast.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
    toast.style.zIndex = 9999;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
}

function renderSelectedTrends() {
    const selected = document.getElementById('selectedTrends');
    selected.innerHTML = '';
    if (selectedTrends.length === 0) {
        const p = document.createElement('p');
        p.className = 'empty-message';
        p.textContent = 'גרור לכאן את הטרנדים שבחרת';
        selected.appendChild(p);
    } else {
        selectedTrends.forEach(trend => {
            const div = document.createElement('div');
            div.className = 'trend-block selected';
            div.textContent = trend;
            div.title = 'הסר';
            div.addEventListener('click', () => {
                selectedTrends = selectedTrends.filter(t => t !== trend);
                saveSelectedTrends(selectedTrends);
                renderSelectedTrends();
                showToast('הטרנד הוסר', 'info');
            });
            selected.appendChild(div);
        });
    }
}

// Drag & Drop
const selectedZone = document.getElementById('selectedTrends');
if (selectedZone) {
    selectedZone.addEventListener('dragover', e => {
        e.preventDefault();
        selectedZone.classList.add('over');
    });
    selectedZone.addEventListener('dragleave', () => {
        selectedZone.classList.remove('over');
    });
    selectedZone.addEventListener('drop', e => {
        e.preventDefault();
        selectedZone.classList.remove('over');
        const trend = e.dataTransfer.getData('text/plain');
        if (trend && !selectedTrends.includes(trend)) {
            selectedTrends.push(trend);
            saveSelectedTrends(selectedTrends);
            renderSelectedTrends();
            showToast('טרנד נוסף!', 'success');
        } else if (trend) {
            showToast('הטרנד כבר נבחר', 'error');
        }
    });
}

// מעבר לשלב 3
const continueBtn = document.getElementById('continueToScript');
if (continueBtn) {
    continueBtn.addEventListener('click', () => {
        showSection('script-generation');
        renderScript();
    });
}

// שלב 3: יצירת תסריט
function renderScript() {
    const preview = document.getElementById('scriptPreview');
    if (!selectedTrends.length) {
        preview.textContent = 'לא נבחרו טרנדים.';
        return;
    }
    let script = 'תסריט מותאם אישית:\n';
    script += selectedTrends.map(t => '- ' + t).join('\n');
    script += '\n\nהשתמש בטרנדים האלו כדי ליצור תוכן חדשני ומקורי!';
    preview.textContent = script;
}

// העתקה
const copyBtn = document.getElementById('copyScript');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const text = document.getElementById('scriptPreview').textContent;
        if (text) {
            navigator.clipboard.writeText(text);
            copyBtn.textContent = 'הועתק!';
            setTimeout(() => copyBtn.textContent = 'העתק תסריט', 1500);
            showToast('התסריט הועתק!', 'success');
        }
    });
}

// יצירת תסריט חדש
const newBtn = document.getElementById('generateNew');
if (newBtn) {
    newBtn.addEventListener('click', () => {
        showSection('trend-selection');
    });
}

// שמירה (פשוטה, אפשר להרחיב)
const saveBtn = document.getElementById('saveScript');
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        const text = document.getElementById('scriptPreview').textContent;
        if (text) {
            const blob = new Blob([text], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'trend-script.txt';
            a.click();
            showToast('התסריט נשמר!', 'success');
        }
    });
}

// כפתור נקה בחירה
const clearBtn = document.getElementById('clearTrends');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        selectedTrends = [];
        saveSelectedTrends(selectedTrends);
        renderSelectedTrends();
        showToast('כל הטרנדים נמחקו!', 'info');
    });
}

// אתחול ראשוני
window.addEventListener('DOMContentLoaded', () => {
    showSection('user-identification');
    renderTrends();
    renderSelectedTrends();
}); 