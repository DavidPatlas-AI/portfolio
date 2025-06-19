import { PracticeSession, startTimer, showResults } from './practice.js';
import { Calculator, DrawingPad, showFormulas } from './tools.js';
import { questionDatabase, tips, commonMistakes } from './questions-db.js';

// Initialize practice session
const practice = new PracticeSession();

// Initialize tools
let calculator = null;
let drawingPad = null;

// State management
let currentState = {
    currentSection: null,
    currentQuestionIndex: 0,
    score: {
        analogies: 0,
        sequences: 0,
        shapes: 0,
        quantitative: 0,
        logic: 0
    },
    totalQuestions: {
        analogies: questionDatabase.analogies.length,
        sequences: questionDatabase.sequences.length,
        shapes: questionDatabase.shapes.length,
        quantitative: questionDatabase.quantitative.length,
        logic: questionDatabase.logic.length
    },
    markedQuestions: new Set(),
    testType: 'practice', // 'practice' or 'exam'
    timeLeft: 45 * 60, // 45 minutes in seconds
    timerInterval: null,
    isTimerRunning: false
};

// DOM Elements
const elements = {
    topBar: document.querySelector('.top-bar'),
    timer: document.getElementById('timer'),
    timerControl: document.getElementById('timerControl'),
    testTypeButtons: document.querySelectorAll('.test-type-btn'),
    navigationButtons: document.querySelector('.navigation-buttons'),
    utilityButtons: document.querySelector('.utility-buttons'),
    scoreDisplay: document.querySelector('.score-display'),
    progressBar: document.querySelector('.progress-bar-fill'),
    questionWindow: document.querySelector('.window'),
    toolWindows: document.querySelectorAll('.tool-window'),
    calculator: document.querySelector('.calculator'),
    drawingPad: document.getElementById('drawingPad'),
    formulasWindow: document.querySelector('.formulas-window')
};

// Initialize the application
function initializeApp() {
    setupEventListeners();
    loadProgress();
    updateScoreDisplay();
    setupNavigationButtons();
    setupTestTypeSelector();
    setupTools();
    
    // Check for offline capability
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(error => console.error('ServiceWorker error:', error));
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Test type selection
    elements.testTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.testTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentState.testType = button.dataset.type;
            resetTest();
        });
    });

    // Timer control
    elements.timerControl?.addEventListener('click', toggleTimer);

    // Tools toggle
    document.querySelectorAll('.tool-btn').forEach(button => {
        button.addEventListener('click', () => toggleTool(button.dataset.tool));
    });
}

// Navigation Setup
function setupNavigationButtons() {
    const sections = ['analogies', 'sequences', 'shapes', 'quantitative', 'logic'];
    const fragment = document.createDocumentFragment();
    
    sections.forEach(section => {
        const button = document.createElement('button');
        button.className = 'nav-btn';
        button.dataset.section = section;
        button.innerHTML = `
            ${getSectionTitle(section)}
            <span class="section-score">
                ${currentState.score[section]}/${currentState.totalQuestions[section]}
            </span>
        `;
        
        button.addEventListener('click', () => loadSection(section));
        fragment.appendChild(button);
    });
    
    elements.navigationButtons.innerHTML = '';
    elements.navigationButtons.appendChild(fragment);
}

// Section Loading
function loadSection(section) {
    currentState.currentSection = section;
    currentState.currentQuestionIndex = 0;
    showQuestion();
    updateScoreDisplay();
}

// Question Display
function showQuestion() {
    const section = currentState.currentSection;
    const index = currentState.currentQuestionIndex;
    const question = questionDatabase[section][index];

    if (!question) return;

    elements.questionWindow.style.display = 'block';
    elements.questionWindow.innerHTML = `
        <h2>${sanitizeHTML(getSectionTitle(section))} - שאלה ${index + 1}/${currentState.totalQuestions[section]}</h2>
        <div class="question">${sanitizeHTML(question.question)}</div>
        <div class="options">
            ${getOptionsHTML(question)}
        </div>
        <div class="result" style="display: none;"></div>
        <button class="mark-btn" data-index="${index}">
            ${currentState.markedQuestions.has(index) ? 'הסר סימון' : 'סמן לחזרה'}
        </button>
    `;

    // Add event listeners to options
    document.querySelectorAll('.options button').forEach((button, i) => {
        button.addEventListener('click', () => checkAnswer(i));
    });

    // Add event listener to mark button
    document.querySelector('.mark-btn').addEventListener('click', toggleMarkQuestion);
}

// Answer Checking
function checkAnswer(selectedIndex) {
    const section = currentState.currentSection;
    const question = questionDatabase[section][currentState.currentQuestionIndex];
    const resultDiv = elements.questionWindow.querySelector('.result');
    
    let isCorrect = false;
    if (section === 'quantitative') {
        isCorrect = Number(selectedIndex) === question.answer;
    } else {
        isCorrect = selectedIndex === question.correct;
    }

    if (isCorrect) {
        currentState.score[section]++;
        resultDiv.className = 'result correct';
        resultDiv.textContent = 'נכון! ' + question.explanation;
    } else {
        resultDiv.className = 'result incorrect';
        resultDiv.textContent = 'לא נכון. ' + question.explanation;
    }

    resultDiv.style.display = 'block';
    updateScoreDisplay();
    saveProgress();

    // Move to next question after delay
    setTimeout(() => {
        if (currentState.currentQuestionIndex < currentState.totalQuestions[section] - 1) {
            currentState.currentQuestionIndex++;
            showQuestion();
        } else {
            showSectionSummary();
        }
    }, 2000);
}

// Timer Functions
function toggleTimer() {
    if (currentState.isTimerRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    currentState.isTimerRunning = true;
    elements.timerControl.textContent = 'עצור';
    currentState.timerInterval = setInterval(() => {
        currentState.timeLeft--;
        updateTimerDisplay();
        if (currentState.timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

function stopTimer() {
    currentState.isTimerRunning = false;
    elements.timerControl.textContent = 'התחל';
    clearInterval(currentState.timerInterval);
}

function updateTimerDisplay() {
    if (currentState.timeLeft <= 0) {
        currentState.timeLeft = 0;
        stopTimer();
        endTest();
    }
    const minutes = Math.floor(currentState.timeLeft / 60);
    const seconds = currentState.timeLeft % 60;
    elements.timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Tools Setup
function setupTools() {
    setupCalculator();
    setupDrawingPad();
    setupFormulas();
}

function setupCalculator() {
    if (!elements.calculator) return;

    const display = elements.calculator.querySelector('.calculator-display');
    const buttons = elements.calculator.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            switch(value) {
                case '=':
                    try {
                        display.textContent = eval(display.textContent);
                    } catch (e) {
                        display.textContent = 'Error';
                    }
                    break;
                case 'C':
                    display.textContent = '';
                    break;
                default:
                    display.textContent += value;
            }
        });
    });
}

function setupDrawingPad() {
    if (!elements.drawingPad) return;

    const context = elements.drawingPad.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    elements.drawingPad.addEventListener('mousedown', startDrawing);
    elements.drawingPad.addEventListener('mousemove', draw);
    elements.drawingPad.addEventListener('mouseup', stopDrawing);
    elements.drawingPad.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;

        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Clear drawing
    document.querySelector('.clear-drawing')?.addEventListener('click', () => {
        context.clearRect(0, 0, elements.drawingPad.width, elements.drawingPad.height);
    });
}

function setupFormulas() {
    if (!elements.formulasWindow) return;

    const formulas = {
        'אחוזים': [
            'אחוז = חלק / שלם × 100',
            'חלק = שלם × אחוז / 100'
        ],
        'יחס': [
            'a:b = c:d → a×d = b×c',
            'יחס הפוך: a×x = b×y'
        ],
        'מהירות': [
            'מהירות = דרך / זמן',
            'דרך = מהירות × זמן',
            'זמן = דרך / מהירות'
        ]
    };

    let html = '';
    for (const [category, formulaList] of Object.entries(formulas)) {
        html += `
            <div class="formula-category">
                <h4>${category}</h4>
                ${formulaList.map(formula => `<p>${formula}</p>`).join('')}
            </div>
        `;
    }

    elements.formulasWindow.querySelector('.formulas-content').innerHTML = html;
}

// Utility Functions
function getSectionTitle(section) {
    const titles = {
        analogies: 'אנלוגיות מילוליות',
        sequences: 'השלמת סדרות',
        shapes: 'סדרות צורות',
        quantitative: 'חשיבה כמותית',
        logic: 'היסקים לוגיים'
    };
    return titles[section];
}

function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function getOptionsHTML(question) {
    if (question.options) {
        return question.options
            .map((option, i) => `<button data-index="${i}">${sanitizeHTML(option)}</button>`)
            .join('');
    } else {
        return `<input type="number" placeholder="הכנס תשובה" />
                <button onclick="checkAnswer(this.previousElementSibling.value)">בדוק</button>`;
    }
}

function toggleMarkQuestion(e) {
    const index = Number(e.target.dataset.index);
    if (currentState.markedQuestions.has(index)) {
        currentState.markedQuestions.delete(index);
        e.target.textContent = 'סמן לחזרה';
    } else {
        currentState.markedQuestions.add(index);
        e.target.textContent = 'הסר סימון';
    }
    saveProgress();
}

function toggleTool(toolId) {
    elements.toolWindows.forEach(window => {
        if (window.id === toolId) {
            window.style.display = window.style.display === 'none' ? 'block' : 'none';
        } else {
            window.style.display = 'none';
        }
    });
}

function updateScoreDisplay() {
    const totalScore = Object.values(currentState.score).reduce((a, b) => a + b, 0);
    const totalQuestions = Object.values(currentState.totalQuestions).reduce((a, b) => a + b, 0);
    const percentage = Math.round((totalScore / totalQuestions) * 100);

    elements.scoreDisplay.innerHTML = `
        <h3>ציון כולל: ${percentage}%</h3>
        <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${percentage}%"></div>
        </div>
        <p>${totalScore} מתוך ${totalQuestions} שאלות נכונות</p>
    `;
}

function showSectionSummary() {
    const section = currentState.currentSection;
    const score = currentState.score[section];
    const total = currentState.totalQuestions[section];
    const percentage = Math.round((score / total) * 100);

    elements.questionWindow.innerHTML = `
        <h2>סיכום ${getSectionTitle(section)}</h2>
        <div class="summary">
            <p>ציון: ${percentage}%</p>
            <p>${score} מתוך ${total} שאלות נכונות</p>
            <div class="tips">
                <h3>טיפים לשיפור:</h3>
                <ul>
                    ${tips[section].map(tip => `<li>${tip}</li>`).join('')}
                </ul>
                <h3>טעויות נפוצות:</h3>
                <ul>
                    ${commonMistakes[section].map(mistake => `<li>${mistake}</li>`).join('')}
                </ul>
            </div>
            <button onclick="loadSection('${section}')">נסה שוב</button>
        </div>
    `;
}

// Progress Management
function saveProgress() {
    try {
        const data = JSON.stringify({
            score: currentState.score,
            markedQuestions: Array.from(currentState.markedQuestions)
        });
        localStorage.setItem('testProgress', data);
    } catch (error) {
        console.error('Failed to save progress:', error);
        // Notify user
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = 'לא ניתן לשמור את ההתקדמות. ייתכן שהאחסון מלא.';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('testProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            currentState.score = progress.score;
            currentState.markedQuestions = new Set(progress.markedQuestions);
        }
    } catch (error) {
        console.error('Failed to load progress:', error);
        resetTest(); // Reset to default state if loading fails
    }
}

function resetTest() {
    currentState.score = {
        analogies: 0,
        sequences: 0,
        shapes: 0,
        quantitative: 0,
        logic: 0
    };
    currentState.markedQuestions.clear();
    currentState.currentQuestionIndex = 0;
    currentState.timeLeft = 45 * 60;
    stopTimer();
    updateTimerDisplay();
    updateScoreDisplay();
    saveProgress();
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Export for testing
export { currentState, elements, initializeApp }; 