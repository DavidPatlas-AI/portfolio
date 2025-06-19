// Timer Functionality
let timerInterval;
let isBreak = false;

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function startTimer(duration) {
    clearInterval(timerInterval);
    let timer = duration;
    const display = document.querySelector('.timer-display');
    
    function updateDisplay() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        if (display) {
            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    updateDisplay();
    
    timerInterval = setInterval(() => {
        timer--;
        updateDisplay();
        
        if (timer < 0) {
            clearInterval(timerInterval);
            const message = isBreak ? 'זמן ההפסקה נגמר!' : 'זמן העבודה נגמר!';
            if (display) {
                display.textContent = message;
            }
            showNotification("טיימר", message, "info");
            playTimerEndSound();
        }
    }, 1000);
}

function toggleTimer() {
    isBreak = !isBreak;
    startTimer(isBreak ? BREAK_TIME : WORK_TIME);
    updateTimerButton();
}

function updateTimerButton() {
    const button = document.querySelector('.timer-toggle');
    if (button) {
        button.textContent = isBreak ? 'התחל הפסקה' : 'התחל עבודה';
    }
}

function playTimerEndSound() {
    const audio = new Audio('assets/sounds/timer-end.mp3');
    audio.play().catch(err => console.log('Sound play failed:', err));
}

// Show notification function
function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <h4>${title}</h4>
        <p>${message}</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Initialize timer controls
document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.querySelector('.timer-display');
    const startButton = document.querySelector('.timer-controls button:first-child');
    const breakButton = document.querySelector('.timer-controls button:last-child');
    
    if (timerDisplay) {
        timerDisplay.textContent = '25:00';
    }
    
    if (startButton) {
        startButton.onclick = () => startTimer(WORK_TIME);
    }
    
    if (breakButton) {
        breakButton.onclick = () => startTimer(BREAK_TIME);
    }
}); 