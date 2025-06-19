import { questionDatabase, tips, commonMistakes } from './questions-db.js';

class PracticeSession {
    constructor() {
        this.currentSection = null;
        this.currentQuestion = null;
        this.score = 0;
        this.mistakes = [];
        this.startTime = null;
        this.timeLimit = 45 * 60; // 45 minutes in seconds
    }

    startSession(section) {
        this.currentSection = section;
        this.score = 0;
        this.mistakes = [];
        this.startTime = new Date();
        this.loadQuestion();
    }

    loadQuestion() {
        const questions = questionDatabase[this.currentSection];
        this.currentQuestion = questions[Math.floor(Math.random() * questions.length)];
        this.displayQuestion();
    }

    displayQuestion() {
        const questionElement = document.getElementById(`${this.currentSection}Question`);
        questionElement.textContent = this.currentQuestion.question;

        if (this.currentQuestion.options) {
            const optionsContainer = document.getElementById(`${this.currentSection}Options`);
            optionsContainer.innerHTML = '';
            this.currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = () => this.checkAnswer(index);
                optionsContainer.appendChild(button);
            });
        }
    }

    checkAnswer(userAnswer) {
        let isCorrect = false;
        if (this.currentQuestion.options) {
            isCorrect = userAnswer === this.currentQuestion.correct;
        } else {
            isCorrect = userAnswer === this.currentQuestion.answer;
        }

        const resultElement = document.getElementById(`${this.currentSection}Result`);
        if (isCorrect) {
            this.score++;
            resultElement.textContent = "נכון! " + this.currentQuestion.explanation;
            resultElement.className = "result correct";
        } else {
            this.mistakes.push({
                question: this.currentQuestion.question,
                userAnswer: userAnswer,
                correctAnswer: this.currentQuestion.correct || this.currentQuestion.answer,
                explanation: this.currentQuestion.explanation
            });
            resultElement.textContent = "לא נכון. " + this.currentQuestion.explanation;
            resultElement.className = "result incorrect";
        }

        this.updateScore();
        setTimeout(() => this.loadQuestion(), 3000);
    }

    updateScore() {
        const scoreElement = document.querySelector(`[data-section="${this.currentSection}"] .section-score`);
        if (scoreElement) {
            scoreElement.textContent = `${this.score}/25`;
        }
        
        const totalScoreElement = document.getElementById('totalScore');
        if (totalScoreElement) {
            const totalPossible = 125; // 25 questions × 5 sections
            const percentage = Math.round((this.score / totalPossible) * 100);
            totalScoreElement.textContent = percentage;
            
            // Update progress bar
            const progressBar = document.getElementById('progressBarFill');
            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
            }
        }
    }

    showTips() {
        const sectionTips = tips[this.currentSection];
        if (sectionTips) {
            alert(sectionTips.join('\n'));
        }
    }

    getCommonMistakes() {
        return commonMistakes[this.currentSection] || [];
    }

    getRemainingTime() {
        if (!this.startTime) return this.timeLimit;
        const elapsed = Math.floor((new Date() - this.startTime) / 1000);
        return Math.max(0, this.timeLimit - elapsed);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Timer functionality
let timerInterval;

function startTimer(practice) {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        const remaining = practice.getRemainingTime();
        document.getElementById('timer').textContent = practice.formatTime(remaining);
        
        if (remaining <= 0) {
            clearInterval(timerInterval);
            alert('הזמן נגמר!');
            // Show final score and analysis
            showResults(practice);
        }
    }, 1000);
}

function showResults(practice) {
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'results-summary';
    
    const scoreHeader = document.createElement('h2');
    scoreHeader.textContent = `ציון סופי: ${practice.score}/125`;
    resultsDiv.appendChild(scoreHeader);
    
    const mistakesHeader = document.createElement('h3');
    mistakesHeader.textContent = 'ניתוח טעויות:';
    resultsDiv.appendChild(mistakesHeader);
    
    const mistakesList = document.createElement('ul');
    practice.mistakes.forEach(mistake => {
        const li = document.createElement('li');
        li.textContent = `שאלה: ${mistake.question}\nתשובה שלך: ${mistake.userAnswer}\nתשובה נכונה: ${mistake.correctAnswer}\nהסבר: ${mistake.explanation}`;
        mistakesList.appendChild(li);
    });
    resultsDiv.appendChild(mistakesList);
    
    document.body.appendChild(resultsDiv);
}

// Export the practice session class and helper functions
export { PracticeSession, startTimer, showResults }; 