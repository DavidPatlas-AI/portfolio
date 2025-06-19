// Button Tree Data
const buttonTreeData = {
    'ראשי': {
        'לימודים': {
            'שיעורים': ['מתמטיקה', 'אנגלית', 'פיזיקה', 'תכנות'],
            'מטלות': ['שיעורי בית', 'פרויקטים', 'מבחנים', 'תרגילים']
        },
        'פעילויות': {
            'ספורט': ['כדורגל', 'שחייה', 'ריצה', 'יוגה'],
            'תחביבים': ['קריאה', 'ציור', 'מוזיקה', 'גינון']
        },
        'מערכת': {
            'הגדרות': {
                'שפה': ['עברית', 'אנגלית'],
                'תצוגה': ['בהיר', 'כהה', 'אוטומטי'],
                'צלילים': ['מופעל', 'כבוי'],
                'התראות': ['מופעל', 'כבוי']
            },
            'עדכונים': ['בדיקה', 'התקנה', 'היסטוריה', 'גיבוי']
        }
    }
};

let selectedPath = [];

// Create Button Tree
function createButtonTree(data, container, level = 0, path = []) {
    if (!container) return;
    
    const ul = document.createElement('ul');
    ul.className = `tree-level-${level}`;
    
    Object.entries(data).forEach(([key, value]) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        const currentPath = [...path, key];
        
        button.className = `tree-btn ${selectedPath.join('/') === currentPath.join('/') ? 'active' : ''}`;
        button.innerHTML = `
            <span class="btn-text">${key}</span>
            ${typeof value === 'object' ? '<i class="fa-solid fa-chevron-down"></i>' : ''}
        `;
        
        button.onclick = (e) => {
            e.stopPropagation();
            handleButtonClick(li, button, value, currentPath, level);
        };
        
        li.appendChild(button);
        ul.appendChild(li);
        
        // If this path is in the selected path, expand it
        if (selectedPath.join('/').startsWith(currentPath.join('/'))) {
            handleButtonClick(li, button, value, currentPath, level, true);
        }
    });
    
    container.appendChild(ul);
}

// Handle Button Click
function handleButtonClick(li, button, value, path, level, skipAnimation = false) {
    const existingSubTree = li.querySelector('.sub-tree');
    const allButtons = document.querySelectorAll(`.tree-level-${level} .tree-btn`);
    
    // Remove active class from all buttons at this level
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    if (existingSubTree) {
        if (!skipAnimation) {
            existingSubTree.classList.add('fade-out');
            setTimeout(() => existingSubTree.remove(), 300);
            selectedPath = selectedPath.slice(0, level);
        }
    } else {
        button.classList.add('active');
        selectedPath = path;
        
        if (typeof value === 'object') {
            const subTree = document.createElement('div');
            subTree.className = 'sub-tree';
            if (!skipAnimation) subTree.classList.add('fade-in');
            
            if (Array.isArray(value)) {
                subTree.innerHTML = `
                    <div class="tree-items">
                        ${value.map(item => `
                            <div class="tree-item">
                                <span class="item-text">${item}</span>
                                <button class="item-action" onclick="handleTreeItem('${path.join('/')}', '${item}')">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                createButtonTree(value, subTree, level + 1, path);
            }
            
            li.appendChild(subTree);
        }
    }
    
    // Save state
    saveTreeState();
}

// Handle Tree Item
function handleTreeItem(category, item) {
    const [section, subsection] = category.split('/').slice(-2);
    
    switch (section) {
        case 'שיעורים':
            addToSchedule({ time: prompt('באיזו שעה?', '09:00'), task: item, category: 'לימודים' });
            break;
        case 'מטלות':
            addAcademicTask(item);
            break;
        case 'ספורט':
        case 'תחביבים':
            addToSchedule({ time: prompt('באיזו שעה?', '16:00'), task: item, category: section });
            break;
        case 'הגדרות':
            updateSetting(subsection, item);
            break;
    }
    
    showNotification(section, `נבחר: ${item}`, 'info');
}

// Update Setting
function updateSetting(setting, value) {
    switch (setting) {
        case 'שפה':
            document.documentElement.lang = value === 'עברית' ? 'he' : 'en';
            document.documentElement.dir = value === 'עברית' ? 'rtl' : 'ltr';
            break;
        case 'תצוגה':
            document.body.className = value.toLowerCase();
            break;
        case 'צלילים':
            localStorage.setItem('soundsEnabled', value === 'מופעל');
            break;
        case 'התראות':
            if (value === 'מופעל') {
                Notification.requestPermission();
            }
            localStorage.setItem('notificationsEnabled', value === 'מופעל');
            break;
    }
}

// Save Tree State
function saveTreeState() {
    localStorage.setItem('treeState', JSON.stringify(selectedPath));
}

// Load Tree State
function loadTreeState() {
    const saved = localStorage.getItem('treeState');
    if (saved) {
        selectedPath = JSON.parse(saved);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTreeState();
    
    // Initialize main tree
    const mainTree = document.getElementById('buttonTree');
    if (mainTree) {
        createButtonTree(buttonTreeData, mainTree);
    }
    
    // Initialize tab tree
    const tabTree = document.querySelector('#tab-tree #buttonTree');
    if (tabTree) {
        createButtonTree(buttonTreeData, tabTree);
    }
}); 