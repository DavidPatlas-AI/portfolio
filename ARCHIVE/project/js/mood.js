// Mood Tracking System
const moodData = {
    emojis: {
        'מאושר': { icon: '😄', value: 5, color: '#4CAF50' },
        'טוב': { icon: '🙂', value: 4, color: '#8BC34A' },
        'רגיל': { icon: '😐', value: 3, color: '#FFC107' },
        'עצוב': { icon: '😢', value: 2, color: '#FF9800' },
        'מתוסכל': { icon: '😫', value: 1, color: '#F44336' }
    },
    history: [],
    currentMood: null
};

// Initialize mood tracking
function initializeMoodTracking() {
    loadMoodHistory();
    setupMoodButtons();
    updateMoodChart();
    updateCurrentMoodDisplay();
}

function loadMoodHistory() {
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
        moodData.history = JSON.parse(savedHistory);
    }
}

function setupMoodButtons() {
    const container = document.querySelector('.mood-buttons');
    if (!container) return;

    container.innerHTML = Object.entries(moodData.emojis)
        .map(([mood, data]) => `
            <button class="mood-btn" data-mood="${mood}" style="background-color: ${data.color}">
                ${data.icon}
            </button>
        `).join('');

    container.addEventListener('click', (e) => {
        const button = e.target.closest('.mood-btn');
        if (button) {
            const mood = button.dataset.mood;
            trackMood(mood);
        }
    });
}

function trackMood(mood) {
    if (!moodData.emojis[mood]) return;

    const entry = {
        mood: mood,
        value: moodData.emojis[mood].value,
        timestamp: new Date().toISOString()
    };

    moodData.history.push(entry);
    moodData.currentMood = mood;

    localStorage.setItem('moodHistory', JSON.stringify(moodData.history));

    updateMoodChart();
    updateCurrentMoodDisplay();
    showMoodNotification(mood);
}

function updateCurrentMoodDisplay() {
    const display = document.querySelector('.current-mood');
    if (!display || !moodData.currentMood) return;

    const mood = moodData.emojis[moodData.currentMood];
    display.innerHTML = `
        <div class="current-mood-emoji">${mood.icon}</div>
        <div class="current-mood-text">${moodData.currentMood}</div>
    `;
}

function updateMoodChart() {
    const ctx = document.getElementById('moodChart');
    if (!ctx) return;

    const lastWeek = moodData.history
        .slice(-7)
        .map(entry => ({
            mood: entry.mood,
            value: entry.value,
            date: new Date(entry.timestamp).toLocaleDateString('he-IL')
        }));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: lastWeek.map(entry => entry.date),
            datasets: [{
                label: 'מצב רוח',
                data: lastWeek.map(entry => entry.value),
                borderColor: '#00ff99',
                backgroundColor: 'rgba(0, 255, 153, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            const moods = Object.keys(moodData.emojis);
                            return moods[moods.length - value] || '';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const entry = lastWeek[context.dataIndex];
                            return `${entry.mood} ${moodData.emojis[entry.mood].icon}`;
                        }
                    }
                }
            }
        }
    });
}

function showMoodNotification(mood) {
    const moodInfo = moodData.emojis[mood];
    showNotification(
        'מצב רוח',
        `נרשם מצב רוח: ${moodInfo.icon} ${mood}`,
        'success'
    );
}

// Show notification
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMoodTracking); 