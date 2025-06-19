// DOM Elements and Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeAllSystems();
    showWelcomeMessage();
    initializeTabSystem();
    initializeMoodTracking();
    initializeTimers();
    initializeSchedule();
    initializeAcademicTasks();
    createButtonTree(buttonTreeData, document.getElementById('buttonTree'));
    initializeImageGallery();
    initializeBusInfo();
    initializeLocation();
    initializeTimer();
});

    // Tab Switching
function initializeTabSystem() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Show first tab by default
    if (tabContents.length > 0) {
        tabContents[0].style.display = 'block';
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tab => tab.style.display = 'none');
            btn.classList.add('active');
            const tabId = `tab-${btn.dataset.tab}`;
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.style.display = 'block';
            }
        });
    });
}

// Location Information
const locationData = {
    address: {
        city: 'ירושלים',
        neighborhood: 'פסגת זאב',
        street: 'מזל גדי',
        building: '2',
        apartment: '3'
    },
    funFacts: [
        'ידעת שפסגת זאב נקראת על שם זאב חקלאי, ממייסדי תנועת חרות? 🏛️',
        'אתה גר בשכונה הכי גדולה בירושלים! 🌟',
        'מהבית שלך אפשר לראות את הרי יהודה 🏔️',
        'השכונה שלך נבנתה בשנת 1982 - ממש צעירה! 🏗️',
        'יש בשכונה שלך יותר מ-50,000 תושבים - כמו עיר קטנה! 🏘️'
    ]
};

// Show Location Function
window.showLocationWithImage = () => {
    const locationInfo = document.querySelector('.location-info');
    const mediaContainer = document.querySelector('.media-container');
    
    if (locationInfo && mediaContainer) {
        const address = locationData.address;
        const randomFact = locationData.funFacts[Math.floor(Math.random() * locationData.funFacts.length)];
        
        locationInfo.innerHTML = `
            <div class="address-card">
                <h3>🏠 הכתובת שלי:</h3>
                <p>עיר: ${address.city}</p>
                <p>שכונה: ${address.neighborhood}</p>
                <p>רחוב: ${address.street}</p>
                <p>בניין: ${address.building}</p>
                <p>דירה: ${address.apartment}</p>
                <div class="fun-fact">
                    <h4>💡 טיפ מעניין:</h4>
                    <p>${randomFact}</p>
                </div>
            </div>
        `;
    }
};

// Timer Functionality
let timerInterval;

window.startTimer = (duration, display) => {
    clearInterval(timerInterval);
    let timer = duration;
    
    function updateDisplay() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateDisplay();
    
    timerInterval = setInterval(() => {
        timer--;
        updateDisplay();
        
        if (timer < 0) {
            clearInterval(timerInterval);
            display.textContent = "הזמן נגמר!";
            showNotification("טיימר", "הזמן נגמר!", "info");
        }
    }, 1000);
};

// Mood Tracking
function initializeMoodTracking() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mood = button.textContent;
            const value = parseInt(button.dataset.value);
            trackMood(mood, value);
        });
    });
}

function trackMood(mood, value) {
    const moodData = JSON.parse(localStorage.getItem('moodData') || '[]');
    moodData.push({ mood, value, date: new Date().toISOString() });
    localStorage.setItem('moodData', JSON.stringify(moodData));
    updateMoodChart();
    showNotification('מצב רוח', `נרשם מצב רוח: ${mood}`, 'success');
}

// Daily Schedule
const scheduleData = {
    default: [
        { time: '09:00', task: 'תחילת יום העבודה' },
        { time: '10:30', task: 'פגישת צוות' },
        { time: '12:00', task: 'הפסקת צהריים' },
        { time: '13:00', task: 'המשך עבודה' },
        { time: '16:00', task: 'סיום יום' }
    ],
    special: [
        { time: '10:00', task: 'פגישה מיוחדת' },
        { time: '11:30', task: 'הרצאה' },
        { time: '13:00', task: 'ארוחת צהריים' },
        { time: '14:30', task: 'סדנה' },
        { time: '16:30', task: 'סיכום יום' }
    ]
};

window.loadSchedule = (type = 'default') => {
    const container = document.querySelector('.tasks-container');
    const schedule = scheduleData[type];
    
    if (container && schedule) {
        container.innerHTML = schedule.map(item => `
            <div class="task">
                <div class="time">${item.time}</div>
                <div class="desc">${item.task}</div>
                <button class="delete-task" onclick="deleteTask('${item.time}', '${item.task}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
};

// Progress Tracking
function updateProgress() {
    const totalTasks = scheduleData.default.length;
    const completedTasks = Math.floor(Math.random() * totalTasks); // For demo purposes
    
    const progressBar = document.getElementById('progress-bar-inner');
    const completedElement = document.getElementById('completed-tasks');
    const totalElement = document.getElementById('total-tasks');
    
    if (progressBar && completedElement && totalElement) {
        const percentage = (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${percentage}%`;
        completedElement.textContent = completedTasks;
        totalElement.textContent = totalTasks;
    }
}

// Academic Tasks
const academicData = {
    courses: [
        {
            name: 'תכנות מתקדם',
            assignments: [
                { title: 'פרויקט סיום', dueDate: '2024-02-01', status: 'pending' },
                { title: 'מטלת ביניים', dueDate: '2024-01-15', status: 'completed' }
            ]
        },
        {
            name: 'מתמטיקה',
            assignments: [
                { title: 'תרגיל 1', dueDate: '2024-01-20', status: 'pending' },
                { title: 'מבחן אמצע', dueDate: '2024-02-10', status: 'pending' }
            ]
        }
    ]
};

function initializeAcademicTasks() {
    const container = document.querySelector('.academic-tasks');
    if (container) {
        container.innerHTML = academicData.courses.map(course => `
            <div class="course-item">
                <h3>${course.name}</h3>
                ${course.assignments.map(assignment => `
                    <div class="assignment-item ${assignment.status}">
                        <h4>${assignment.title}</h4>
                        <p>תאריך הגשה: ${assignment.dueDate}</p>
                        <button onclick="toggleAssignmentStatus('${course.name}', '${assignment.title}')">
                            ${assignment.status === 'completed' ? '✓ הושלם' : 'סמן כהושלם'}
                        </button>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }
}

// Button Tree
    function createButtonTree(data, container, level = 0) {
    if (!container) return;
    
        const ul = document.createElement('ul');
        ul.className = `tree-level-${level}`;
        
        Object.entries(data).forEach(([key, value]) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.className = 'tree-btn';
            button.textContent = key;
            
        if (typeof value === 'object' && !Array.isArray(value)) {
            button.onclick = () => {
                const subTree = li.querySelector('.sub-tree');
                if (subTree) {
                    subTree.remove();
                } else {
                    const newContainer = document.createElement('div');
                    newContainer.className = 'sub-tree';
                    createButtonTree(value, newContainer, level + 1);
                    li.appendChild(newContainer);
                }
            };
        } else if (Array.isArray(value)) {
                button.onclick = () => {
                    const resultDiv = document.createElement('div');
                    resultDiv.className = 'tree-result';
                    resultDiv.textContent = value.join(', ');
                    
                    const existingResult = li.querySelector('.tree-result');
                    if (existingResult) {
                        existingResult.remove();
                    } else {
                        li.appendChild(resultDiv);
                    }
                };
        }
        
        li.appendChild(button);
            ul.appendChild(li);
        });
        
        container.appendChild(ul);
    }

// Notifications
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

    // Initialize all systems
    function initializeAllSystems() {
    loadSchedule();
    updateProgress();
    showLocationWithImage();
        initializeAcademicTasks();
}

// Welcome Message
function showWelcomeMessage() {
    const welcomeElement = document.getElementById('typed-welcome');
    if (welcomeElement) {
        new Typed(welcomeElement, {
            strings: ['ברוך הבא למערכת!', 'מה תרצה לעשות היום?'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }
}

// Jerusalem Images Gallery
const jerusalemImages = [
    'assets/images/jerusalem/1.jpeg',
    'assets/images/jerusalem/2.jpeg',
    'assets/images/jerusalem/3.jpeg',
    'assets/images/jerusalem/4.jpeg',
    'assets/images/jerusalem/5.jpeg'
];

let currentImageIndex = 0;

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % jerusalemImages.length;
    updateGalleryImage();
}

function showRandomImage() {
    const randomIndex = Math.floor(Math.random() * jerusalemImages.length);
    currentImageIndex = randomIndex;
    updateGalleryImage();
}

function updateGalleryImage() {
    const imageElement = document.getElementById('currentImage');
    if (imageElement) {
        imageElement.src = jerusalemImages[currentImageIndex];
        imageElement.alt = `תמונת ירושלים ${currentImageIndex + 1}`;
    }
}

// Image Gallery Functions
function initializeImageGallery() {
    const gallery = document.querySelector('.image-gallery');
    if (!gallery) return;

    const nextButton = gallery.querySelector('.next');
    const prevButton = gallery.querySelector('.prev');
    const randomButton = gallery.querySelector('.random');
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            showNextImage();
            updateImageDisplay();
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            showPreviousImage();
            updateImageDisplay();
        });
    }
    
    if (randomButton) {
        randomButton.addEventListener('click', () => {
            showRandomImage();
            updateImageDisplay();
        });
    }
    
    // Show initial image
    updateImageDisplay();
}

// Bus Information Functions
function initializeBusInfo() {
    const busSection = document.querySelector('.bus-station-section');
    if (!busSection) return;
    
    // Show initial bus info
    updateBusInfo();
    
    // Set up auto-update every 30 seconds
    setInterval(() => {
        updateBusInfo('next');
    }, 30000);
}

// Error Handling
window.addEventListener('error', (event) => {
    console.error('Error occurred:', event.error);
    // You can add more error handling here if needed
});