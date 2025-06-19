let currentPalette = palettes[0];

function initializePage() {
    generatePaletteGrid();
    updateTeethColors(currentPalette);
}

function generatePaletteGrid() {
    const grid = document.getElementById('paletteGrid');
    grid.innerHTML = '';

    palettes.forEach((palette, index) => {
        const card = document.createElement('div');
        card.className = 'palette-card';
        if (index === 0) card.classList.add('active');
        
        card.innerHTML = `
            <div class="palette-header">
                <div class="palette-name">${palette.name}</div>
                <div class="palette-category">${getCategoryName(palette.category)}</div>
            </div>
            <div class="palette-colors">
                ${palette.colors.map(color => 
                    `<div class="color-swatch" style="background-color: ${color}"></div>`
                ).join('')}
            </div>
            <div class="palette-hex">${palette.colors.join(' • ')}</div>
        `;
        
        card.addEventListener('click', () => selectPalette(palette, card));
        grid.appendChild(card);
    });
}

function getCategoryName(category) {
    const names = {
        'flags': 'דגלים',
        'sectors': 'מגזרים',
        'moods': 'רגשות'
    };
    return names[category] || category;
}

function selectPalette(palette, element) {
    // Remove active class from all cards
    document.querySelectorAll('.palette-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    element.classList.add('active');
    
    // Update current palette
    currentPalette = palette;
    
    // Update teeth colors with animation
    updateTeethColors(palette);
    
    // Update info
    document.getElementById('currentPaletteInfo').innerHTML = `
        <h3>${palette.name}</h3>
        <p>${palette.description}</p>
    `;
}

function updateTeethColors(palette) {
    const bands = document.querySelectorAll('.rubber-band');
    bands.forEach((band, index) => {
        const colorIndex = index % palette.colors.length;
        setTimeout(() => {
            band.classList.add('pulse-color');
            band.setAttribute('fill', palette.colors[colorIndex]);
            setTimeout(() => {
                band.classList.remove('pulse-color');
            }, 800);
        }, index * 100);
    });
}

function filterPalettes(category) {
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter palettes
    const grid = document.getElementById('paletteGrid');
    const cards = grid.querySelectorAll('.palette-card');
    
    cards.forEach((card, index) => {
        const palette = palettes[index];
        if (category === 'all' || palette.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function randomPalette() {
    const randomIndex = Math.floor(Math.random() * palettes.length);
    const randomPalette = palettes[randomIndex];
    const cards = document.querySelectorAll('.palette-card');
    selectPalette(randomPalette, cards[randomIndex]);
    
    // Scroll to show the selected palette
    cards[randomIndex].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

function downloadPalette() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;
    
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 800, 400);
    
    // Title
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 32px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('הפלטה של פטלס', 400, 60);
    
    // Palette name
    ctx.font = '24px Inter';
    ctx.fillText(currentPalette.name, 400, 100);
    
    // Color swatches
    const swatchWidth = 120;
    const startX = (800 - (swatchWidth * 5)) / 2;
    
    currentPalette.colors.forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.fillRect(startX + index * swatchWidth, 150, swatchWidth - 10, 80);
        
        // Color code
        ctx.fillStyle = '#666666';
        ctx.font = '14px monospace';
        ctx.fillText(color, startX + index * swatchWidth + swatchWidth/2 - 5, 250);
    });
    
    // Download
    const link = document.createElement('a');
    link.download = `palette-${currentPalette.name}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

function copyPalette() {
    const colorCodes = currentPalette.colors.join(', ');
    navigator.clipboard.writeText(colorCodes).then(() => {
        // Show feedback
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> הועתק!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', initializePage); 