// דוגמאות קוד פשוטות ובטוחות
const examples = {
    1: [
        'function sum(a, b) {\n    return a + b;\n}',
        'const double = x => x * 2;',
        'function isEven(num) {\n    return num % 2 === 0;\n}'
    ],
    2: [
        'for (let i = 0; i < 10; i++) {\n    console.log(i);\n}',
        'if (age >= 18) {\n    console.log("Adult");\n} else {\n    console.log("Minor");\n}',
        'let factorial = 1;\nfor (let i = 1; i <= 5; i++) {\n    factorial *= i;\n}'
    ],
    3: [
        '<button onclick="alert(\'Hello!\')">Click me</button>',
        'document.getElementById("demo").innerHTML = "Hello World";',
        'body {\n    background-color: lightblue;\n    color: darkblue;\n}'
    ],
    4: [
        'fetch("/api/data")\n    .then(response => response.json())\n    .then(data => console.log(data));',
        'async function getData() {\n    const response = await fetch("/api");\n    return response.json();\n}',
        'const api = {\n    get: (url) => fetch(url),\n    post: (url, data) => fetch(url, {method: "POST", body: data})\n};'
    ],
    5: [
        'class Calculator {\n    add(a, b) { return a + b; }\n    subtract(a, b) { return a - b; }\n}',
        'const todoApp = {\n    todos: [],\n    add(item) { this.todos.push(item); },\n    remove(index) { this.todos.splice(index, 1); }\n};',
        'function createCounter() {\n    let count = 0;\n    return {\n        increment: () => ++count,\n        get: () => count\n    };\n}'
    ]
};

// פונקציות למילוי דוגמאות
function fillExample(index) {
    const codeExamples = examples[index];
    if (codeExamples) {
        const randomExample = codeExamples[Math.floor(Math.random() * codeExamples.length)];
        document.getElementById('code' + index).value = randomExample;
    }
}

function fillRandomExample() {
    for (let i = 1; i <= 5; i++) {
        fillExample(i);
    }
}

function fillBeginnerExample() {
    document.getElementById('code1').value = 'function greet(name) {\n    return "Hello, " + name + "!";\n}';
    document.getElementById('code2').value = 'let sum = 0;\nfor (let i = 1; i <= 100; i++) {\n    sum += i;\n}\nconsole.log(sum);';
    document.getElementById('code3').value = '<div id="greeting">Welcome!</div>\n<style>\n#greeting { color: blue; font-size: 20px; }\n</style>';
    document.getElementById('code4').value = 'function fetchData() {\n    return fetch("/api/users")\n        .then(res => res.json())\n        .catch(err => console.error(err));\n}';
    document.getElementById('code5').value = 'const myApp = {\n    users: [],\n    addUser(user) {\n        this.users.push(user);\n        console.log("User added:", user);\n    }\n};';
}

function fillAdvancedExample() {
    document.getElementById('code1').value = 'const memoize = fn => {\n    const cache = new Map();\n    return (...args) => {\n        const key = JSON.stringify(args);\n        return cache.has(key) ? cache.get(key) : cache.set(key, fn(...args)).get(key);\n    };\n};';
    document.getElementById('code2').value = 'function quickSort(arr) {\n    if (arr.length <= 1) return arr;\n    const pivot = arr[Math.floor(arr.length / 2)];\n    const left = arr.filter(x => x < pivot);\n    const right = arr.filter(x => x > pivot);\n    return [...quickSort(left), pivot, ...quickSort(right)];\n}';
    document.getElementById('code3').value = 'const useLocalStorage = (key, defaultValue) => {\n    const [value, setValue] = useState(() => {\n        const item = localStorage.getItem(key);\n        return item ? JSON.parse(item) : defaultValue;\n    });\n    \n    useEffect(() => {\n        localStorage.setItem(key, JSON.stringify(value));\n    }, [key, value]);\n    \n    return [value, setValue];\n};';
    document.getElementById('code4').value = 'class EventEmitter {\n    constructor() { this.events = {}; }\n    \n    on(event, callback) {\n        if (!this.events[event]) this.events[event] = [];\n        this.events[event].push(callback);\n    }\n    \n    emit(event, data) {\n        if (this.events[event]) {\n            this.events[event].forEach(cb => cb(data));\n        }\n    }\n}';
    document.getElementById('code5').value = 'class SmartCache {\n    constructor(maxSize = 100, ttl = 60000) {\n        this.cache = new Map();\n        this.timers = new Map();\n        this.maxSize = maxSize;\n        this.ttl = ttl;\n    }\n    \n    set(key, value) {\n        if (this.cache.size >= this.maxSize) {\n            const firstKey = this.cache.keys().next().value;\n            this.delete(firstKey);\n        }\n        \n        this.cache.set(key, value);\n        \n        if (this.timers.has(key)) {\n            clearTimeout(this.timers.get(key));\n        }\n        \n        const timer = setTimeout(() => this.delete(key), this.ttl);\n        this.timers.set(key, timer);\n    }\n    \n    get(key) {\n        return this.cache.get(key);\n    }\n    \n    delete(key) {\n        this.cache.delete(key);\n        if (this.timers.has(key)) {\n            clearTimeout(this.timers.get(key));\n            this.timers.delete(key);\n        }\n    }\n}';
}

function clearAllFields() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById('code' + i).value = '';
    }
}

function analyzeCode() {
    const codes = [];
    for (let i = 1; i <= 5; i++) {
        const code = document.getElementById('code' + i).value.trim();
        if (code) codes.push(code);
    }

    if (codes.length < 2) {
        alert('יש להכניס לפחות 2 קטעי קוד כדי לקבל ניתוח מעמיק');
        return;
    }

    // הצגת מסך טעינה
    document.querySelector('.analyze-btn').disabled = true;
    document.getElementById('loading').style.display = 'block';

    // שלבי טעינה
    const steps = [
        'סורק תבניות יצירתיות ב־DNA הקוד...',
        'מנתח רמת נדירות הרעיונות שלך...',
        'משווה לדפוסי תכנות של מיליוני מתכנתים...',
        'מעריך רמת חדשנות ויצירתיות...',
        'בונה פרופיל אישיות מתקדם...',
        'מחשב ציון ייחודיות אישי...'
    ];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
        if (stepIndex < steps.length) {
            document.getElementById('loadingSteps').textContent = steps[stepIndex];
            stepIndex++;
        }
    }, 800);

    // סימולציה של ניתוח
    setTimeout(() => {
        clearInterval(stepInterval);
        const analysis = generateAnalysis(codes);
        displayResults(analysis);
        
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }, 5000);
}

function generateAnalysis(codes) {
    let modernFeatures = 0;
    let comments = 0;
    let errorHandling = 0;
    let complexity = 0;
    let creativity = 0;

    codes.forEach(code => {
        // ספירת תכונות מודרניות
        if (code.includes('const ') || code.includes('let ')) modernFeatures++;
        if (code.includes('=>')) modernFeatures++;
        if (code.includes('async') || code.includes('await')) modernFeatures++;
        
        // ספירת תגובות
        if (code.includes('//') || code.includes('/*')) comments++;
        
        // טיפול בשגיאות
        if (code.includes('try') || code.includes('catch')) errorHandling++;
        
        // מדידת מורכבות
        complexity += code.split('\n').length;
        
        // יצירתיות
        if (code.includes('class ') || code.includes('function*')) creativity++;
        if (code.includes('Map') || code.includes('Set')) creativity++;
        if (code.includes('reduce') || code.includes('filter')) creativity++;
    });

    // חישוב ציונים
    const totalScore = modernFeatures * 10 + comments * 5 + errorHandling * 15 + creativity * 20;
    const creativityScore = Math.min(totalScore, 100);
    
    // קביעת פרופיל
    let age, experience, style, rarity;
    
    if (modernFeatures >= 3) {
        age = '22-28';
        experience = 'התחלת לתכנת ב-2018-2021';
        style = 'מתכנת מודרני שעוקב אחרי טרנדים';
    } else if (modernFeatures >= 1) {
        age = '25-32'; 
        experience = 'התחלת לתכנת ב-2015-2018';
        style = 'מתכנת מאוזן עם ניסיון';
    } else {
        age = '28-38';
        experience = 'התחלת לתכנת ב-2010-2015';
        style = 'מתכנת קלאסי עם יסודות חזקים';
    }

    if (creativityScore >= 80) {
        rarity = '1 ל-1000 - נדיר מאוד!';
    } else if (creativityScore >= 60) {
        rarity = '1 ל-100 - לא שגרתי';
    } else if (creativityScore >= 40) {
        rarity = '1 ל-20 - מעל הממוצע';
    } else {
        rarity = '1 ל-5 - סטנדרטי';
    }

    return {
        age,
        experience,
        style,
        creativityScore,
        rarity,
        codes: codes.length
    };
}

function displayResults(analysis) {
    const insights = [
        'אתה מתכנת שמעריך קוד נקי ועקבי',
        'יש לך נטייה לפתרונות יצירתיים ולא שגרתיים',
        'אתה בוחר באלגנטיות על פני מורכבות מיותרת',
        'הקוד שלך מעיד על חשיבה מערכתית מתפתחת',
        'יש לך מאקרו-חשיבה שמתבטאת במיקרו-פתרונות'
    ];
    
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    
    const content = `
        <div class="profile-section">
            <div class="profile-item">
                <strong>🧑 גיל משוער:</strong> ${analysis.age}
            </div>
            <div class="profile-item">
                <strong>📅 תקופת התחלה בתכנות:</strong> ${analysis.experience}
            </div>
            <div class="profile-item">
                <strong>🎯 סגנון תכנות:</strong> ${analysis.style}
            </div>
            <div class="profile-item">
                <strong>🔢 קטעי קוד שנותחו:</strong> ${analysis.codes}
            </div>
            <div class="profile-item">
                <strong>🌟 רמת נדירות:</strong> ${analysis.rarity}
            </div>
        </div>

        <div class="creativity-score">
            <h3>ציון יצירתיות וייחודיות</h3>
            <div class="score-circle">${analysis.creativityScore}</div>
            <p>מתוך 100 נקודות</p>
        </div>

        <div class="insight-box">
            <h3>💡 התובנה המרכזית</h3>
            <div class="insight-text">${randomInsight}</div>
        </div>
    `;

    document.getElementById('personality-content').innerHTML = content;
    document.querySelector('.analyze-btn').disabled = false;
}

function resetAnalysis() {
    document.getElementById('results').style.display = 'none';
    clearAllFields();
    document.querySelector('.main-card').scrollIntoView({ behavior: 'smooth' });
} 