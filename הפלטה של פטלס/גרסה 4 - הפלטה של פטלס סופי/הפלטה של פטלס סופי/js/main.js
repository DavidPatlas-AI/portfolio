let currentPalette = null;

// Dentist speech bubble messages
const dentistMessages = [
    "אל תשכח לצחצח פעמיים ביום! 🦷",
    "איזה צבע מהמם! מתאים לך חיוך רחב.",
    "הגומיות האלה ממש אופנתיות!",
    "חיוך בריא הוא חיוך שמח!",
    "האם ידעת? צבעים עוזרים לשפר את מצב הרוח.",
    "פטלס ממליץ: לשתות מים אחרי ממתקים!",
    "הפלטה הזו תאיר לך את היום!",
    "הגומיות שלך מוכנות למסיבת צבעים!",
    "הברק הזה בשיניים... וואו!",
    "האם ניסית כבר את כל הפלטות?",
    "פלטות חדשות הגיעו! בואו לגלות! 🎨",
    "כל פלטה מספרת סיפור שונה 📚",
    "הצבעים האלה פשוט מושלמים! ✨",
    "בחירה מעולה! אתם בעלי טעם! 👌",
    "הפה שלכם נראה פנטסטי! 😁",
    "אוהב את הקומבינציה הזו! 💙",
    "צבעים זה החיים! 🌈",
    "איזה יצירתיות! אני מתרשם! 🎭"
];

function initializePage() {
    // Wait for palettes to be available
    if (typeof palettes === 'undefined' || palettes.length === 0) {
        console.log('Palettes not ready, retrying...');
        setTimeout(initializePage, 100);
        return;
    }
    
    // Wait for generatePaletteGrid function to be available
    if (typeof generatePaletteGrid === 'undefined') {
        console.log('generatePaletteGrid not ready, retrying...');
        setTimeout(initializePage, 100);
        return;
    }
    
    // Wait for customPalettes to be available
    if (typeof customPalettes === 'undefined') {
        console.log('customPalettes not ready, retrying...');
        setTimeout(initializePage, 100);
        return;
    }
    
    console.log('Initializing page with', palettes.length, 'palettes');
    
    // Set initial palette
    currentPalette = palettes[0];
    
    try {
        generatePaletteGrid();
        updateTeethColors(currentPalette);
        console.log('Palette grid generated successfully');
    } catch (error) {
        console.error('Error generating palette grid:', error);
    }
    
    setupHamburgerMenu();
    setupDarkModeToggle();
    setupHeaderScroll();
    setupRubberBandInteraction();
    setupColorPicker();
    setupPaletteSaving();
    setupButtonListeners();
    setupFilterTabs();
    setupDentistBubbleInteractivity();
    lazyLoadAnimations();
    
    console.log('Page initialization complete');
}

// Setup filter tabs functionality
function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Filter palettes
            const category = tab.getAttribute('data-category');
            filterPalettes(category);
            
            // Show message
            const categoryName = tab.textContent;
            showDentistMessage(`מציג פלטות: ${categoryName} 🎨`);
        });
    });
}

// Lazy load animations
function lazyLoadAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements for lazy loading
    document.querySelectorAll('.teeth-section, .palette-card, .action-buttons').forEach(el => {
        observer.observe(el);
    });
}

function setupHamburgerMenu() {
    // Hamburger menu removed - function kept for compatibility
}

function setupDarkModeToggle() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial state
    if (prefersDark || localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    toggle.addEventListener('click', () => {
        // Add switching animation
        toggle.classList.add('switching');
        setTimeout(() => toggle.classList.remove('switching'), 600);
        
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        const icon = toggle.querySelector('i');
        if (icon) {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
        
        localStorage.setItem('darkMode', isDark);
        toggle.setAttribute('aria-label', isDark ? 'החלף למצב בהיר' : 'החלף למצב כהה');
        
        // Show success message
        showDentistMessage(isDark ? "מצב כהה מופעל! 🌙" : "מצב בהיר מופעל! ☀️");
    });
}

function setupHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

function setupRubberBandInteraction() {
    const bands = document.querySelectorAll('.rubber-band');
    bands.forEach(band => {
        band.addEventListener('click', () => {
            bands.forEach(b => b.classList.remove('active'));
            band.classList.add('active');
            // Bounce animation on click
            band.classList.remove('bounce');
            void band.offsetWidth;
            band.classList.add('bounce');
        });

        band.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                bands.forEach(b => b.classList.remove('active'));
                band.classList.add('active');
                // Bounce animation on keyboard
                band.classList.remove('bounce');
                void band.offsetWidth;
                band.classList.add('bounce');
            }
        });

        // Make bands focusable for keyboard navigation
        band.setAttribute('tabindex', '0');
    });

    // Remove active state when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('rubber-band')) {
            bands.forEach(band => band.classList.remove('active'));
        }
    });
}

function setupColorPicker() {
    const toggle = document.getElementById('colorPickerToggle');
    if (!toggle) return;
    
    let picker = null;

    toggle.addEventListener('click', () => {
        // Add picking animation
        toggle.classList.add('picking');
        setTimeout(() => toggle.classList.remove('picking'), 800);
        
        if (!picker) {
            picker = document.createElement('input');
            picker.type = 'color';
            picker.style.position = 'fixed';
            picker.style.opacity = '0';
            picker.style.pointerEvents = 'none';
            document.body.appendChild(picker);

            picker.addEventListener('input', () => {
                const newColor = picker.value;
                const bands = document.querySelectorAll('.rubber-band');
                const activeBand = document.querySelector('.rubber-band.active');
                
                if (activeBand) {
                    activeBand.setAttribute('fill', newColor);
                    activeBand.setAttribute('data-hex', newColor);
                    const bandIndex = parseInt(activeBand.id.replace('band', '')) - 1;
                    if (currentPalette.colors[bandIndex]) {
                        currentPalette.colors[bandIndex] = newColor;
                    }
                    
                    // Bounce animation for the changed band
                    activeBand.classList.remove('bounce');
                    void activeBand.offsetWidth;
                    activeBand.classList.add('bounce');
                    
                    showDentistMessage(`צבע חדש נבחר: ${newColor} 🎨`);
                } else {
                    // If no band is active, change a random band
                    const randomBand = bands[Math.floor(Math.random() * bands.length)];
                    randomBand.setAttribute('fill', newColor);
                    randomBand.setAttribute('data-hex', newColor);
                    randomBand.classList.add('bounce');
                    
                    showDentistMessage("בחר גומייה תחילה כדי לשנות צבע! 😊");
                }
                
                updatePaletteInfo(currentPalette);
            });

            picker.addEventListener('change', () => {
                picker.remove();
                picker = null;
            });
        }
        picker.click();
    });
}

function setupPaletteSaving() {
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', savePalette);
    }
}

function savePalette() {
    const paletteName = prompt('הזן שם לפלטה:');
    if (paletteName && paletteName.trim()) {
        const colors = Array.from(document.querySelectorAll('.rubber-band'))
            .map(band => band.getAttribute('data-hex'));
        
        const newPalette = {
            name: paletteName.trim(),
            colors: colors,
            category: 'custom',
            description: colors.join(', '),
            icon: '💾'
        };

        // Save to localStorage
        const savedPalettes = JSON.parse(localStorage.getItem('customPalettes') || '[]');
        savedPalettes.push(newPalette);
        localStorage.setItem('customPalettes', JSON.stringify(savedPalettes));

        // Add to custom palettes array
        if (typeof customPalettes !== 'undefined') {
            customPalettes.push(newPalette);
        }

        // Show success message
        const btn = document.getElementById('saveBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> נשמר!';
        setTimeout(() => btn.innerHTML = originalText, 2000);
        
        showDentistMessage(`הפלטה "${paletteName}" נשמרה בהצלחה! 💾✨`);
        
        // Regenerate palette grid to include new palette
        if (typeof generatePaletteGrid === 'function') {
            generatePaletteGrid();
        }
    }
}

function setupButtonListeners() {
    // Action buttons with error handling
    const downloadBtn = document.getElementById('downloadBtn');
    const randomBtn = document.getElementById('randomBtn');
    const copyBtn = document.getElementById('copyBtn');
    const saveBtn = document.getElementById('saveBtn');
    
    if (downloadBtn) downloadBtn.addEventListener('click', downloadPalette);
    if (randomBtn) randomBtn.addEventListener('click', randomPalette);
    if (copyBtn) copyBtn.addEventListener('click', copyPalette);
    if (saveBtn) saveBtn.addEventListener('click', savePalette);

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            filterPalettes(category);
            
            // Update active state
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

function downloadPalette() {
    const colors = Array.from(document.querySelectorAll('.rubber-band'))
        .map(band => band.getAttribute('data-hex'));
    
    const paletteData = {
        name: currentPalette ? currentPalette.name : 'הפלטה של פטלס',
        colors: colors,
        date: new Date().toISOString(),
        description: colors.join(', ')
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paletteData.name.replace(/[^a-zA-Z0-9\u0590-\u05FF]/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    const btn = document.getElementById('downloadBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> הורד!';
    setTimeout(() => btn.innerHTML = originalText, 2000);
    showDentistMessage("הפלטה הורדה בהצלחה! 💾");
}

function randomPalette() {
    // Get all available palettes
    const allPalettes = [...(palettes || []), ...(typeof customPalettes !== 'undefined' ? customPalettes : [])];
    
    if (allPalettes.length === 0) {
        showDentistMessage("אין פלטות זמינות! 😅");
        return;
    }
    
    // Select random palette from available palettes
    const randomPalette = allPalettes[Math.floor(Math.random() * allPalettes.length)];
    currentPalette = randomPalette;
    
    // Apply the selected palette
    updateTeethColors(randomPalette);
    
    // Update palette info display
    if (typeof updatePaletteInfo === 'function') {
        updatePaletteInfo(randomPalette);
    }
    
    showDentistMessage(`פלטה אקראית נבחרה: ${randomPalette.name}! 🎲✨`);
}

function copyPalette() {
    const colors = Array.from(document.querySelectorAll('.rubber-band'))
        .map(band => band.getAttribute('data-hex'))
        .join(', ');

    navigator.clipboard.writeText(colors).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> הועתק!';
        setTimeout(() => btn.innerHTML = originalText, 2000);
        showDentistMessage(`קודי הצבעים הועתקו! 📋`);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = colors;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const btn = document.getElementById('copyBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> הועתק!';
        setTimeout(() => btn.innerHTML = originalText, 2000);
        showDentistMessage(`קודי הצבעים הועתקו! 📋`);
    });
}

function filterPalettes(category) {
    const grid = document.getElementById('paletteGrid');
    if (!grid) return;
    
    const cards = grid.querySelectorAll('.palette-card');
    const allPalettes = [...(palettes || []), ...(typeof customPalettes !== 'undefined' ? customPalettes : [])];
    
    cards.forEach((card, index) => {
        const palette = allPalettes[index];
        if (!palette) return;
        
        if (category === 'all' || palette.category === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show appropriate message
    const categoryNames = {
        'all': 'כל הפלטות',
        'tech': 'פלטות הייטק',
        'flags': 'פלטות דגלים',
        'sectors': 'פלטות מגזרים',
        'vintage': 'פלטות וינטאג\'',
        'sports': 'פלטות ספורט',
        'holidays': 'פלטות חגים יהודיים',
        'gaming': 'פלטות גיימינג',
        'space': 'פלטות חלל',
        'fashion': 'פלטות אופנה',
        'music': 'פלטות מוזיקה',
        'finance': 'פלטות פיננסים',
        'moods': 'פלטות רגשות',
        'nature': 'פלטות טבע',
        'food': 'פלטות אוכל',
        'elegant': 'פלטות אלגנטיות',
        'warm': 'פלטות חמות',
        'pastel': 'פלטות פסטל',
        'contrast': 'פלטות ניגוד',
        'balanced': 'פלטות מאוזנות',
        'digital': 'פלטות דיגיטליות',
        'marine': 'פלטות ימיות',
        'sweet': 'פלטות מתוקות',
        'royal': 'פלטות מלכותיות',
        'custom': 'פלטות מותאמות אישית'
    };
    
    const categoryName = categoryNames[category] || category;
    showDentistMessage(`מציג: ${categoryName} 🎨`);
}

function showDentistMessage(msg) {
    const bubble = document.getElementById('speechBubble');
    if (!bubble) {
        console.log('Speech bubble element not found');
        return;
    }
    
    const bubbleText = bubble.querySelector('.bubble-text');
    if (bubbleText) {
        bubbleText.textContent = msg;
    }
    
    // Clear any existing animation classes
    bubble.classList.remove('show');
    bubble.style.visibility = 'visible';
    
    // Force reflow to ensure the element is ready
    bubble.offsetHeight;
    
    // Show bubble with animation
    requestAnimationFrame(() => {
        bubble.classList.add('show');
    });
    
    // Clear existing timeout
    if (bubble._hideTimeout) {
        clearTimeout(bubble._hideTimeout);
    }
    
    // Hide after 4.5 seconds
    bubble._hideTimeout = setTimeout(() => {
        bubble.classList.remove('show');
        setTimeout(() => {
            if (!bubble.classList.contains('show')) {
                bubble.style.visibility = 'hidden';
            }
        }, 600);
    }, 4500);
    
    console.log('Showing dentist message:', msg);
}

function showRandomDentistMessage() {
    const msg = dentistMessages[Math.floor(Math.random() * dentistMessages.length)];
    showDentistMessage(msg);
}

function setupDentistBubbleInteractivity() {
    // Show initial message after page load
    setTimeout(() => {
        showDentistMessage("ברוכים הבאים! בחרו פלטת צבעים מעולה! 🦷");
    }, 1500);
    
    // Show another message after a delay
    setTimeout(() => {
        showDentistMessage("לחצו על הגומיות לשינוי צבעים! 🎨");
    }, 6000);

    // Add click interaction to dentist icon
    const dentistIcon = document.querySelector('.dentist-icon');
    if (dentistIcon) {
        dentistIcon.addEventListener('click', () => {
            const clickMessages = [
                "שלום! אני ד״ר פטלס! 👨‍⚕️",
                "בואו נצבע את השיניים יחד! 🎨",
                "איזה פלטה אתם הכי אוהבים? 🤔",
                "זכרו לצחצח שיניים! 🦷✨",
                "הגומיות שלכם נראות נהדר! 😍"
            ];
            const randomMessage = clickMessages[Math.floor(Math.random() * clickMessages.length)];
            showDentistMessage(randomMessage);
        });
    }

    // Rubber band click
    document.querySelectorAll('.rubber-band').forEach(band => {
        band.addEventListener('click', () => {
            setTimeout(showRandomDentistMessage, 200);
        });
    });

    // Palette change
    document.addEventListener('paletteChanged', showRandomDentistMessage);

    // Teeth container hover
    const teethContainer = document.querySelector('.teeth-container');
    if (teethContainer) {
        teethContainer.addEventListener('mouseenter', () => {
            if (Math.random() > 0.6) { // 40% chance
                setTimeout(showRandomDentistMessage, 300);
            }
        });
    }

    // Button clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn')) {
            setTimeout(() => {
                const messages = [
                    "פעולה מעולה! 👍",
                    "כל הכבוד! 🎉",
                    "אתם מקצועיים! 💪",
                    "עבודה נפלאה! ✨"
                ];
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                showDentistMessage(randomMsg);
            }, 500);
        }
    });

    // Random messages every 20 seconds
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 20 seconds
            showRandomDentistMessage();
        }
    }, 20000);
}

function updateTeethColors(palette) {
    const bands = document.querySelectorAll('.rubber-band');
    bands.forEach((band, index) => {
        const colorIndex = index % palette.colors.length;
        setTimeout(() => {
            band.setAttribute('fill', palette.colors[colorIndex]);
            band.setAttribute('data-hex', palette.colors[colorIndex]);
            band.setAttribute('aria-label', `גומייה ${index + 1}: ${palette.colors[colorIndex]}`);
            // Enhanced bounce animation
            band.classList.remove('bounce');
            void band.offsetWidth;
            band.classList.add('bounce');
            
            // Add sparkle effect for special palettes
            if (palette.name.includes('מלכותי') || palette.name.includes('אלגנטי')) {
                setTimeout(() => {
                    band.style.filter += ' brightness(1.2)';
                    setTimeout(() => {
                        band.style.filter = band.style.filter.replace(' brightness(1.2)', '');
                    }, 500);
                }, 200);
            }
        }, index * 180);
    });
    
    // Show special message for improved design
    setTimeout(() => {
        showDentistMessage("הגשר החדש נראה מעולה! הגומיות יותר בולטות! ✨🦷");
    }, (bands.length * 180) + 500);
}

function setupScrollToPalettes() {
    const scrollBtn = document.getElementById('scrollToPalettes');
    const palettesSection = document.querySelector('.palettes-section');
    
    if (scrollBtn && palettesSection) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            scrollBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                scrollBtn.style.transform = '';
            }, 150);
            
            // Smooth scroll to palettes section
            palettesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Show dentist message
            setTimeout(() => {
                showDentistMessage('הנה הפלטות שלנו! בחרו את המועדפת עליכם! 🎨✨');
            }, 800);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting initialization');
    initializePage();
    setupDentistBubbleInteractivity();
    setupScrollToPalettes();
    
    // Show immediate welcome message
    setTimeout(() => {
        showDentistMessage("ברוכים הבאים לפלטה של פטלס! 🦷✨");
    }, 800);
    
    // Show improved design message
    setTimeout(() => {
        showDentistMessage("עיצוב ריאליסטי חדש! שיניים עם השתקפויות וחניכיים טבעיות! ✨🦷");
    }, 4000);
    
    // Show interaction tip
    setTimeout(() => {
        showDentistMessage("לחצו על הגומיות כדי לראות את האפקטים החדשים! 🎨");
    }, 8000);
    
    const goldBtn = document.getElementById('toggleGoldTooth');
    if (goldBtn) {
        goldBtn.addEventListener('click', function() {
            const goldTooth = document.getElementById('gold-tooth');
            if (goldTooth) {
                if (goldTooth.getAttribute('fill') === '#FFD700') {
                    goldTooth.setAttribute('fill', '#fff');
                } else {
                    goldTooth.setAttribute('fill', '#FFD700');
                }
            }
        });
    }
}); 