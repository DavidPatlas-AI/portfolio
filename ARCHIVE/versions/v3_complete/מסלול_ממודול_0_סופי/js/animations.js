// Animation Controller
class AnimationController {
    static pulse(element) {
        element.classList.add('pulse');
        setTimeout(() => element.classList.remove('pulse'), 1000);
    }

    static fadeIn(element) {
        element.classList.add('fade-in');
        setTimeout(() => element.classList.remove('fade-in'), 1000);
    }

    static flip(element) {
        element.classList.add('flip');
        setTimeout(() => element.classList.remove('flip'), 1000);
    }
}

// Mood Animation System
class MoodAnimator {
    static moods = {
        happy: {
            icon: '😊',
            animation: 'bounce',
            sound: 'happy.mp3'
        },
        tired: {
            icon: '😴',
            animation: 'wobble',
            sound: 'yawn.mp3'
        },
        excited: {
            icon: '🚀',
            animation: 'pulse',
            sound: 'excited.mp3'
        }
        // ניתן להוסיף עוד מצבי רוח
    };

    static animate(mood) {
        const moodData = this.moods[mood];
        if (!moodData) return;

        const display = document.getElementById('moodDisplay');
        display.textContent = moodData.icon;
        display.classList.add(moodData.animation);
        
        const audio = new Audio(`assets/sounds/${moodData.sound}`);
        audio.play();

        setTimeout(() => {
            display.classList.remove(moodData.animation);
        }, 1000);
    }
}

// Energy Bar Animation
class EnergyBar {
    constructor() {
        this.level = 100;
        this.bar = document.getElementById('energyBar');
        this.updateDisplay();
    }

    decrease(amount) {
        this.level = Math.max(0, this.level - amount);
        this.updateDisplay();
        this.animateChange('decrease');
    }

    increase(amount) {
        this.level = Math.min(100, this.level + amount);
        this.updateDisplay();
        this.animateChange('increase');
    }

    updateDisplay() {
        this.bar.style.width = `${this.level}%`;
        this.bar.style.backgroundColor = this.getColorForLevel();
    }

    getColorForLevel() {
        if (this.level > 70) return '#00ff00';
        if (this.level > 30) return '#ffff00';
        return '#ff0000';
    }

    animateChange(type) {
        this.bar.classList.add(`energy-${type}`);
        setTimeout(() => this.bar.classList.remove(`energy-${type}`), 500);
    }
}

// Background Animation System
class BackgroundAnimator {
    static themes = {
        study: {
            color: '#1a1a1a',
            pattern: 'computer-pattern.png'
        },
        emotional: {
            color: '#2a1a2a',
            pattern: 'heart-pattern.png'
        },
        explosion: {
            color: '#2a0000',
            pattern: 'explosion-pattern.png'
        }
    };

    static change(theme) {
        const themeData = this.themes[theme];
        if (!themeData) return;

        document.body.style.backgroundColor = themeData.color;
        document.body.style.backgroundImage = `url(assets/images/${themeData.pattern})`;
        
        // Add transition effect
        document.body.classList.add('background-transition');
        setTimeout(() => {
            document.body.classList.remove('background-transition');
        }, 1000);
    }
}

// Initialize all animation systems
document.addEventListener('DOMContentLoaded', () => {
    // Create energy bar instance
    window.energyBar = new EnergyBar();

    // Add global animation handlers
    document.querySelectorAll('.animated-button').forEach(button => {
        button.addEventListener('click', () => {
            AnimationController.pulse(button);
        });
    });

    // Initialize background transitions
    document.body.classList.add('background-transition-enabled');
}); 