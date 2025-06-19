// Schedule Data
const scheduleData = {
    default: [
        { time: '09:00', task: 'תחילת יום העבודה', completed: false, category: 'עבודה' },
        { time: '10:30', task: 'פגישת צוות', completed: false, category: 'פגישות' },
        { time: '12:00', task: 'הפסקת צהריים', completed: false, category: 'הפסקות' },
        { time: '13:00', task: 'המשך עבודה', completed: false, category: 'עבודה' },
        { time: '16:00', task: 'סיום יום', completed: false, category: 'עבודה' }
    ],
    special: [
        { time: '10:00', task: 'פגישה מיוחדת', completed: false, category: 'פגישות' },
        { time: '11:30', task: 'הרצאה', completed: false, category: 'לימודים' },
        { time: '13:00', task: 'ארוחת צהריים', completed: false, category: 'הפסקות' },
        { time: '14:30', task: 'סדנה', completed: false, category: 'לימודים' },
        { time: '16:30', task: 'סיכום יום', completed: false, category: 'עבודה' }
    ]
};

// Academic Tasks Data
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

// Load Schedule
function loadSchedule(type = 'default') {
    const container = document.querySelector('.tasks-container');
    if (!container) return;
    
    const schedule = scheduleData[type];
    container.innerHTML = schedule.map(item => `
        <div class="task ${item.completed ? 'completed' : ''}" data-category="${item.category}">
            <div class="time">${item.time}</div>
            <div class="desc">${item.task}</div>
            <div class="task-actions">
                <button class="complete-task" onclick="toggleTaskStatus('${item.time}', '${type}')">
                    ${item.completed ? '✓' : '○'}
                </button>
                <button class="delete-task" onclick="deleteTask('${item.time}', '${type}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    updateProgress();
    saveTasks(type);
}

// Toggle Task Status
function toggleTaskStatus(time, type) {
    const task = scheduleData[type].find(t => t.time === time);
    if (task) {
        task.completed = !task.completed;
        loadSchedule(type);
        showNotification('משימה', `המשימה ${task.completed ? 'הושלמה' : 'בוטלה'}`, task.completed ? 'success' : 'info');
    }
}

// Delete Task
function deleteTask(time, type) {
    const index = scheduleData[type].findIndex(t => t.time === time);
    if (index !== -1) {
        const task = scheduleData[type][index];
        scheduleData[type].splice(index, 1);
        loadSchedule(type);
        showNotification('משימה', `המשימה "${task.task}" נמחקה`, 'warning');
    }
}

// Add New Task
function addTask(type, taskData) {
    if (!taskData.time || !taskData.task) return false;
    
    scheduleData[type].push({
        ...taskData,
        completed: false
    });
    
    scheduleData[type].sort((a, b) => {
        const timeA = new Date(`1970/01/01 ${a.time}`);
        const timeB = new Date(`1970/01/01 ${b.time}`);
        return timeA - timeB;
    });
    
    loadSchedule(type);
    showNotification('משימה', `נוספה משימה חדשה: ${taskData.task}`, 'success');
    return true;
}

// Update Progress
function updateProgress() {
    const type = document.querySelector('.schedule-controls .active')?.dataset.type || 'default';
    const tasks = scheduleData[type];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    
    const progressBar = document.getElementById('progress-bar-inner');
    const completedElement = document.getElementById('completed-tasks');
    const totalElement = document.getElementById('total-tasks');
    
    if (progressBar && completedElement && totalElement) {
        const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        progressBar.style.width = `${percentage}%`;
        completedElement.textContent = completedTasks;
        totalElement.textContent = totalTasks;
    }
}

// Save Tasks
function saveTasks(type) {
    localStorage.setItem(`schedule_${type}`, JSON.stringify(scheduleData[type]));
}

// Load Saved Tasks
function loadSavedTasks() {
    ['default', 'special'].forEach(type => {
        const saved = localStorage.getItem(`schedule_${type}`);
        if (saved) {
            scheduleData[type] = JSON.parse(saved);
        }
    });
}

// Show Daily Summary
function showFullDay() {
    const summaryContainer = document.querySelector('.daily-summary');
    if (!summaryContainer) return;
    
    const type = document.querySelector('.schedule-controls .active')?.dataset.type || 'default';
    const tasks = scheduleData[type];
    
    const categorySummary = tasks.reduce((acc, task) => {
        if (!acc[task.category]) {
            acc[task.category] = { total: 0, completed: 0 };
        }
        acc[task.category].total++;
        if (task.completed) acc[task.category].completed++;
        return acc;
    }, {});
    
    summaryContainer.innerHTML = `
        <h3>סיכום יומי</h3>
        <div class="summary-stats">
            <div>סך הכל משימות: ${tasks.length}</div>
            <div>הושלמו: ${tasks.filter(t => t.completed).length}</div>
            <div>אחוז השלמה: ${Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%</div>
        </div>
        <div class="category-summary">
            <h4>סיכום לפי קטגוריות:</h4>
            ${Object.entries(categorySummary).map(([category, stats]) => `
                <div class="category-item">
                    <span class="category-name">${category}</span>
                    <span class="category-stats">${stats.completed}/${stats.total}</span>
                    <div class="category-progress">
                        <div class="progress-bar" style="width: ${(stats.completed / stats.total) * 100}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="tasks-timeline">
            ${tasks.map(task => `
                <div class="timeline-item ${task.completed ? 'completed' : ''}" data-category="${task.category}">
                    <div class="time">${task.time}</div>
                    <div class="task-info">
                        <div class="task-name">${task.task}</div>
                        <div class="task-category">${task.category}</div>
                    </div>
                    <div class="status">${task.completed ? '✓' : '○'}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Initialize Academic Tasks
function initializeAcademicTasks() {
    const container = document.querySelector('.academic-tasks');
    if (!container) return;
    
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

// Toggle Assignment Status
function toggleAssignmentStatus(courseName, assignmentTitle) {
    const course = academicData.courses.find(c => c.name === courseName);
    if (course) {
        const assignment = course.assignments.find(a => a.title === assignmentTitle);
        if (assignment) {
            assignment.status = assignment.status === 'completed' ? 'pending' : 'completed';
            initializeAcademicTasks();
            updateProgress();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTasks();
    loadSchedule();
    initializeAcademicTasks();
    
    // Add event listeners for schedule type buttons
    const scheduleButtons = document.querySelectorAll('.schedule-controls button');
    scheduleButtons.forEach(button => {
        button.addEventListener('click', () => {
            scheduleButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            loadSchedule(button.dataset.type);
        });
    });
}); 