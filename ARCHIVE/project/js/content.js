// Content Data
const contentData = {
    // תמונות ירושלים
    jerusalemImages: [
        { id: 1, path: 'assets/images/jerusalem/1.jpeg', title: 'הכותל המערבי' },
        { id: 2, path: 'assets/images/jerusalem/2.jpeg', title: 'העיר העתיקה' },
        { id: 3, path: 'assets/images/jerusalem/3.jpeg', title: 'שער יפו' },
        { id: 4, path: 'assets/images/jerusalem/4.jpeg', title: 'הר הבית' },
        { id: 5, path: 'assets/images/jerusalem/5.jpeg', title: 'שוק מחנה יהודה' }
    ],

    // קווי אוטובוס
    busLines: [
        { line: '470', from: 'ירושלים', to: 'באר שבע', platform: '21', times: ['06:00', '08:00', '10:00', '12:00'] },
        { line: '69', from: 'פסגת זאב', to: 'רמות אשכול', platform: '3', times: ['07:00', '07:30', '08:00', '08:30'] },
        { line: '68', from: 'רמות אשכול', to: 'תחנה מרכזית', platform: '5', times: ['07:15', '07:45', '08:15', '08:45'] },
        { line: 'רכבת קלה', from: 'פסגת זאב', to: 'תחנה מרכזית', platform: '1', times: ['כל 10 דקות'] },
        { line: '9', from: 'תחנה מרכזית ב"ש', to: 'מכללה אקדמית', platform: '7', times: ['07:30', '08:30', '09:30', '10:30'] }
    ],

    // מצבי רוח
    moods: [
        { emoji: '😄', text: 'מאושר', value: 5 },
        { emoji: '🙂', text: 'טוב', value: 4 },
        { emoji: '😐', text: 'רגיל', value: 3 },
        { emoji: '😢', text: 'עצוב', value: 2 },
        { emoji: '😫', text: 'מתוסכל', value: 1 }
    ],

    // לו"ז יומי
    schedule: {
        default: [
            { time: '09:00', task: 'תחילת יום העבודה', category: 'עבודה' },
            { time: '10:30', task: 'פגישת צוות', category: 'פגישות' },
            { time: '12:00', task: 'הפסקת צהריים', category: 'הפסקות' },
            { time: '13:00', task: 'המשך עבודה', category: 'עבודה' },
            { time: '16:00', task: 'סיום יום', category: 'עבודה' }
        ],
        special: [
            { time: '10:00', task: 'פגישה מיוחדת', category: 'פגישות' },
            { time: '11:30', task: 'הרצאה', category: 'לימודים' },
            { time: '13:00', task: 'ארוחת צהריים', category: 'הפסקות' },
            { time: '14:30', task: 'סדנה', category: 'לימודים' },
            { time: '16:30', task: 'סיכום יום', category: 'עבודה' }
        ]
    },

    // משימות לימודיות
    academicTasks: [
        {
            course: 'תכנות מתקדם',
            tasks: [
                { title: 'פרויקט סיום', dueDate: '2024-02-01', status: 'pending' },
                { title: 'מטלת ביניים', dueDate: '2024-01-15', status: 'completed' }
            ]
        },
        {
            course: 'מתמטיקה',
            tasks: [
                { title: 'תרגיל 1', dueDate: '2024-01-20', status: 'pending' },
                { title: 'מבחן אמצע', dueDate: '2024-02-10', status: 'pending' }
            ]
        }
    ]
};

// Image Gallery Functions
let currentImageIndex = 0;

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % contentData.jerusalemImages.length;
    updateImageDisplay();
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + contentData.jerusalemImages.length) % contentData.jerusalemImages.length;
    updateImageDisplay();
}

function showRandomImage() {
    const newIndex = Math.floor(Math.random() * contentData.jerusalemImages.length);
    currentImageIndex = newIndex;
    updateImageDisplay();
}

function updateImageDisplay() {
    const image = contentData.jerusalemImages[currentImageIndex];
    const imageElement = document.getElementById('currentImage');
    const titleElement = document.getElementById('imageTitle');
    
    if (imageElement) {
        imageElement.src = image.path;
        imageElement.alt = image.title;
    }
    
    if (titleElement) {
        titleElement.textContent = image.title;
    }
}

// Bus Information Functions
let currentBusIndex = 0;

function updateBusInfo(type = 'next') {
    const busInfo = document.querySelector('.bus-info');
    if (!busInfo) return;

    if (type === 'random') {
        currentBusIndex = Math.floor(Math.random() * contentData.busLines.length);
    } else {
        currentBusIndex = (currentBusIndex + 1) % contentData.busLines.length;
    }

    const bus = contentData.busLines[currentBusIndex];
    busInfo.innerHTML = `
        <div class="bus-line">קו <span id="busNumber">${bus.line}</span></div>
        <div class="bus-route">
            <div class="from">מוצא: ${bus.from}</div>
            <div class="to">יעד: ${bus.to}</div>
        </div>
        <div class="bus-platform">רציף: ${bus.platform}</div>
        <div class="bus-times">
            <div class="times-title">זמני יציאה:</div>
            <div class="times-list">${bus.times.join(', ')}</div>
        </div>
    `;
}

// Initialize Content
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Image Gallery
    updateImageDisplay();
    
    // Initialize Bus Information
    updateBusInfo();
    
    // Add event listeners for image navigation
    const nextButton = document.querySelector('.image-nav .next');
    const prevButton = document.querySelector('.image-nav .prev');
    const randomButton = document.querySelector('.image-nav .random');
    
    if (nextButton) nextButton.addEventListener('click', showNextImage);
    if (prevButton) prevButton.addEventListener('click', showPreviousImage);
    if (randomButton) randomButton.addEventListener('click', showRandomImage);
}); 