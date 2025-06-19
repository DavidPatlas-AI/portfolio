// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tab => tab.style.display = 'none');

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding tab content
            const tabId = `tab-${btn.dataset.tab}`;
            document.getElementById(tabId).style.display = 'block';
        });
    });

    // Results Data
    const resultsData = {
        learning: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js'],
        drink: ['קפה', 'תה', 'מים', 'שוקו', 'מיץ תפוזים'],
        clothing: ['חולצה לבנה', 'מכנסיים שחורים', 'חולצה כחולה', 'ג׳ינס'],
        task: ['לימוד שעה', 'תרגול תכנות', 'קריאת ספר', 'כתיבת קוד'],
        mood: ['שמח', 'נלהב', 'מרוכז', 'רגוע', 'אנרגטי'],
        tired: ['ערני מאוד', 'ערני', 'קצת עייף', 'עייף', 'עייף מאוד'],
        surprise: ['🎁 הפתעה 1', '🎁 הפתעה 2', '🎁 הפתעה 3', '🎁 הפתעה 4'],
        why: ['ללמוד דברים חדשים', 'להתפתח מקצועית', 'להגשים חלומות', 'ליצור דברים מדהימים']
    };

    let currentIndex = {};
    Object.keys(resultsData).forEach(key => currentIndex[key] = 0);

    // Show Result Function
    window.showResult = (category, mode, button) => {
        const resultDiv = button.parentElement.nextElementSibling;
        let result;

        if (mode === 'random') {
            const randomIndex = Math.floor(Math.random() * resultsData[category].length);
            result = resultsData[category][randomIndex];
        } else { // ordered
            result = resultsData[category][currentIndex[category]];
            currentIndex[category] = (currentIndex[category] + 1) % resultsData[category].length;
        }

        resultDiv.textContent = result;
        resultDiv.style.opacity = '0';
        setTimeout(() => {
            resultDiv.style.opacity = '1';
        }, 50);
    };

    // Bus Station
    const busLines = [
        { number: '1', destination: 'תחנה מרכזית', arrival: '10:00' },
        { number: '2', destination: 'רכבת מרכז', arrival: '10:15' },
        { number: '3', destination: 'אוניברסיטה', arrival: '10:30' }
    ];

    let currentBusIndex = 0;

    window.updateBusInfo = (mode) => {
        if (mode === 'random') {
            currentBusIndex = Math.floor(Math.random() * busLines.length);
        } else {
            currentBusIndex = (currentBusIndex + 1) % busLines.length;
        }

        const bus = busLines[currentBusIndex];
        document.getElementById('busNumber').textContent = bus.number;
        document.getElementById('busDestination').textContent = bus.destination;
        document.getElementById('busArrival').textContent = bus.arrival;
    };

    // SOD Functionality
    window.triggerSOD = () => {
        const button = document.querySelector('.explosive');
        button.classList.add('exploded');
        setTimeout(() => {
            button.classList.remove('exploded');
        }, 500);
    };

    // Time Travel
    const timeEvents = [
        { time: '09:00', event: 'תחילת יום' },
        { time: '12:00', event: 'הפסקת צהריים' },
        { time: '15:00', event: 'פגישה חשובה' },
        { time: '18:00', event: 'סיום יום' }
    ];

    let currentTimeIndex = 0;

    window.timeTravel = (mode) => {
        if (mode === 'random') {
            currentTimeIndex = Math.floor(Math.random() * timeEvents.length);
        } else {
            currentTimeIndex = (currentTimeIndex + 1) % timeEvents.length;
        }

        const timeEvent = timeEvents[currentTimeIndex];
        const timeDisplay = document.querySelector('.time-display');
        timeDisplay.textContent = `${timeEvent.time} - ${timeEvent.event}`;
    };

    // Settings
    window.updateGlowColor = (color) => {
        const root = document.documentElement;
        const colors = {
            green: '#00ff99',
            blue: '#00ffff',
            purple: '#ff00ff'
        };
        root.style.setProperty('--glow-color', colors[color]);
    };

    // Button Tree Data Structure
    const buttonTreeData = {
        'ראשי': {
            'לימודים': {
                'שיעורים': ['מתמטיקה', 'אנגלית', 'פיזיקה'],
                'מטלות': ['שיעורי בית', 'פרויקט', 'מבחן']
            },
            'פעילויות': {
                'ספורט': ['כדורגל', 'שחייה', 'ריצה'],
                'תחביבים': ['קריאה', 'ציור', 'מוזיקה']
            },
            'מערכת': {
                'הגדרות': ['שפה', 'תצוגה', 'צלילים'],
                'עדכונים': ['בדיקה', 'התקנה', 'היסטוריה']
            }
        }
    };

    // Create Button Tree
    function createButtonTree(data, container, level = 0) {
        const ul = document.createElement('ul');
        ul.className = `tree-level-${level}`;
        
        Object.entries(data).forEach(([key, value]) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.className = 'tree-btn';
            button.textContent = key;
            
            if (Array.isArray(value)) {
                button.onclick = () => {
                    const resultDiv = document.createElement('div');
                    resultDiv.className = 'tree-result';
                    resultDiv.textContent = value.join(', ');
                    
                    // Remove any existing results
                    const existingResult = li.querySelector('.tree-result');
                    if (existingResult) {
                        existingResult.remove();
                    } else {
                        li.appendChild(resultDiv);
                    }
                };
            } else {
                const subContainer = document.createElement('div');
                subContainer.className = 'sub-tree';
                subContainer.style.display = 'none';
                createButtonTree(value, subContainer, level + 1);
                
                button.onclick = () => {
                    const isVisible = subContainer.style.display === 'block';
                    subContainer.style.display = isVisible ? 'none' : 'block';
                    button.classList.toggle('active');
                };
                
                li.appendChild(subContainer);
            }
            
            li.insertBefore(button, li.firstChild);
            ul.appendChild(li);
        });
        
        container.appendChild(ul);
    }

    // Initialize Button Tree
    const buttonTreeContainer = document.getElementById('buttonTree');
    if (buttonTreeContainer) {
        createButtonTree(buttonTreeData, buttonTreeContainer);
    }

    // Add Chart.js initialization for emotion chart
    const emotionChart = document.getElementById('emotionChart');
    if (emotionChart) {
        new Chart(emotionChart, {
            type: 'pie',
            data: {
                labels: ['שמח', 'רגוע', 'מתוח', 'עייף', 'נלהב'],
                datasets: [{
                    data: [30, 20, 15, 25, 10],
                    backgroundColor: [
                        '#4CAF50',
                        '#2196F3',
                        '#FFC107',
                        '#9C27B0',
                        '#F44336'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#e0ffe0'
                        }
                    }
                }
            }
        });
    }

    // PDF Export functionality
    window.exportPDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFont("Arial", "normal");
        doc.setFontSize(20);
        doc.text("דוח יומי", 105, 20, null, null, "center");
        
        // Add content to PDF
        doc.setFontSize(14);
        doc.text("סיכום פעילויות:", 170, 40);
        
        // Get current data
        const activities = Object.values(resultsData).map((arr, i) => 
            `${Object.keys(resultsData)[i]}: ${arr[currentIndex[Object.keys(resultsData)[i]]]}`
        );
        
        activities.forEach((activity, i) => {
            doc.text(activity, 160, 55 + (i * 10));
        });
        
        doc.save("daily-report.pdf");
    };

    // User Image Preview
    window.setUserImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('user-image-preview');
                preview.innerHTML = `<img src="${e.target.result}" alt="User Image" style="max-width: 200px; border-radius: 10px;">`;
            };
            reader.readAsDataURL(file);
        }
    };

    // Sound Effects
    const sounds = {
        click: new Audio('assets/sounds/click.mp3'),
        success: new Audio('assets/sounds/success.mp3'),
        notification: new Audio('assets/sounds/notification.mp3')
    };

    // Achievement System
    const achievements = {
        dailyLogin: { name: 'התחברות יומית', description: 'התחברת 5 ימים ברצף', icon: '🌟', achieved: false },
        taskMaster: { name: 'מאסטר המשימות', description: 'השלמת 10 משימות', icon: '📝', achieved: false },
        earlyBird: { name: 'ציפור מקדימה', description: 'התחברת לפני 8 בבוקר', icon: '🐦', achieved: false },
        nightOwl: { name: 'ינשוף לילה', description: 'פעיל אחרי חצות', icon: '🦉', achieved: false }
    };

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Weather System
    async function updateWeather() {
        try {
            const weatherDiv = document.getElementById('weather-display');
            if (!weatherDiv) return;

            const cities = [
                { name: 'ירושלים', temp: Math.floor(Math.random() * 15) + 15, condition: getRandomCondition() },
                { name: 'באר שבע', temp: Math.floor(Math.random() * 15) + 20, condition: getRandomCondition() }
            ];

            weatherDiv.innerHTML = cities.map(city => `
                <div class="weather-card">
                    <div class="city-name">${city.name}</div>
                    <div class="temp">${city.temp}°C</div>
                    <div class="condition">${city.condition}</div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error updating weather:', error);
        }
    }

    function getRandomCondition() {
        const conditions = ['שמשי ☀️', 'מעונן ☁️', 'גשום 🌧️', 'בהיר 🌤️'];
        return conditions[Math.floor(Math.random() * conditions.length)];
    }

    // Schedule System
    const defaultSchedule = [
        { time: "04:50", desc: "קימה, שטיפת פנים, תפילה קצרה" },
        { time: "05:15", desc: "הכנת תיק לימודים" },
        { time: "05:30", desc: "יציאה לתחנת אוטובוס" },
        { time: "06:00", desc: "הגעה לבסיס" },
        { time: "06:15", desc: "מסדר בוקר" },
        { time: "07:00", desc: "ארוחת בוקר" },
        { time: "08:00", desc: "תחילת לימודים" }
    ];

    const specialSchedule = [
        { time: "06:00", desc: "קימה מאוחרת" },
        { time: "06:30", desc: "התארגנות" },
        { time: "07:00", desc: "יציאה לבסיס" },
        { time: "08:00", desc: "פעילות מיוחדת" }
    ];

    let activeReminders = new Set();
    let remindersEnabled = false;

    function loadSchedule(type = 'default') {
        const schedule = type === 'default' ? defaultSchedule : specialSchedule;
        const container = document.querySelector('.tasks-container');
        container.innerHTML = '';

        schedule.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <span class="time">${task.time}</span>
                <span class="desc">${task.desc}</span>
                <button class="glass-btn" onclick="setReminder('${task.time}', '${task.desc}')">
                    <i class="fa-solid fa-bell"></i>
                </button>
            `;
            container.appendChild(taskElement);
        });
    }

    function calculateTimeUntil(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const now = new Date();
        const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
        if (target < now) {
            target.setDate(target.getDate() + 1);
        }
        
        return target.getTime() - now.getTime();
    }

    function setReminder(time, message) {
        if (!remindersEnabled) {
            showNotification('נא להפעיל תזכורות קודם', 'warning');
            return;
        }

        const reminderId = `${time}-${message}`;
        if (activeReminders.has(reminderId)) {
            showNotification('תזכורת זו כבר קיימת', 'info');
            return;
        }

        const timeUntil = calculateTimeUntil(time);
        const reminderTimeout = setTimeout(() => {
            showNotification('תזכורת', message, 'reminder');
            if (document.getElementById('systemSounds').checked) {
                sounds.notification.play();
            }
            activeReminders.delete(reminderId);
            updateActiveReminders();
        }, timeUntil);

        activeReminders.add(reminderId);
        updateActiveReminders();
        
        showNotification('התזכורת נוספה בהצלחה', 'success');
    }

    function updateActiveReminders() {
        const container = document.getElementById('active-reminders');
        container.innerHTML = '';

        activeReminders.forEach(reminderId => {
            const [time, ...messageParts] = reminderId.split('-');
            const message = messageParts.join('-');
            
            const reminderElement = document.createElement('div');
            reminderElement.className = 'reminder-item';
            reminderElement.innerHTML = `
                <span class="time">${time}</span>
                <span class="message">${message}</span>
                <button class="cancel-btn" onclick="cancelReminder('${reminderId}')">
                    <i class="fa-solid fa-times"></i>
                </button>
            `;
            container.appendChild(reminderElement);
        });
    }

    function cancelReminder(reminderId) {
        activeReminders.delete(reminderId);
        updateActiveReminders();
        showNotification('התזכורת בוטלה', 'info');
    }

    function toggleReminders() {
        remindersEnabled = !remindersEnabled;
        showNotification(
            remindersEnabled ? 'התראות הופעלו' : 'התראות כבויות',
            'info'
        );
    }

    function exportSchedule() {
        try {
            const schedule = document.querySelector('.tasks-container').innerHTML;
            const blob = new Blob([schedule], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'schedule.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showNotification('הלו"ז יוצא בהצלחה', 'success');
        } catch (error) {
            showNotification('שגיאה בייצוא הלו"ז', 'error');
        }
    }

    // Initialize schedule on page load
    document.addEventListener('DOMContentLoaded', () => {
        loadSchedule('default');
    });

    // Progress System
    let userProgress = {
        totalTasks: 0,
        completedTasks: 0,
        streak: 0,
        lastLogin: null
    };

    function updateProgress() {
        const progressBar = document.getElementById('progress-bar-inner');
        if (!progressBar) return;

        const progress = (userProgress.completedTasks / Math.max(userProgress.totalTasks, 1)) * 100;
        progressBar.style.width = `${progress}%`;

        // Check for achievements
        if (userProgress.completedTasks >= 10 && !achievements.taskMaster.achieved) {
            achievements.taskMaster.achieved = true;
            showNotification('הישג חדש!', 'השגת: מאסטר המשימות 🎉', 'achievement');
        }
    }

    // Mood Tracking System
    const moodData = {
        labels: [],
        data: []
    };

    function trackMood(mood) {
        const moods = {
            'מאושר': 5,
            'טוב': 4,
            'רגיל': 3,
            'עצוב': 2,
            'מתוסכל': 1
        };

        const value = moods[mood] || 3;
        updateMoodChart(mood, value);
        showNotification(`מצב הרוח נשמר: ${mood}`, 'success');
    }

    function updateMoodChart(mood, value) {
        const ctx = document.getElementById('emotionChart');
        if (!ctx) return;

        if (!window.moodChart) {
            window.moodChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'מצב רוח',
                        data: [],
                        borderColor: '#00ff99',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 5
                        }
                    }
                }
            });
        }

        const chart = window.moodChart;
        const now = new Date().toLocaleTimeString();
        
        chart.data.labels.push(now);
        chart.data.datasets[0].data.push(value);
        
        if (chart.data.labels.length > 10) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        
        chart.update();
    }

    // Timer System
    let timerInterval;
    
    function startTimer(duration) {
        const display = document.querySelector('.timer-display');
        if (!display) return;

        let timer = duration;
        const interval = setInterval(() => {
            const minutes = parseInt(timer / 60, 10);
            const seconds = parseInt(timer % 60, 10);

            display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (--timer < 0) {
                clearInterval(interval);
                showNotification('הטיימר הסתיים!', 'success');
            }
        }, 1000);
    }

    // Initialize all systems
    function initializeSystems() {
        // אתחול תמונות
        const imgElement = document.getElementById('currentImage');
        if (imgElement) {
            imgElement.onerror = function() {
                this.src = 'assets/images/default.jpg';
                console.error('Failed to load image');
            };
            imgElement.src = jerusalemImages[0];
        }
        
        updateWeather();
        setInterval(updateWeather, 300000); // Update every 5 minutes
        
        updateSchedule('ראשון');
        updateProgress();
        
        // Initialize mood tracking
        trackMood('התחלה', 5);
        
        // Check for achievements
        const hour = new Date().getHours();
        if (hour < 8) {
            achievements.earlyBird.achieved = true;
            showNotification('הישג חדש!', 'השגת: ציפור מקדימה 🐦', 'achievement');
        }
    }

    // Initialize all modules when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize existing modules
        initializeSystems();
        initializeQuickActions();
        
        // Show welcome message first
        showWelcomeMessage();
        
        // Initialize Academic Tasks Module
        initializeAcademicTasks();
        
        // Initialize Schedule Module
        initializeSchedule();
        
        // Initialize Button Tree
        initializeButtonTree();
        
        // Add missing event listeners
        addMissingEventListeners();
    });

    function initializeAcademicTasks() {
        fetch('js/assignments.json')
            .then(response => response.json())
            .then(data => {
                window.academicData = data;
                updateAcademicTasks();
            })
            .catch(error => {
                console.error('Error loading academic tasks:', error);
                showNotification('שגיאה', 'לא ניתן לטעון משימות לימודיות', 'error');
            });
    }

    function updateAcademicTasks() {
        const academicTab = document.getElementById('tab-academic');
        if (!academicTab || !window.academicData) return;

        const tasksContainer = academicTab.querySelector('.academic-tasks') || 
                              document.createElement('div');
        tasksContainer.className = 'academic-tasks';
        tasksContainer.innerHTML = '';

        // Add courses
        window.academicData.courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course-item';
            courseElement.innerHTML = `
                <h3>${course.name}</h3>
                <div class="assignments">
                    ${course.assignments.map(assignment => `
                        <div class="assignment-item ${assignment.status}">
                            <h4>${assignment.title}</h4>
                            <p>תאריך הגשה: ${assignment.dueDate}</p>
                            <p>תיאור: ${assignment.description}</p>
                            <p>עדיפות: ${assignment.priority}</p>
                            <button onclick="toggleAssignmentStatus('${course.name}', '${assignment.title}')">
                                ${assignment.status === 'completed' ? 'סמן כלא הושלם' : 'סמן כהושלם'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
            tasksContainer.appendChild(courseElement);
        });

        // Add general tasks
        const generalTasks = document.createElement('div');
        generalTasks.className = 'general-tasks';
        generalTasks.innerHTML = `
            <h3>משימות כלליות</h3>
            ${window.academicData.general_tasks.map(task => `
                <div class="task-item ${task.status}">
                    <h4>${task.title}</h4>
                    <p>תאריך יעד: ${task.dueDate}</p>
                    <p>תיאור: ${task.description}</p>
                    <p>עדיפות: ${task.priority}</p>
                    <button onclick="toggleTaskStatus('${task.title}')">
                        ${task.status === 'completed' ? 'סמן כלא הושלם' : 'סמן כהושלם'}
                    </button>
                </div>
            `).join('')}
        `;
        tasksContainer.appendChild(generalTasks);

        academicTab.appendChild(tasksContainer);
    }

    function toggleAssignmentStatus(courseName, assignmentTitle) {
        const course = window.academicData.courses.find(c => c.name === courseName);
        if (course) {
            const assignment = course.assignments.find(a => a.title === assignmentTitle);
            if (assignment) {
                assignment.status = assignment.status === 'completed' ? 'pending' : 'completed';
                updateAcademicTasks();
                saveAcademicData();
            }
        }
    }

    function toggleTaskStatus(taskTitle) {
        const task = window.academicData.general_tasks.find(t => t.title === taskTitle);
        if (task) {
            task.status = task.status === 'completed' ? 'not_started' : 'completed';
            updateAcademicTasks();
            saveAcademicData();
        }
    }

    function saveAcademicData() {
        localStorage.setItem('academicData', JSON.stringify(window.academicData));
        showNotification('נשמר', 'המידע האקדמי נשמר בהצלחה', 'success');
    }

    function initializeSchedule() {
        const scheduleTab = document.getElementById('tab-schedule');
        if (!scheduleTab) return;

        // Load saved schedule
        const savedSchedule = localStorage.getItem('dailySchedule');
        if (savedSchedule) {
            try {
                const schedule = JSON.parse(savedSchedule);
                displaySchedule(schedule);
            } catch (error) {
                console.error('Error loading schedule:', error);
            }
        }

        // Add new task button
        const addTaskBtn = document.createElement('button');
        addTaskBtn.className = 'add-task-btn';
        addTaskBtn.innerHTML = '<i class="fa-solid fa-plus"></i> הוסף משימה';
        addTaskBtn.onclick = showAddTaskDialog;
        scheduleTab.appendChild(addTaskBtn);
    }

    function showAddTaskDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'dialog';
        dialog.innerHTML = `
            <h3>הוסף משימה חדשה</h3>
            <input type="time" id="taskTime" required>
            <input type="text" id="taskDescription" placeholder="תיאור המשימה" required>
            <button onclick="addNewTask()">הוסף</button>
            <button onclick="this.parentElement.remove()">ביטול</button>
        `;
        document.body.appendChild(dialog);
    }

    function addNewTask() {
        const time = document.getElementById('taskTime').value;
        const description = document.getElementById('taskDescription').value;
        
        if (!time || !description) {
            showNotification('שגיאה', 'נא למלא את כל השדות', 'error');
            return;
        }

        const schedule = JSON.parse(localStorage.getItem('dailySchedule') || '[]');
        schedule.push({ time, description });
        schedule.sort((a, b) => a.time.localeCompare(b.time));
        
        localStorage.setItem('dailySchedule', JSON.stringify(schedule));
        displaySchedule(schedule);
        
        document.querySelector('.dialog').remove();
        showNotification('נוסף', 'המשימה נוספה בהצלחה', 'success');
    }

    function displaySchedule(schedule) {
        const scheduleContainer = document.querySelector('.schedule-container') || 
                                document.createElement('div');
        scheduleContainer.className = 'schedule-container';
        scheduleContainer.innerHTML = '';

        schedule.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'schedule-task';
            taskElement.innerHTML = `
                <span class="task-time">${task.time}</span>
                <span class="task-description">${task.description}</span>
                <button onclick="deleteTask('${task.time}', '${task.description}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            scheduleContainer.appendChild(taskElement);
        });

        const scheduleTab = document.getElementById('tab-schedule');
        if (!scheduleTab.contains(scheduleContainer)) {
            scheduleTab.appendChild(scheduleContainer);
        }
    }

    function deleteTask(time, description) {
        const schedule = JSON.parse(localStorage.getItem('dailySchedule') || '[]');
        const updatedSchedule = schedule.filter(task => 
            task.time !== time || task.description !== description
        );
        localStorage.setItem('dailySchedule', JSON.stringify(updatedSchedule));
        displaySchedule(updatedSchedule);
        showNotification('נמחק', 'המשימה נמחקה בהצלחה', 'success');
    }

    function addMissingEventListeners() {
        // Add event listeners for all interactive elements
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (!btn.onclick) {
                btn.addEventListener('click', () => switchTab(btn.dataset.tab));
            }
        });

        // Add event listeners for settings buttons
        document.querySelectorAll('.settings-btn').forEach(btn => {
            if (!btn.onclick) {
                btn.addEventListener('click', () => updateSetting(btn.dataset.setting));
            }
        });

        // Add event listeners for notification controls
        const notificationToggle = document.getElementById('notification-toggle');
        if (notificationToggle && !notificationToggle.onclick) {
            notificationToggle.addEventListener('click', toggleNotifications);
        }
    }

    function switchTab(tabId) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
        });

        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const selectedTab = document.getElementById(`tab-${tabId}`);
        if (selectedTab) {
            selectedTab.style.display = 'block';
        }

        // Add active class to clicked button
        const selectedBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
    }

    function updateSetting(setting) {
        switch (setting) {
            case 'theme':
                document.body.classList.toggle('dark-theme');
                localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
                break;
            case 'notifications':
                const notificationsEnabled = localStorage.getItem('notifications') !== 'disabled';
                localStorage.setItem('notifications', notificationsEnabled ? 'disabled' : 'enabled');
                showNotification(
                    'הגדרות',
                    `התראות ${notificationsEnabled ? 'כבויות' : 'פעילות'}`,
                    'info'
                );
                break;
            case 'sound':
                const soundEnabled = localStorage.getItem('sound') !== 'disabled';
                localStorage.setItem('sound', soundEnabled ? 'disabled' : 'enabled');
                showNotification(
                    'הגדרות',
                    `צלילים ${soundEnabled ? 'כבויים' : 'פעילים'}`,
                    'info'
                );
                break;
        }
    }

    function toggleNotifications() {
        const enabled = localStorage.getItem('notifications') !== 'disabled';
        localStorage.setItem('notifications', enabled ? 'disabled' : 'enabled');
        showNotification(
            'התראות',
            `התראות ${enabled ? 'כבויות' : 'פעילות'}`,
            'info'
        );
        return !enabled;
    }

    // Welcome System
    function showWelcomeMessage() {
        const typedElement = document.getElementById('typed-welcome');
        if (!typedElement) {
            console.error('Welcome element not found');
            return;
        }

        const now = new Date();
        const hour = now.getHours();
        const currentLang = localStorage.getItem('selectedLanguage') || 'he';
        
        let timeGreeting;
        if (currentLang === 'he') {
            if (hour >= 5 && hour < 12) {
                timeGreeting = 'בוקר טוב';
            } else if (hour >= 12 && hour < 17) {
                timeGreeting = 'צהריים טובים';
            } else if (hour >= 17 && hour < 21) {
                timeGreeting = 'ערב טוב';
            } else {
                timeGreeting = 'לילה טוב';
            }
        } else {
            if (hour >= 5 && hour < 12) {
                timeGreeting = 'Good Morning';
            } else if (hour >= 12 && hour < 17) {
                timeGreeting = 'Good Afternoon';
            } else if (hour >= 17 && hour < 21) {
                timeGreeting = 'Good Evening';
            } else {
                timeGreeting = 'Good Night';
            }
        }

        const welcomeMessages = currentLang === 'he' ? [
            'ברוכים הבאים למערכת',
            'מה תרצו לעשות היום?',
            'איך אפשר לעזור?',
            'בואו נתחיל!'
        ] : [
            'Welcome to the System',
            'What would you like to do today?',
            'How can I help?',
            'Let\'s get started!'
        ];

        try {
            new Typed(typedElement, {
                strings: [`${timeGreeting}!^1000`, ...welcomeMessages],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1500,
                startDelay: 500,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        } catch (error) {
            console.error('Error initializing Typed.js:', error);
            typedElement.textContent = `${timeGreeting}! ${welcomeMessages[0]}`;
        }
    }

    // Quick Actions System
    const quickActions = [
        { icon: 'fa-solid fa-calendar-check', text: 'בדיקת משימות היום', action: 'showDailyTasks' },
        { icon: 'fa-solid fa-clock', text: 'הגדרת תזכורת', action: 'setReminder' },
        { icon: 'fa-solid fa-bell', text: 'התראות', action: 'showNotifications' },
        { icon: 'fa-solid fa-star', text: 'משימות מועדפות', action: 'showFavorites' }
    ];

    function initializeQuickActions() {
        const container = document.getElementById('quick-actions');
        if (container) {
            const html = quickActions.map(action => `
                <button class="quick-action-btn" onclick="handleQuickAction('${action.action}')">
                    <i class="${action.icon}"></i>
                    <span>${action.text}</span>
                </button>
            `).join('');
            container.innerHTML = html;
        }
    }

    window.handleQuickAction = (actionName) => {
        switch(actionName) {
            case 'showDailyTasks':
                showDailyTasks();
                break;
            case 'setReminder':
                showReminderDialog();
                break;
            case 'showNotifications':
                toggleNotificationsPanel();
                break;
            case 'showFavorites':
                showFavorites();
                break;
        }
    };

    // Daily Tasks System
    function showDailyTasks() {
        const tasks = [
            { id: 1, text: 'בדיקת מערכת', time: '09:00', status: 'pending' },
            { id: 2, text: 'עדכון נתונים', time: '10:30', status: 'completed' },
            { id: 3, text: 'פגישת צוות', time: '12:00', status: 'pending' }
        ];

        const dialog = document.createElement('div');
        dialog.className = 'modal-dialog';
        dialog.innerHTML = `
            <div class="modal-content">
                <h3>משימות היום</h3>
                <div class="tasks-list">
                    ${tasks.map(task => `
                        <div class="task-item ${task.status}">
                            <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''}>
                            <span class="task-text">${task.text}</span>
                            <span class="task-time">${task.time}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="glass-btn" onclick="this.parentElement.parentElement.remove()">סגור</button>
            </div>
        `;
        document.body.appendChild(dialog);
    }

    // Reminder System
    function showReminderDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'modal-dialog';
        dialog.innerHTML = `
            <div class="modal-content">
                <h3>הגדרת תזכורת</h3>
                <div class="reminder-form">
                    <input type="text" placeholder="כותרת התזכורת" class="reminder-input">
                    <input type="time" class="reminder-time">
                    <select class="reminder-type">
                        <option value="once">חד פעמי</option>
                        <option value="daily">יומי</option>
                        <option value="weekly">שבועי</option>
                    </select>
                    <button class="glass-btn" onclick="setReminder(this.parentElement)">שמור</button>
                </div>
                <button class="glass-btn" onclick="this.parentElement.parentElement.remove()">סגור</button>
            </div>
        `;
        document.body.appendChild(dialog);
    }

    // Notifications Panel
    let notificationsVisible = false;
    function toggleNotificationsPanel() {
        const existingPanel = document.querySelector('.notifications-panel');
        if (existingPanel) {
            existingPanel.remove();
            notificationsVisible = false;
            return;
        }

        const notifications = [
            { type: 'info', text: 'ברוכים הבאים למערכת', time: '09:00' },
            { type: 'warning', text: 'נדרש עדכון מערכת', time: '10:30' },
            { type: 'success', text: 'המשימה הושלמה בהצלחה', time: '11:45' }
        ];

        const panel = document.createElement('div');
        panel.className = 'notifications-panel';
        panel.innerHTML = `
            <h3>התראות</h3>
            <div class="notifications-list">
                ${notifications.map(notif => `
                    <div class="notification-item ${notif.type}">
                        <i class="fa-solid ${getNotificationIcon(notif.type)}"></i>
                        <div class="notification-content">
                            <div class="notification-text">${notif.text}</div>
                            <div class="notification-time">${notif.time}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.body.appendChild(panel);
        notificationsVisible = true;
    }

    function getNotificationIcon(type) {
        switch(type) {
            case 'info': return 'fa-info-circle';
            case 'warning': return 'fa-exclamation-triangle';
            case 'success': return 'fa-check-circle';
            default: return 'fa-bell';
        }
    }

    // Favorites System
    function showFavorites() {
        const favorites = [
            { type: 'task', text: 'משימה מועדפת 1', icon: 'fa-star' },
            { type: 'reminder', text: 'תזכורת חשובה', icon: 'fa-bell' },
            { type: 'note', text: 'הערה מועדפת', icon: 'fa-sticky-note' }
        ];

        const dialog = document.createElement('div');
        dialog.className = 'modal-dialog';
        dialog.innerHTML = `
            <div class="modal-content">
                <h3>מועדפים</h3>
                <div class="favorites-list">
                    ${favorites.map(fav => `
                        <div class="favorite-item">
                            <i class="fa-solid ${fav.icon}"></i>
                            <span>${fav.text}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="glass-btn" onclick="this.parentElement.parentElement.remove()">סגור</button>
            </div>
        `;
        document.body.appendChild(dialog);
    }

    // Jerusalem Images Functions
    const jerusalemImages = [
        'assets/images/jerusalem/1.jpeg',
        'assets/images/jerusalem/2.jpeg',
        'assets/images/jerusalem/3.jpeg',
        'assets/images/jerusalem/4.jpeg',
        'assets/images/jerusalem/5.jpeg'
    ];

    let currentImageIndex = 0;

    function showRandomJerusalemImage() {
        const imgElement = document.getElementById('currentImage');
        if (!imgElement) return;
        
        const randomIndex = Math.floor(Math.random() * jerusalemImages.length);
        imgElement.classList.add('loading');
        
        const newImage = new Image();
        newImage.onload = function() {
            imgElement.src = this.src;
            imgElement.classList.remove('loading');
        };
        newImage.onerror = function() {
            handleImageError(imgElement);
            imgElement.classList.remove('loading');
        };
        newImage.src = jerusalemImages[randomIndex];
    }

    function showNextJerusalemImage() {
        const imgElement = document.getElementById('currentImage');
        if (!imgElement) return;
        
        currentImageIndex = (currentImageIndex + 1) % jerusalemImages.length;
        imgElement.classList.add('loading');
        
        const newImage = new Image();
        newImage.onload = function() {
            imgElement.src = this.src;
            imgElement.classList.remove('loading');
        };
        newImage.onerror = function() {
            handleImageError(imgElement);
            imgElement.classList.remove('loading');
        };
        newImage.src = jerusalemImages[currentImageIndex];
    }

    function handleImageError(imgElement) {
        imgElement.src = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
                <rect width="100%" height="100%" fill="#333"/>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial">
                    התמונה לא נמצאה
                </text>
            </svg>
        `);
    }

    function preloadJerusalemImages() {
        jerusalemImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        preloadJerusalemImages();
        initializeSystems();
        initializeButtons();
        initializeButtonTree();
        showWelcomeMessage();
        
        // הצגת הטאב הראשון כברירת מחדל
        const firstTab = document.querySelector('.tab-btn');
        if (firstTab) {
            firstTab.click();
        }
    });

    function showFullDay() {
        const dailySummary = document.querySelector('.daily-summary');
        if (!dailySummary) return;

        const summary = {
            schedule: getDailySchedule(),
            tasks: getDailyTasks(),
            mood: getCurrentMood(),
            weather: getCurrentWeather()
        };

        let summaryHTML = `
            <div class="summary-container">
                <h3><i class="fa-solid fa-calendar-day"></i> סיכום היום</h3>
                <div class="summary-section">
                    <h4>לו"ז</h4>
                    <ul>
                        ${summary.schedule.map(item => 
                            `<li>${item.time} - ${item.activity}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="summary-section">
                    <h4>משימות</h4>
                    <ul>
                        ${summary.tasks.map(task => 
                            `<li class="${task.completed ? 'completed' : ''}">${task.title}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="summary-section">
                    <h4>מצב רוח</h4>
                    <p>${summary.mood}</p>
                </div>
                <div class="summary-section">
                    <h4>מזג אוויר</h4>
                    <p>${summary.weather}</p>
                </div>
            </div>
        `;

        dailySummary.innerHTML = summaryHTML;
    }

    function getDailySchedule() {
        return [
            { time: '08:00', activity: 'תחילת יום' },
            { time: '09:00', activity: 'פגישה ראשונה' },
            { time: '12:00', activity: 'ארוחת צהריים' },
            { time: '15:00', activity: 'משימות' },
            { time: '17:00', activity: 'סיום יום' }
        ];
    }

    function getDailyTasks() {
        return [
            { title: 'משימה 1', completed: true },
            { title: 'משימה 2', completed: false },
            { title: 'משימה 3', completed: true }
        ];
    }

    function getCurrentMood() {
        return 'חיובי 😊';
    }

    function getCurrentWeather() {
        return 'שמש ☀️';
    }

    function initializeButtonTree() {
        const treeContainer = document.getElementById('buttonTree');
        if (!treeContainer) return;

        const treeData = {
            'ראשי': {
                'לימודים': {
                    'שיעורים': ['מתמטיקה', 'אנגלית', 'פיזיקה'],
                    'מטלות': ['שיעורי בית', 'פרויקט', 'מבחן']
                },
                'פעילויות': {
                    'ספורט': ['כדורגל', 'שחייה', 'ריצה'],
                    'תחביבים': ['קריאה', 'ציור', 'מוזיקה']
                }
            }
        };

        function createTreeElement(data) {
            const ul = document.createElement('ul');
            ul.className = 'tree-list';

            Object.entries(data).forEach(([key, value]) => {
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.className = 'tree-button';
                button.textContent = key;

                if (typeof value === 'object' && !Array.isArray(value)) {
                    const subTree = createTreeElement(value);
                    button.addEventListener('click', () => {
                        subTree.style.display = 
                            subTree.style.display === 'none' ? 'block' : 'none';
                    });
                    li.appendChild(button);
                    li.appendChild(subTree);
                } else if (Array.isArray(value)) {
                    button.addEventListener('click', () => {
                        const existingList = li.querySelector('.leaf-list');
                        if (existingList) {
                            existingList.remove();
                        } else {
                            const leafList = document.createElement('ul');
                            leafList.className = 'leaf-list';
                            value.forEach(item => {
                                const leafLi = document.createElement('li');
                                leafLi.textContent = item;
                                leafList.appendChild(leafLi);
                            });
                            li.appendChild(leafList);
                        }
                    });
                    li.appendChild(button);
                }

                ul.appendChild(li);
            });

            return ul;
        }

        treeContainer.appendChild(createTreeElement(treeData));
    }

    function initializeButtons() {
        // טיפול בכפתורי תוכן
        document.querySelectorAll('[onclick*="showContent"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const category = button.getAttribute('data-category');
                const mode = button.getAttribute('data-mode');
                showContent(category, mode, button);
            });
        });

        // טיפול בכפתורי ניווט
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                switchTab(tabId);
            });
        });
    }

    function showContent(category, mode, button) {
        const resultContainer = button.closest('.feature-block')
            .querySelector('.feature-result');
        
        if (!resultContainer) return;

        const content = getContentByCategory(category, mode);
        
        resultContainer.style.opacity = '0';
        setTimeout(() => {
            resultContainer.textContent = content;
            resultContainer.style.opacity = '1';
        }, 300);
    }

    function getContentByCategory(category, mode) {
        const contentMap = {
            'learning': ['JavaScript', 'Python', 'HTML', 'CSS'],
            'drink': ['קפה', 'תה', 'מים', 'מיץ'],
            'clothing': ['חולצה', 'מכנסיים', 'נעליים'],
            'task': ['קריאה', 'כתיבה', 'תכנות'],
            'mood': ['שמח', 'נלהב', 'רגוע', 'מרוכז']
        };

        const content = contentMap[category] || [];
        
        if (mode === 'random') {
            const randomIndex = Math.floor(Math.random() * content.length);
            return content[randomIndex];
        } else {
            // מחזיר את הפריט הבא ברשימה
            const currentIndex = window[`${category}Index`] || 0;
            window[`${category}Index`] = (currentIndex + 1) % content.length;
            return content[currentIndex];
        }
    }
}); 