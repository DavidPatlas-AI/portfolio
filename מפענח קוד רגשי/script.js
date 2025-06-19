// דוגמאות קוד לשימוש במערכת
const examples = {
    1: [
        'function sum(a, b) {\n    return a + b;\n}',
        'const double = x => x * 2;',
        'function isEven(num) {\n    return num % 2 === 0;\n}',
        'const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);'
    ],
    2: [
        'for (let i = 0; i < 10; i++) {\n    console.log(i);\n}',
        'if (age >= 18) {\n    console.log("Adult");\n} else {\n    console.log("Minor");\n}',
        'let factorial = 1;\nfor (let i = 1; i <= 5; i++) {\n    factorial *= i;\n}',
        'const fibonacci = n => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);'
    ],
    3: [
        '<button onclick="alert(\'Hello!\')">Click me</button>',
        'document.getElementById("demo").innerHTML = "Hello World";',
        'body {\n    background-color: lightblue;\n    color: darkblue;\n}',
        'const toggleDarkMode = () => {\n    document.body.classList.toggle("dark-mode");\n};'
    ],
    4: [
        'fetch("/api/data")\n    .then(response => response.json())\n    .then(data => console.log(data));',
        'async function getData() {\n    const response = await fetch("/api");\n    return response.json();\n}',
        'const api = {\n    get: (url) => fetch(url),\n    post: (url, data) => fetch(url, {method: "POST", body: data})\n};',
        'import { createStore } from "redux";\nconst store = createStore(reducer);'
    ],
    5: [
        'class Calculator {\n    add(a, b) { return a + b; }\n    subtract(a, b) { return a - b; }\n}',
        'const todoApp = {\n    todos: [],\n    add(item) { this.todos.push(item); },\n    remove(index) { this.todos.splice(index, 1); }\n};',
        'function createCounter() {\n    let count = 0;\n    return {\n        increment: () => ++count,\n        get: () => count\n    };\n}',
        'const useLocalStorage = (key, defaultValue) => {\n    const saved = localStorage.getItem(key);\n    return saved ? JSON.parse(saved) : defaultValue;\n};'
    ]
};

// שלבי הטעינה
const loadingSteps = [
    'סורק תבניות יצירתיות ב־DNA הקוד...',
    'מנתח רמת נדירות הרעיונות שלך...',
    'משווה לדפוסי תכנות של מיליוני מתכנתים...',
    'מעריך רמת חדשנות ויצירתיות...',
    'בונה פרופיל אישיות מתקדם...',
    'מחשב ציון ייחודיות אישי...'
];

/**
 * מילוי דוגמה לקטגוריה מסוימת
 * @param {number} index - מספר הקטגוריה (1-5)
 */
function fillExample(index) {
    if (!examples[index]) {
        console.error(`אין דוגמאות עבור קטגוריה ${index}`);
        return;
    }
    
    const codeExamples = examples[index];
    const randomExample = codeExamples[Math.floor(Math.random() * codeExamples.length)];
    const textarea = document.getElementById('code' + index);
    
    if (textarea) {
        textarea.value = randomExample;
        // אפקט ויזואלי קטן
        textarea.style.border = '2px solid #28a745';
        setTimeout(() => {
            textarea.style.border = '2px solid #dee2e6';
        }, 1000);
    } else {
        console.error(`לא נמצא אלמנט code${index}`);
    }
}

/**
 * מילוי דוגמאות רנדומליות לכל הקטגוריות
 */
function fillRandomExample() {
    try {
        for (let i = 1; i <= 5; i++) {
            fillExample(i);
        }
        showToast('✨ מולא בדוגמאות רנדומליות!');
    } catch (error) {
        console.error('שגיאה במילוי דוגמאות רנדומליות:', error);
        showToast('❌ שגיאה במילוי הדוגמאות', 'error');
    }
}

/**
 * מילוי דוגמאות למתחילים
 */
function fillBeginnerExample() {
    try {
        const beginnerCodes = {
            1: 'function greet(name) {\n    return "Hello, " + name + "!";\n}',
            2: 'let sum = 0;\nfor (let i = 1; i <= 100; i++) {\n    sum += i;\n}\nconsole.log(sum);',
            3: '<div id="greeting">Welcome!</div>\n<style>\n#greeting { color: blue; font-size: 20px; }\n</style>',
            4: 'function fetchData() {\n    return fetch("/api/users")\n        .then(res => res.json())\n        .catch(err => console.error(err));\n}',
            5: 'const myApp = {\n    users: [],\n    addUser(user) {\n        this.users.push(user);\n        console.log("User added:", user);\n    }\n};'
        };

        Object.keys(beginnerCodes).forEach(key => {
            const textarea = document.getElementById('code' + key);
            if (textarea) {
                textarea.value = beginnerCodes[key];
            }
        });
        
        showToast('👶 מולא בדוגמאות למתחילים!');
    } catch (error) {
        console.error('שגיאה במילוי דוגמאות למתחילים:', error);
        showToast('❌ שגיאה במילוי הדוגמאות', 'error');
    }
}

/**
 * מילוי דוגמאות מתקדמות
 */
function fillAdvancedExample() {
    try {
        const advancedCodes = {
            1: 'const memoize = fn => {\n    const cache = new Map();\n    return (...args) => {\n        const key = JSON.stringify(args);\n        return cache.has(key) ? cache.get(key) : cache.set(key, fn(...args)).get(key);\n    };\n};',
            2: 'function quickSort(arr) {\n    if (arr.length <= 1) return arr;\n    const pivot = arr[Math.floor(arr.length / 2)];\n    const left = arr.filter(x => x < pivot);\n    const right = arr.filter(x => x > pivot);\n    return [...quickSort(left), pivot, ...quickSort(right)];\n}',
            3: 'const useLocalStorage = (key, defaultValue) => {\n    const [value, setValue] = useState(() => {\n        const item = localStorage.getItem(key);\n        return item ? JSON.parse(item) : defaultValue;\n    });\n    \n    useEffect(() => {\n        localStorage.setItem(key, JSON.stringify(value));\n    }, [key, value]);\n    \n    return [value, setValue];\n};',
            4: 'class EventEmitter {\n    constructor() { this.events = {}; }\n    \n    on(event, callback) {\n        if (!this.events[event]) this.events[event] = [];\n        this.events[event].push(callback);\n    }\n    \n    emit(event, data) {\n        if (this.events[event]) {\n            this.events[event].forEach(cb => cb(data));\n        }\n    }\n}',
            5: 'class SmartCache {\n    constructor(maxSize = 100, ttl = 60000) {\n        this.cache = new Map();\n        this.timers = new Map();\n        this.maxSize = maxSize;\n        this.ttl = ttl;\n    }\n    \n    set(key, value) {\n        if (this.cache.size >= this.maxSize) {\n            const firstKey = this.cache.keys().next().value;\n            this.delete(firstKey);\n        }\n        \n        this.cache.set(key, value);\n        \n        if (this.timers.has(key)) {\n            clearTimeout(this.timers.get(key));\n        }\n        \n        const timer = setTimeout(() => this.delete(key), this.ttl);\n        this.timers.set(key, timer);\n    }\n    \n    get(key) {\n        return this.cache.get(key);\n    }\n    \n    delete(key) {\n        this.cache.delete(key);\n        if (this.timers.has(key)) {\n            clearTimeout(this.timers.get(key));\n            this.timers.delete(key);\n        }\n    }\n}'
        };

        Object.keys(advancedCodes).forEach(key => {
            const textarea = document.getElementById('code' + key);
            if (textarea) {
                textarea.value = advancedCodes[key];
            }
        });
        
        showToast('🧠 מולא בדוגמאות מתקדמות!');
    } catch (error) {
        console.error('שגיאה במילוי דוגמאות מתקדמות:', error);
        showToast('❌ שגיאה במילוי הדוגמאות', 'error');
    }
}

/**
 * מחיקת כל השדות
 */
function clearAllFields() {
    try {
        for (let i = 1; i <= 5; i++) {
            const textarea = document.getElementById('code' + i);
            if (textarea) {
                textarea.value = '';
            }
        }
        showToast('🧹 כל השדות נוקו!');
    } catch (error) {
        console.error('שגיאה במחיקת השדות:', error);
        showToast('❌ שגיאה במחיקת השדות', 'error');
    }
}

/**
 * פונקציה ראשית לניתוח הקוד
 */
function analyzeCode() {
    try {
        const codes = [];
        for (let i = 1; i <= 5; i++) {
            const textarea = document.getElementById('code' + i);
            const code = textarea ? textarea.value.trim() : '';
            if (code) codes.push(code);
        }

        if (codes.length < 2) {
            showToast('⚠️ יש להכניס לפחות 2 קטעי קוד כדי לקבל ניתוח מעמיק', 'warning');
            return;
        }

        // השבתת כפתור הניתוח
        const analyzeBtn = document.querySelector('.analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.disabled = true;
            analyzeBtn.textContent = '🔄 מנתח...';
        }

        // הצגת מסך טעינה
        showLoadingScreen();

        // סימולציה של ניתוח עם שלבים
        runAnalysisSteps().then(() => {
            const analysis = generateAnalysis(codes);
            displayResults(analysis);
            hideLoadingScreen();
            showResultsSection();
            
            // החזרת כפתור הניתוח למצב רגיל
            if (analyzeBtn) {
                analyzeBtn.disabled = false;
                analyzeBtn.textContent = '🔮✨ פענח את נשמת הקוד ואת רמת הייחודיות שלי';
            }
        });

    } catch (error) {
        console.error('שגיאה בניתוח הקוד:', error);
        showToast('❌ שגיאה בניתוח הקוד. אנא נסה שוב.', 'error');
        hideLoadingScreen();
    }
}

/**
 * הצגת מסך הטעינה
 */
function showLoadingScreen() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'block';
    }
}

/**
 * הסתרת מסך הטעינה
 */
function hideLoadingScreen() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

/**
 * הצגת סקציית התוצאות
 */
function showResultsSection() {
    const results = document.getElementById('results');
    if (results) {
        results.style.display = 'block';
        results.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * הרצת שלבי הניתוח עם אנימציה
 */
function runAnalysisSteps() {
    return new Promise((resolve) => {
        let stepIndex = 0;
        const stepInterval = setInterval(() => {
            const loadingStepsElement = document.getElementById('loadingSteps');
            if (loadingStepsElement && stepIndex < loadingSteps.length) {
                loadingStepsElement.textContent = loadingSteps[stepIndex];
                stepIndex++;
            } else {
                clearInterval(stepInterval);
                resolve();
            }
        }, 800);
    });
}

/**
 * יצירת ניתוח מפורט על בסיס הקוד שהוזן
 */
function generateAnalysis(codes) {
    let modernFeatures = 0;
    let comments = 0;
    let errorHandling = 0;
    let complexity = 0;
    let creativity = 0;
    let totalLines = 0;

    codes.forEach(code => {
        if (!code || typeof code !== 'string') return;

        totalLines += code.split('\n').length;

        // ספירת תכונות מודרניות
        if (code.includes('const ') || code.includes('let ')) modernFeatures++;
        if (code.includes('=>')) modernFeatures++;
        if (code.includes('async') || code.includes('await')) modernFeatures++;
        if (code.includes('import ') || code.includes('export ')) modernFeatures++;
        if (code.includes('...')) modernFeatures++; // spread operator
        
        // ספירת הערות
        if (code.includes('//') || code.includes('/*')) comments++;
        
        // טיפול בשגיאות
        if (code.includes('try') || code.includes('catch') || code.includes('.catch(')) errorHandling++;
        
        // מדידת מורכבות
        complexity += (code.match(/if |for |while |switch /g) || []).length;
        
        // יצירתיות
        if (code.includes('class ') || code.includes('function*')) creativity++;
        if (code.includes('Map') || code.includes('Set') || code.includes('WeakMap')) creativity++;
        if (code.includes('reduce') || code.includes('filter') || code.includes('map')) creativity++;
        if (code.includes('Promise') || code.includes('.then(')) creativity++;
        if (code.includes('localStorage') || code.includes('sessionStorage')) creativity++;
    });

    // חישוב ציונים עם משקלים מותאמים
    const totalScore = Math.min(
        modernFeatures * 12 + 
        comments * 8 + 
        errorHandling * 18 + 
        creativity * 15 + 
        complexity * 3,
        100
    );
    
    const creativityScore = Math.max(10, totalScore); // מינימום 10 נקודות
    
    // קביעת פרופיל על בסיס הניתוח
    let age, experience, style, rarity, personality;
    
    if (modernFeatures >= 4) {
        age = '22-28';
        experience = 'התחלת לתכנת ב-2018-2022';
        style = 'מתכנת מודרני ועדכני שעוקב אחרי הטרנדים החדשים';
        personality = 'אדפטיבי וחדשני';
    } else if (modernFeatures >= 2) {
        age = '25-32'; 
        experience = 'התחלת לתכנת ב-2015-2019';
        style = 'מתכנת מאוזן עם ניסיון מגוון וגישה פרקטית';
        personality = 'מאוזן ומנוסה';
    } else {
        age = '28-40';
        experience = 'התחלת לתכנת ב-2008-2015';
        style = 'מתכנת קלאסי עם יסודות חזקים ודגש על יציבות';
        personality = 'יציב ואמין';
    }

    if (creativityScore >= 80) {
        rarity = '1 ל-1000 - נדיר ביותר! 🦄';
    } else if (creativityScore >= 65) {
        rarity = '1 ל-100 - לא שגרתי ומרשים 🌟';
    } else if (creativityScore >= 45) {
        rarity = '1 ל-20 - מעל הממוצע 🚀';
    } else {
        rarity = '1 ל-5 - סטנדרטי ויציב 👍';
    }

    return {
        age,
        experience,
        style,
        personality,
        creativityScore,
        rarity,
        codes: codes.length,
        totalLines,
        modernFeatures,
        creativity,
        errorHandling
    };
}

/**
 * הצגת התוצאות בממשק המשתמש
 */
function displayResults(analysis) {
    try {
        const content = `
            <div class="profile-section">
                <div class="profile-item">
                    <strong>🧑 גיל משוער:</strong> ${analysis.age}
                </div>
                <div class="profile-item">
                    <strong>📅 תחילת דרך בתכנות:</strong> ${analysis.experience}
                </div>
                <div class="profile-item">
                    <strong>🎨 סגנון תכנות:</strong> ${analysis.style}
                </div>
                <div class="profile-item">
                    <strong>👤 סוג אישיות:</strong> ${analysis.personality}
                </div>
                <div class="profile-item">
                    <strong>📊 קטעי קוד שנותחו:</strong> ${analysis.codes} (${analysis.totalLines} שורות)
                </div>
            </div>

            <div class="creativity-score">
                <h3>🏆 ציון יצירתיות וייחודיות</h3>
                <div class="score-circle">${analysis.creativityScore}/100</div>
                <div><strong>רמת נדירות:</strong> ${analysis.rarity}</div>
            </div>

            <div class="insight-box">
                <h3>🔮 תובנה עמוקה על נשמת הקוד שלך</h3>
                <div class="insight-text">
                    ${generatePersonalInsight(analysis)}
                </div>
            </div>
        `;
        
        const personalityContent = document.getElementById('personality-content');
        if (personalityContent) {
            personalityContent.innerHTML = content;
        }
        
    } catch (error) {
        console.error('שגיאה בהצגת התוצאות:', error);
        showToast('❌ שגיאה בהצגת התוצאות', 'error');
    }
}

/**
 * יצירת תובנות אישיות מותאמות אישית
 */
function generatePersonalInsight(analysis) {
    const insights = {
        high: [
            "אתה מתכנת יוצא דופן! הקוד שלך מראה על חשיבה חדשנית ורעיונות שלא כל מתכנת יגיע אליהם. יש לך כישרון טבעי לפתרונות יצירתיים שמשלבים טכנולוגיות מודרניות בצורה חכמה.",
            "נדיר למצוא מתכנת עם רמת יצירתיות כזו! אתה לא רק פותר בעיות - אתה ממציא דרכים חדשות לחשוב על התכנות. הסגנון שלך מעיד על ראייה רחבה ויכולת לחבר בין תחומים שונים.",
            "הקוד שלך חושף אישיות של חלוץ טכנולוגי. אתה מהסוג שמוביל טרנדים במקום לעקוב אחריהם. התשוקה שלך לחדשנות וההבנה העמוקה שלך בטכנולוגיה הופכים אותך למתכנת נדיר.",
            "אתה בעל חשיבה אלגוריתמית מתקדמת! הקוד שלך מעיד על יכולת לראות דפוסים מורכבים ולפתור בעיות בדרכים לא קונבנציונליות. זה סוג של חכמה טכנולוגית שלא כולם זוכים לה."
        ],
        medium: [
            "יש לך איזון מעולה בין יצירתיות לפרקטיות. הקוד שלך מראה על חשיבה מבוססת עם נגיעות של חדשנות. אתה יודע מתי להיות יצירתי ומתי לשמור על הפשטות - זו חכמה נדירה.",
            "אתה מתכנת מנוסה שמבין את האיזון הנכון בין חדשנות ויציבות. הסגנון שלך מעיד על מתכנת שלמד לכבד את הטכנולוגיה ולהשתמש בה בחכמה.",
            "הקוד שלך חושף מתכנת עם הבנה עמיקה של עקרונות התכנות הטובים. אתה מצליח לשלב בין גישות קלאסיות לטכניקות מודרניות בצורה מאוזנת ומקצועית.",
            "יש לך גישה בוגרת לתכנות - אתה לא נמשך אחרי כל טרנד חדש, אבל גם לא מתעלם מחדשנות. הקוד שלך מעיד על מתכנת שיודע לבחור את הכלים הנכונים למשימה."
        ],
        low: [
            "אתה מתכנת שמעריך יציבות ובטחון בקוד. הגישה הקלאסית שלך מבטיחה שהפתרונות שלך עובדים ועובדים טוב. יש משהו מרגיע בסגנון הברור והמובן שלך.",
            "הקוד שלך מעיד על מתכנת שמבין שלפעמים הפתרון הטוב ביותר הוא הפשוט ביותר. אתה בונה בסיס חזק ואמין - זה בדיוק מה שחברות טכנולוגיה מחפשות.",
            "יש חוכמה בגישה המעשית שלך לתכנות. אתה מתמקד בפתרונות שעובדים ונבדקו זמן רב. הקוד שלך אולי לא הכי 'חדשני', אבל הוא יציב ואמין.",
            "אתה מייצג את הבסיס החזק של עולם התכנות. הגישה הקלאסית שלך מבטיחה שהפרויקטים שלך יהיו יציבים ונתמכים לאורך זמן. זה ערך שלא כולם מעריכים, אבל הוא קריטי."
        ]
    };

    let category;
    if (analysis.creativityScore >= 70) category = 'high';
    else if (analysis.creativityScore >= 45) category = 'medium';
    else category = 'low';

    const categoryInsights = insights[category];
    return categoryInsights[Math.floor(Math.random() * categoryInsights.length)];
}

/**
 * איפוס המערכת לניתוח חדש
 */
function resetAnalysis() {
    try {
        const results = document.getElementById('results');
        const loading = document.getElementById('loading');
        
        if (results) results.style.display = 'none';
        if (loading) loading.style.display = 'none';
        
        clearAllFields();
        
        const analyzeBtn = document.querySelector('.analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = '🔮✨ פענח את נשמת הקוד ואת רמת הייחודיות שלי';
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('🔄 המערכת אופסה בהצלחה!');
        
    } catch (error) {
        console.error('שגיאה באיפוס המערכת:', error);
        showToast('❌ שגיאה באיפוס המערכת', 'error');
    }
}

/**
 * הצגת הודעות Toast למשתמש
 */
function showToast(message, type = 'success') {
    // יצירת אלמנט Toast אם הוא לא קיים
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            color: #333;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            direction: rtl;
        `;
        document.body.appendChild(toast);
    }
    
    // עיצוב לפי סוג ההודעה
    if (type === 'error') {
        toast.style.background = '#f8d7da';
        toast.style.color = '#721c24';
        toast.style.border = '1px solid #f5c6cb';
    } else if (type === 'warning') {
        toast.style.background = '#fff3cd';
        toast.style.color = '#856404';
        toast.style.border = '1px solid #ffeaa7';
    } else {
        toast.style.background = '#d4edda';
        toast.style.color = '#155724';
        toast.style.border = '1px solid #c3e6cb';
    }
    
    toast.textContent = message;
    toast.style.transform = 'translateX(0)';
    
    // הסתרה לאחר 3 שניות
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
    }, 3000);
}

// איפוס אירועים בטעינת הדף
document.addEventListener('DOMContentLoaded', function() {
    console.log('CodeMirror-Neshama™ נטען בהצלחה! 🎉');
    
    // הוספת מאזינים לאירועי מקלדת
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter לניתוח מהיר
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            analyzeCode();
        }
        
        // Escape לאיפוס
        if (e.key === 'Escape') {
            resetAnalysis();
        }
    });
    
    // הוספת tooltips לכפתורים
    const tooltips = {
        '.analyze-btn': 'Ctrl+Enter לניתוח מהיר',
        '.reset-btn': 'Escape לאיפוס',
        '.demo-btn': 'לחץ למילוי מהיר'
    };
    
    Object.entries(tooltips).forEach(([selector, text]) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.title = text;
        });
    });
    
    showToast('ברוכים הבאים ל-CodeMirror-Neshama™! 🎯');
}); 