document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const colorBoxes = document.querySelectorAll('.color-box');
    const descriptionElement = document.querySelector('.palette-description p');
    const dentistSvg = document.querySelector('.dentist-svg');

    // Initialize colors
    updateColors(palettes[0]);

    generateBtn.addEventListener('click', () => {
        const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
        animateColorChange(randomPalette);
        animateDentist();
    });

    copyBtn.addEventListener('click', () => {
        const colors = Array.from(colorBoxes).map(box => box.dataset.color).join('\n');
        navigator.clipboard.writeText(colors).then(() => {
            showCopyMessage();
            animateCopyButton();
        });
    });

    // Add hover effects to color boxes
    colorBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'translateY(-5px) scale(1.02)';
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'translateY(0) scale(1)';
        });

        // Add click to copy individual colors
        box.addEventListener('click', () => {
            const color = box.dataset.color;
            navigator.clipboard.writeText(color).then(() => {
                showCopyMessage(color);
                animateColorBox(box);
            });
        });
    });

    function updateColors(palette) {
        colorBoxes.forEach((box, index) => {
            const color = palette.colors[index];
            box.dataset.color = color.hex;
            box.querySelector('.color-preview').style.backgroundColor = color.hex;
            box.querySelector('.color-name').textContent = color.name;
            box.querySelector('.color-hex').textContent = color.hex;
        });

        descriptionElement.textContent = palette.description;
    }

    function animateColorChange(palette) {
        colorBoxes.forEach((box, index) => {
            const color = palette.colors[index];
            const preview = box.querySelector('.color-preview');
            preview.classList.add('changing');
            
            setTimeout(() => {
                box.dataset.color = color.hex;
                preview.style.backgroundColor = color.hex;
                box.querySelector('.color-name').textContent = color.name;
                box.querySelector('.color-hex').textContent = color.hex;
                preview.classList.remove('changing');
            }, 300);
        });

        setTimeout(() => {
            descriptionElement.textContent = palette.description;
        }, 300);
    }

    function animateDentist() {
        dentistSvg.classList.add('bouncing');
        setTimeout(() => {
            dentistSvg.classList.remove('bouncing');
        }, 500);
    }

    function animateColorBox(box) {
        box.style.transform = 'scale(1.1)';
        setTimeout(() => {
            box.style.transform = 'scale(1)';
        }, 300);
    }

    function animateCopyButton() {
        copyBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            copyBtn.style.transform = 'scale(1)';
        }, 200);
    }

    function showCopyMessage(color = null) {
        const message = document.createElement('div');
        message.textContent = color ? `הצבע ${color} הועתק!` : 'הפלטה הועתקה!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4ECDC4;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            animation: fadeOut 2s forwards;
            z-index: 1000;
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 2000);
    }

    // Add CSS for the fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: translateY(0); }
            70% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
}); 