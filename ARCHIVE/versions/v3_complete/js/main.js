// מבני נתונים
const contentData = {
    learning: {
        random: ["מודול 0 - תכנות בסיסי", "מודול 1 - אלגוריתמים", "מודול 2 - מבני נתונים", "הפתעה: לומדים איך ללמוד"],
        ordered: ["שלב 1: יסודות התכנות", "שלב 2: חשיבה אלגוריתמית", "שלב 3: מבני נתונים מתקדמים", "שלב 4: פרויקט מסכם"]
    },
    clothing: {
        random: ["מדי ב׳", "מדי א׳", "טרנינג", "פיג׳מה"],
        ordered: ["יום ראשון: מדי א׳", "יום שני: מדי ב׳", "יום שלישי: טרנינג", "יום רביעי: פיג׳מה"]
    },
    drink: {
        random: ["קפה שחור", "קולה", "מים", "תה ירוק"],
        ordered: ["בוקר: קפה", "צהריים: מים", "ערב: תה ירוק"]
    },
    task: {
        random: ["לפתור 3 תרגילים", "לקרוא פרק בספר", "להגיש פרויקט", "לעזור לחבר"],
        ordered: ["1. לפתור 3 תרגילים", "2. לקרוא פרק בספר", "3. להגיש פרויקט", "4. לעזור לחבר"]
    },
    tired: {
        random: ["רענן", "קצת עייף", "מותש", "ישן בעמידה"],
        ordered: ["בוקר: רענן", "צהריים: קצת עייף", "ערב: מותש", "לילה: ישן בעמידה"]
    },
    mood: {
        random: ["נלהב", "מרוכז", "מבולבל", "עצבני"],
        ordered: ["בוקר: נלהב", "צהריים: מרוכז", "ערב: מבולבל", "לילה: עצבני"]
    },
    surprise: {
        random: ["קיבלת יום חופשי!", "הפתעה: שיעור בוטל", "הבוס קנה פיצה", "הגרלה: זכית בקפה"],
        ordered: ["הפתעה 1: יום חופשי", "הפתעה 2: שיעור בוטל", "הפתעה 3: פיצה", "הפתעה 4: קפה"]
    },
    students: {
        random: ["23 תלמידים", "17 תלמידים", "30 תלמידים", "12 תלמידים"],
        ordered: ["שיעור 1: 23", "שיעור 2: 17", "שיעור 3: 30", "שיעור 4: 12"]
    },
    timeline: {
        random: ["עבר: תיכון", "הווה: קורס", "עתיד: אוניברסיטה", "עתיד רחוק: הייטק"],
        ordered: ["עבר: תיכון", "הווה: קורס", "עתיד: אוניברסיטה", "עתיד רחוק: הייטק"]
    },
    army: {
        random: ["גולני", "גבעתי", "חיל האוויר", "8200"],
        ordered: ["שלב 1: טירונות", "שלב 2: קורס", "שלב 3: שיבוץ", "שלב 4: שירות"]
    },
    why: {
        random: ["כי אני אוהב את אשתי", "כי יש לי ארבעה בנים", "כי אני רוצה לשמח את ההורים", "כי בא לי להצליח"],
        ordered: ["1. אשתי", "2. הבנים", "3. ההורים", "4. השאיפה"]
    },
    breakfast: {
        random: ["קפה שחור", "בורקס גבינה", "פיצה קרה", "כלום (שוב...)"]
    },
    language: {
        random: ["עברית", "אנגלית", "רוסית"],
        ordered: ["עברית", "אנגלית", "רוסית"]
    }
};

// Tree Structure Data
const buttonTreeData = {
    "נושא ראשי": {
        "תת נושא 1": {
            "פעולה 1": ["תגובה 1", "תגובה 2"],
            "פעולה 2": ["תגובה 3", "תגובה 4"]
        },
        "תת נושא 2": {
            "פעולה 3": ["תגובה 5", "תגובה 6"]
        }
    }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeTyped();
    buildButtonTree();
    setupEventListeners();
});

// Typed.js Initialization
function initializeTyped() {
    new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
}

// Button Tree Builder
function buildButtonTree() {
    const container = document.getElementById('buttonTree');
    createTreeLevel(buttonTreeData, container, 0);
}

function createTreeLevel(data, parent, level) {
    Object.entries(data).forEach(([key, value]) => {
        const button = document.createElement('button');
        button.textContent = key;
        button.className = `tree-button level-${level}`;
        button.onclick = () => handleTreeButtonClick(key, value, level);
        parent.appendChild(button);
    });
}

// Event Handlers
function playClick() {
    const audio = document.getElementById('clickSound');
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

function showResult(category, type, btn) {
    const arr = contentData[category]?.[type];
    const block = btn.closest('.feature-block');
    const resultDiv = block.querySelector('.feature-result');
    if (arr && arr.length) {
        const value = type === 'random'
            ? arr[Math.floor(Math.random() * arr.length)]
            : arr.join('<br>');
        resultDiv.innerHTML = value;
        if (category === 'tired') updateEnergyBar();
        if (category === 'mood') showMoodIcon(resultDiv, value);
    } else {
        resultDiv.textContent = "לא נמצא תוכן";
    }
}

function updateEnergyBar() {
    const bar = document.getElementById('energyBar');
    if (bar) {
        const percent = Math.floor(Math.random() * 101);
        bar.style.width = percent + "%";
        bar.style.background = percent > 70 ? "#00ff00" : percent > 30 ? "#ff0" : "#f00";
    }
}

function showMoodIcon(resultDiv, value) {
    // דוגמה: אפשר להוסיף גיף/אייקון לפי מצב רוח
    let icon = "";
    if (value.includes("נלהב")) icon = "😃";
    if (value.includes("מרוכז")) icon = "🤓";
    if (value.includes("מבולבל")) icon = "😕";
    if (value.includes("עצבני")) icon = "😡";
    if (icon) resultDiv.innerHTML = icon + " " + value;
}

function triggerExplosion() {
    playExplosionSound();
    const button = document.querySelector('.explosive-button');
    button.classList.add('exploding');
    setTimeout(() => button.classList.remove('exploding'), 1000);
}

// Utility Functions
function playExplosionSound() {
    const audio = document.getElementById('explosionSound');
    audio.currentTime = 0;
    audio.play();
}

function displayResult(content) {
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = '';
    resultContent.textContent = content;
    resultContent.classList.add('fade-in');
}

// Bus Station Updates
function updateBusInfo() {
    const busLines = ['480', '420', '380', '500'];
    const destinations = ['באר שבע', 'ירושלים', 'תל אביב', 'אשקלון'];
    
    document.getElementById('busNumber').textContent = 
        busLines[Math.floor(Math.random() * busLines.length)];
    document.getElementById('busDestination').textContent = 
        destinations[Math.floor(Math.random() * destinations.length)];
    
    const now = new Date();
    const minutes = Math.floor(Math.random() * 60);
    now.setMinutes(now.getMinutes() + minutes);
    document.getElementById('arrivalTime').textContent = 
        `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
}

function explodeButton(btn) {
    btn.classList.add('exploded');
    const block = btn.closest('.feature-block');
    const resultDiv = block.querySelector('.feature-result');
    setTimeout(() => btn.classList.remove('exploded'), 600);
    resultDiv.textContent = "בום! הכפתור התפוצץ 🎉";
    document.body.style.background = "#330000";
    setTimeout(() => document.body.style.background = "#181818", 800);
}

function showBusStop(btn, ordered = false) {
    const block = btn.closest('.feature-block');
    const resultDiv = block.querySelector('.feature-result');
    const stations = [
        {line: "68", dest: "מכללת טכנולוגית", img: "assets/images/station1.jpg"},
        {line: "549", dest: "מרכזית ירושלים", img: "assets/images/station2.jpg"},
        {line: "9", dest: "גבעת שאול", img: "assets/images/station3.jpg"},
        {line: "33", dest: "התחנה המרכזית", img: "assets/images/station4.jpg"},
        {line: "15", dest: "הבית", img: "assets/images/station5.jpg"}
    ];
    let station;
    if (ordered) {
        if (!showBusStop.idx) showBusStop.idx = 0;
        station = stations[showBusStop.idx % stations.length];
        showBusStop.idx++;
    } else {
        station = stations[Math.floor(Math.random() * stations.length)];
    }
    resultDiv.innerHTML = `
        <img class="feature-img" src="${station.img}" alt="תחנה">
        <div>
            <div class="bus-line">קו ${station.line}</div>
            <div class="bus-time">יעד: ${station.dest}</div>
        </div>
    `;
}

function showWeather(btn) {
    const block = btn.closest('.feature-block');
    const resultDiv = block.querySelector('.feature-result');
    const weathers = [
        {desc: "גשם", gif: "assets/gif/rain.gif"},
        {desc: "שמש", gif: "assets/gif/sun.gif"},
        {desc: "שלג", gif: "assets/gif/snow.gif"}
    ];
    const w = weathers[Math.floor(Math.random() * weathers.length)];
    resultDiv.innerHTML = `<img class="feature-img" src="${w.gif}" alt="מזג אוויר"> ${w.desc}`;
}

function showTree(btn) {
    const block = btn.closest('.feature-block');
    const resultDiv = block.querySelector('.feature-result');
    // דוגמה לעץ כפתורים פשוט
    resultDiv.innerHTML = `
        <button onclick="showTreeLevel(this, 0)">נושא 1</button>
        <button onclick="showTreeLevel(this, 1)">נושא 2</button>
    `;
}
function showTreeLevel(btn, level) {
    const block = btn.closest('.feature-block');
    const resultDiv = block.querySelector('.feature-result');
    if (level === 0) {
        resultDiv.innerHTML = `
            <button onclick="showTreeLevel(this, 2)">תת נושא 1.1</button>
            <button onclick="showTreeLevel(this, 3)">תת נושא 1.2</button>
        `;
    } else if (level === 1) {
        resultDiv.innerHTML = `
            <button onclick="showTreeLevel(this, 4)">תת נושא 2.1</button>
        `;
    } else {
        resultDiv.innerHTML = "תגובה לדוגמה!";
    }
}

// שורת מצב עליונה (מתחלפת)
const statusArr = [
    "שעה: " + new Date().toLocaleTimeString('he-IL', {hour: '2-digit', minute:'2-digit'}),
    "מצב: לומד",
    "טיפ יומי: תשתה מים!",
    "הפעלת כפתור = כוכב ⭐"
];
let statusIdx = 0;
setInterval(() => {
    document.getElementById('statusBar').textContent = statusArr[statusIdx % statusArr.length];
    statusIdx++;
}, 2500); 