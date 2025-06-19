// Calculator implementation
class Calculator {
    constructor() {
        this.currentValue = 0;
        this.memory = 0;
        this.lastOperation = null;
        this.newNumber = true;
    }

    clear() {
        this.currentValue = 0;
        this.memory = 0;
        this.lastOperation = null;
        this.newNumber = true;
        this.updateDisplay();
    }

    digit(num) {
        if (this.newNumber) {
            this.currentValue = num;
            this.newNumber = false;
        } else {
            this.currentValue = this.currentValue * 10 + num;
        }
        this.updateDisplay();
    }

    operation(op) {
        if (this.lastOperation) {
            this.calculate();
        }
        this.memory = this.currentValue;
        this.lastOperation = op;
        this.newNumber = true;
    }

    calculate() {
        if (!this.lastOperation) return;

        switch (this.lastOperation) {
            case '+':
                this.currentValue = this.memory + this.currentValue;
                break;
            case '-':
                this.currentValue = this.memory - this.currentValue;
                break;
            case '*':
                this.currentValue = this.memory * this.currentValue;
                break;
            case '/':
                if (this.currentValue !== 0) {
                    this.currentValue = this.memory / this.currentValue;
                } else {
                    alert('אין לחלק באפס!');
                    this.clear();
                    return;
                }
                break;
        }

        this.lastOperation = null;
        this.newNumber = true;
        this.updateDisplay();
    }

    updateDisplay() {
        const display = document.querySelector('.calculator-display');
        if (display) {
            display.textContent = this.currentValue;
        }
    }
}

// Drawing pad implementation
class DrawingPad {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isDrawing = false;
        this.setupCanvas();
        this.setupEventListeners();
    }

    setupCanvas() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = 400;
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
    }

    draw(e) {
        if (!this.isDrawing) return;
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setColor(color) {
        this.ctx.strokeStyle = color;
    }

    setLineWidth(width) {
        this.ctx.lineWidth = width;
    }
}

// Formula reference implementation
const formulas = {
    geometry: {
        circle: {
            area: 'A = πr²',
            circumference: 'C = 2πr'
        },
        triangle: {
            area: 'A = (b × h) ÷ 2',
            pythagorean: 'a² + b² = c²'
        },
        rectangle: {
            area: 'A = l × w',
            perimeter: 'P = 2(l + w)'
        }
    },
    algebra: {
        quadratic: {
            formula: 'x = (-b ± √(b² - 4ac)) ÷ 2a',
            discriminant: 'Δ = b² - 4ac'
        },
        exponents: {
            multiplication: 'xᵃ × xᵇ = x^(a+b)',
            division: 'xᵃ ÷ xᵇ = x^(a-b)'
        }
    },
    statistics: {
        mean: 'x̄ = Σx ÷ n',
        standardDeviation: 's = √(Σ(x - x̄)² ÷ (n-1))'
    }
};

function showFormulas(category) {
    const formulaSection = formulas[category];
    if (!formulaSection) return;

    let html = `<h3>${category}</h3>`;
    for (const [topic, topicFormulas] of Object.entries(formulaSection)) {
        html += `<h4>${topic}</h4>`;
        for (const [name, formula] of Object.entries(topicFormulas)) {
            html += `<p><strong>${name}:</strong> ${formula}</p>`;
        }
    }

    const formulaDisplay = document.getElementById('formulas');
    if (formulaDisplay) {
        formulaDisplay.innerHTML = html;
    }
}

// Time management tools
function formatTimeRemaining(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Export all tools
export {
    Calculator,
    DrawingPad,
    formulas,
    showFormulas,
    formatTimeRemaining
}; 