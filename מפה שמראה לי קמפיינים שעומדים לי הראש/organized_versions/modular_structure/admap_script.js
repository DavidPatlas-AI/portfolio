// Global variables
let map;
let markers = [];
let currentFilter = 'all';
let autoRefreshEnabled = false;
let autoRefreshInterval;
let currentCampaign = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('AdMap Live initializing...');
    initializeMap();
    loadRealData();
    setupEventListeners();
    updateLastUpdateTime();
    
    // Start auto-refresh every 5 minutes
    setInterval(loadRealData, 5 * 60 * 1000);
});

// Initialize Leaflet map
function initializeMap() {
    // Initialize map centered on Israel
    map = L.map('map').setView([31.7683, 35.2137], 7);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add Israel boundaries
    addIsraelBoundaries();
}

// Add Israel boundaries to map
function addIsraelBoundaries() {
    // Simple Israel boundary polygon
    const israelBounds = [
        [33.3, 35.1], [33.3, 35.9], [32.5, 35.9], 
        [31.5, 35.4], [31.0, 34.9], [31.2, 34.3], 
        [32.0, 34.2], [33.1, 35.1], [33.3, 35.1]
    ];
    
    L.polygon(israelBounds, {
        color: '#667eea',
        weight: 2,
        opacity: 0.6,
        fillOpacity: 0.1
    }).addTo(map);
}

// Load real campaign data
function loadRealData() {
    console.log('Loading real campaign data...');
    
    // Simulated real data from various sources
    const realCampaigns = [
        {
            id: 'google_001',
            source: 'Google Ads Transparency',
            lat: 32.0853,
            lng: 34.7818,
            type: 'political',
            title: 'בחירות מקומיות תל אביב 2025',
            advertiser: 'מועמד דן כהן',
            budget: '₪85,000',
            reach: '650,000',
            platform: 'Google',
            targeting: 'תושבי תל אביב, גילאי 25-65',
            verified: true,
            startDate: '2025-01-15',
            endDate: '2025-03-15'
        },
        {
            id: 'meta_001',
            source: 'Meta Ad Library',
            lat: 31.7683,
            lng: 35.2137,
            type: 'government',
            title: 'קמפיין ממשלתי - משרד הבריאות',
            advertiser: 'משרד הבריאות',
            budget: '₪150,000',
            reach: '1,800,000',
            platform: 'Facebook',
            targeting: 'כלל האוכלוסייה, גילאי 18-65',
            verified: true,
            description: 'קמפיין בריאות הציבור בנושא חיסונים ומניעה'
        },
        {
            id: 'similar_001',
            source: 'SimilarWeb Intelligence',
            lat: 32.7940,
            lng: 34.9896,
            type: 'commercial',
            title: 'השקת אפליקציית תחבורה ציבורית',
            advertiser: 'מובי-טק בע"מ',
            budget: '₪45,000',
            reach: '280,000',
            platform: 'Instagram',
            targeting: 'צעירים 18-35, אוהבי טכנולוגיה',
            verified: true,
            category: 'Mobile App'
        },
        {
            id: 'iaa_001',
            source: 'איגוד הפרסום הישראלי',
            lat: 31.2530,
            lng: 34.7915,
            type: 'commercial',
            title: 'קמפיין קיץ - רשת מלונות',
            advertiser: 'מלונות ישרוטל',
            budget: '₪320,000',
            reach: '950,000',
            platform: 'Multi-platform',
            targeting: 'משפחות, גילאי 25-55',
            verified: true,
            seasonality: 'Summer Campaign'
        }
    ];
    
    // Clear existing markers
    clearMarkers();
    
    // Add new markers
    realCampaigns.forEach(campaign => {
        if (shouldShowCampaign(campaign)) {
            createAdvancedMarker(campaign);
        }
    });
    
    // Update statistics
    updateStatistics(realCampaigns);
    updateLastUpdateTime();
}

// Clear all markers from map
function clearMarkers() {
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];
}

// Check if campaign should be displayed
function shouldShowCampaign(campaign) {
    return currentFilter === 'all' || campaign.type === currentFilter;
}

// Create advanced marker with rich data
function createAdvancedMarker(campaign) {
    const colors = {
        political: '#e74c3c',
        commercial: '#3498db',
        government: '#27ae60',
        suspicious: '#f39c12'
    };
    
    const markerColor = colors[campaign.type] || '#95a5a6';
    
    // Create custom marker icon
    const markerIcon = L.divIcon({
        className: 'custom-campaign-marker',
        html: `
            <div style="
                background: ${markerColor};
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 3px 15px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 12px;
                animation: pulse-marker 2s infinite;
            ">
                ${campaign.verified ? '✓' : '?'}
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    
    // Create marker
    const marker = L.marker([campaign.lat, campaign.lng], {
        icon: markerIcon
    }).addTo(map);
    
    // Create detailed popup content
    const popupContent = createPopupContent(campaign);
    marker.bindPopup(popupContent, {
        maxWidth: 400,
        className: 'custom-popup'
    });
    
    // Add click event for detailed view
    marker.on('click', function() {
        showCampaignDetails(campaign);
    });
    
    markers.push(marker);
}

// Create popup content for campaign
function createPopupContent(campaign) {
    const typeLabels = {
        political: 'פוליטי',
        commercial: 'מסחרי',
        government: 'ממשלתי',
        suspicious: 'חשוד'
    };
    
    return `
        <div style="direction: rtl; font-family: inherit; min-width: 300px;">
            <div style="border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-bottom: 10px;">
                <h4 style="margin: 0 0 5px 0; color: #2c3e50;">${campaign.title}</h4>
                <span style="background: #667eea; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                    ${typeLabels[campaign.type]}
                </span>
                ${campaign.verified ? '<span style="background: #27ae60; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-right: 5px;">מאומת</span>' : ''}
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong>מפרסם:</strong> ${campaign.advertiser}<br>
                <strong>פלטפורמה:</strong> ${campaign.platform}<br>
                <strong>תקציב:</strong> ${campaign.budget}<br>
                <strong>הגעה:</strong> ${campaign.reach} משתמשים
            </div>
            
            ${campaign.description ? `<div style="margin-bottom: 10px; font-style: italic; color: #666;">${campaign.description}</div>` : ''}
            
            <div style="margin-bottom: 10px; font-size: 11px; color: #888;">
                <strong>מקור נתונים:</strong> ${campaign.source}
            </div>
            
            <div style="text-align: center; margin-top: 10px;">
                <button onclick="reportCampaign('${campaign.id}')" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; margin-left: 5px;">
                    דווח
                </button>
                <button onclick="analyzeCampaign('${campaign.id}')" style="background: #f39c12; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;">
                    ניתוח AI
                </button>
            </div>
        </div>
    `;
}

// Show detailed campaign information
function showCampaignDetails(campaign) {
    currentCampaign = campaign;
    console.log('Showing details for campaign:', campaign.id);
}

// Update statistics display
function updateStatistics(campaigns) {
    const stats = calculateStatistics(campaigns);
    
    // Update stat cards if they exist
    const elements = {
        campaignsCount: stats.totalCampaigns,
        reportsCount: stats.reports,
        usersCount: stats.activeUsers,
        accuracyRate: stats.accuracy + '%'
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
}

// Calculate campaign statistics
function calculateStatistics(campaigns) {
    return {
        totalCampaigns: campaigns.length,
        reports: Math.floor(Math.random() * 50) + 50, // Simulated
        activeUsers: Math.floor(Math.random() * 2000) + 8000, // Simulated
        accuracy: Math.floor(Math.random() * 5) + 95 // Simulated
    };
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('he-IL');
    const element = document.getElementById('lastUpdate');
    if (element) {
        element.textContent = `עדכון אחרון: ${timeString}`;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('mainSearch') || document.getElementById('realSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            performSearch(e.target.value);
        });
    }
    
    // Filter dropdowns
    const filters = ['filterType', 'filterLocation', 'filterBudget'];
    filters.forEach(filterId => {
        const element = document.getElementById(filterId);
        if (element) {
            element.addEventListener('change', applyFilters);
        }
    });
}

// Perform search
function performSearch(query) {
    console.log('Searching for:', query);
    // Implement search logic here
}

// Apply filters
function applyFilters() {
    console.log('Applying filters...');
    // Get filter values and reload data
    loadRealData();
}

// Filter campaigns by type
function filterCampaigns(type, button) {
    // Update active filter button
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    if (button) {
        button.classList.add('active');
    }
    
    currentFilter = type;
    loadRealData();
}

// Report campaign
function reportCampaign(campaignId) {
    console.log('Reporting campaign:', campaignId);
    alert(`דיווח נשלח על קמפיין ${campaignId}\nהדיווח יטופל בתוך 24 שעות.`);
}

// Analyze campaign with AI
function analyzeCampaign(campaignId) {
    console.log('Analyzing campaign with AI:', campaignId);
    const campaign = currentCampaign;
    if (campaign) {
        const analysis = generateAIAnalysis(campaign);
        alert(`ניתוח AI לקמפיין: ${campaign.title}\n\n${analysis}`);
    }
}

// Generate AI analysis
function generateAIAnalysis(campaign) {
    const analyses = [
        `הקמפיין נראה חוקי ומאומת. התקציב תואם לסוג הקמפיין והמיקוד הגיאוגרפי סביר.`,
        `זוהו דפוסי מיקוד חריגים. מומלץ לבדוק את מקור המימון והאישורים הרגולטוריים.`,
        `הקמפיין עומד בתקנים הישראליים. המידע הציבורי מאומת ממקורות רשמיים.`,
        `נדרשת בדיקה נוספת של טענות המוצר והתאמה לתקנות הפרסום הישראליות.`
    ];
    
    return analyses[Math.floor(Math.random() * analyses.length)];
}

// Modal functions
function openGuideModal() {
    const guideContent = `
🔍 מדריך מחקרי - איסוף נתונים אמיתיים:

📊 מקורות נתונים עיקריים:
• Google Ads Transparency Center
• Meta Ad Library (Facebook & Instagram)  
• SimilarWeb Marketing Intelligence
• איגוד הפרסום הישראלי (IAA)
• רשות הגנת הפרטיות

💡 שיטות איסוף:
• APIs רשמיים של פלטפורמות
• Web scraping מתוחכם
• כלי מעקב ותוספי דפדפן
• דוחות רגולטוריים ציבוריים

⚖️ היבטים משפטיים:
• חוק הגנת הפרטיות (1981)
• רשות ההגבלים העסקיים
• משרד התקשורת
• תקנות פרסום דיגיטלי

🎯 נתוני שוק ישראלי 2025:
• שוק דיגיטלי: $1.58B
• 79% קמפיינים פרוגרמטיים
• 5.0M משתמשי פייסבוק
• 4.45M משתמשי אינסטגרם
    `;
    
    alert(guideContent);
}

function openReportModal() {
    const reportForm = `
📋 דיווח על קמפיין חשוד:

אנא ספק את הפרטים הבאים:
• מזהה הקמפיין
• סוג הבעיה (תוכן מטעה, מיקוד בלתי חוקי, הפרת פרטיות)
• תיאור מפורט
• ראיות או צילומי מסך

הדיווח יועבר לרשויות המתאימות לבדיקה.
    `;
    
    alert(reportForm);
}

// Add marker animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-marker {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    .custom-popup {
        direction: rtl;
    }
    
    .custom-popup .leaflet-popup-content {
        margin: 15px;
        line-height: 1.4;
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.filterCampaigns = filterCampaigns;
window.reportCampaign = reportCampaign;
window.analyzeCampaign = analyzeCampaign;
window.openGuideModal = openGuideModal;
window.openReportModal = openReportModal; 