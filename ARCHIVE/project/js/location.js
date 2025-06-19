// Location Information
const locationData = {
    address: {
        city: 'ירושלים',
        neighborhood: 'פסגת זאב',
        street: 'מזל גדי',
        building: '2',
        apartment: '3',
        coordinates: {
            lat: 31.8246,
            lng: 35.2409
        }
    },
    funFacts: [
        'ידעת שפסגת זאב נקראת על שם זאב חקלאי, ממייסדי תנועת חרות? 🏛️',
        'אתה גר בשכונה הכי גדולה בירושלים! 🌟',
        'מהבית שלך אפשר לראות את הרי יהודה 🏔️',
        'השכונה שלך נבנתה בשנת 1982 - ממש צעירה! 🏗️',
        'יש בשכונה שלך יותר מ-50,000 תושבים - כמו עיר קטנה! 🏘️'
    ],
    transportInfo: {
        busLines: [
            { line: '470', from: 'ירושלים', to: 'באר שבע', platform: '21' },
            { line: '69', from: 'פסגת זאב', to: 'רמות אשכול', platform: '3' },
            { line: '68', from: 'רמות אשכול', to: 'תחנה מרכזית', platform: '5' },
            { line: 'רכבת קלה', from: 'פסגת זאב', to: 'תחנה מרכזית', platform: '1' },
            { line: '9', from: 'תחנה מרכזית ב"ש', to: 'מכללה אקדמית', platform: '7' }
        ]
    }
};

// Show Location Function
function showLocationWithImage() {
    const locationInfo = document.querySelector('.location-info');
    const mediaContainer = document.querySelector('.media-container');
    
    if (!locationInfo || !mediaContainer) return;
    
    const address = locationData.address;
    const randomFact = locationData.funFacts[Math.floor(Math.random() * locationData.funFacts.length)];
    
    // Update location info
    locationInfo.innerHTML = `
        <div class="address-card">
            <h3>🏠 הכתובת שלי:</h3>
            <div class="address-details">
                <p><i class="fa-solid fa-city"></i> עיר: ${address.city}</p>
                <p><i class="fa-solid fa-building"></i> שכונה: ${address.neighborhood}</p>
                <p><i class="fa-solid fa-road"></i> רחוב: ${address.street}</p>
                <p><i class="fa-solid fa-house"></i> בניין: ${address.building}</p>
                <p><i class="fa-solid fa-door-open"></i> דירה: ${address.apartment}</p>
            </div>
            <div class="fun-fact">
                <h4>💡 טיפ מעניין:</h4>
                <p>${randomFact}</p>
            </div>
            <div class="transport-info">
                <h4>🚌 קווי תחבורה זמינים:</h4>
                <div class="bus-lines">
                    ${locationData.transportInfo.busLines.map(bus => `
                        <div class="bus-line">
                            <span class="line-number">${bus.line}</span>
                            <span class="route">${bus.from} ⟶ ${bus.to}</span>
                            <span class="platform">רציף ${bus.platform}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Update media container with map
    mediaContainer.innerHTML = `
        <div class="map-container">
            <iframe
                width="100%"
                height="300"
                frameborder="0"
                style="border:0"
                src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${address.street}+${address.building},${address.neighborhood},${address.city}&center=${address.coordinates.lat},${address.coordinates.lng}&zoom=15"
                allowfullscreen>
            </iframe>
        </div>
        <div class="location-actions">
            <button onclick="openInMaps()" class="map-btn">
                <i class="fa-solid fa-map-marked-alt"></i> פתח במפות
            </button>
            <button onclick="copyAddress()" class="copy-btn">
                <i class="fa-solid fa-copy"></i> העתק כתובת
            </button>
        </div>
    `;
}

// Open in Maps
function openInMaps() {
    const address = locationData.address;
    const query = `${address.street} ${address.building}, ${address.neighborhood}, ${address.city}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
}

// Copy Address
function copyAddress() {
    const address = locationData.address;
    const fullAddress = `${address.street} ${address.building}, ${address.neighborhood}, ${address.city}`;
    
    navigator.clipboard.writeText(fullAddress).then(() => {
        showNotification('כתובת', 'הכתובת הועתקה ללוח', 'success');
    }).catch(err => {
        console.error('Failed to copy address:', err);
        showNotification('כתובת', 'שגיאה בהעתקת הכתובת', 'error');
    });
}

// Show Notification
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
document.addEventListener('DOMContentLoaded', () => {
    const locationButton = document.querySelector('button[onclick="showLocationWithImage()"]');
    if (locationButton) {
        locationButton.onclick = showLocationWithImage;
    }
    
    // Initial load
    showLocationWithImage();
}); 