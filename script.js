// ===== Floating Particles Animation =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size = Math.random() * 6 + 4;
    const left = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = Math.random() * 4 + 4;
    const hue = Math.random() > 0.5 ? 45 : 35; // Gold variations

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        background: hsl(${hue}, 100%, ${60 + Math.random() * 20}%);
        box-shadow: 0 0 ${size * 2}px hsl(${hue}, 100%, 50%);
    `;

    container.appendChild(particle);
}

// ===== Mouse Parallax Effect =====
function initParallax() {
    const container = document.querySelector('.container');
    const sunSymbol = document.querySelector('.sun-symbol');

    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;

        if (sunSymbol) {
            sunSymbol.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// ===== Add Sparkle Effect on Click =====
function initSparkles() {
    document.addEventListener('click', (e) => {
        createSparkle(e.clientX, e.clientY);
    });
}

function createSparkle(x, y) {
    const sparkleCount = 8;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #FFD700, #FFF4B8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: sparkle-burst 0.6s ease-out forwards;
        `;

        const angle = (360 / sparkleCount) * i;
        const distance = 50 + Math.random() * 30;
        const rad = angle * (Math.PI / 180);
        const targetX = Math.cos(rad) * distance;
        const targetY = Math.sin(rad) * distance;

        sparkle.style.setProperty('--tx', `${targetX}px`);
        sparkle.style.setProperty('--ty', `${targetY}px`);

        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 600);
    }
}

// Add sparkle animation to stylesheet
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-burst {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
        }
    }
    
    @keyframes touch-trail-fade {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(180deg);
        }
    }
    
    @keyframes touch-fire-rise {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, calc(-50% - 40px)) scale(0.3);
        }
    }
    
    .touch-star {
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        animation: touch-trail-fade 0.8s ease-out forwards;
    }
    
    .touch-fire {
        position: fixed;
        pointer-events: none;
        z-index: 9997;
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        animation: touch-fire-rise 0.6s ease-out forwards;
    }
`;
document.head.appendChild(sparkleStyle);

// ===== Touch Trail Effect for Mobile =====
let lastTouchTime = 0;
const touchTrailThrottle = 30; // ms between particles

function initTouchTrail() {
    // Touch move - create trailing particles
    document.addEventListener('touchmove', (e) => {
        const now = Date.now();
        if (now - lastTouchTime < touchTrailThrottle) return;
        lastTouchTime = now;

        // Get all touch points
        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            createTouchTrailParticle(touch.clientX, touch.clientY);
        }
    }, { passive: true });

    // Touch start - create burst effect
    document.addEventListener('touchstart', (e) => {
        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            createTouchBurst(touch.clientX, touch.clientY);
        }
    }, { passive: true });
}

function createTouchTrailParticle(x, y) {
    // Randomly choose between star and fire particle
    const particleType = Math.random();

    if (particleType < 0.6) {
        // Create star particle
        createTouchStar(x, y);
    } else {
        // Create fire particle
        createTouchFire(x, y);
    }
}

function createTouchStar(x, y) {
    const star = document.createElement('div');
    star.className = 'touch-star';

    const size = Math.random() * 12 + 8;
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;
    const rotation = Math.random() * 360;
    const hue = Math.random() > 0.5 ? 45 : 50; // Gold variations

    // Star shape using CSS clip-path
    star.style.cssText = `
        left: ${x + offsetX}px;
        top: ${y + offsetY}px;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, 
            hsl(${hue}, 100%, 70%) 0%, 
            hsl(${hue}, 100%, 50%) 50%,
            hsl(${hue - 10}, 100%, 40%) 100%);
        clip-path: polygon(
            50% 0%, 61% 35%, 98% 35%, 68% 57%, 
            79% 91%, 50% 70%, 21% 91%, 32% 57%, 
            2% 35%, 39% 35%
        );
        transform: translate(-50%, -50%) rotate(${rotation}deg);
        box-shadow: 0 0 ${size}px hsl(${hue}, 100%, 60%),
                    0 0 ${size * 2}px hsl(${hue}, 100%, 40%);
        filter: blur(0.5px);
    `;

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 800);
}

function createTouchFire(x, y) {
    const fire = document.createElement('div');
    fire.className = 'touch-fire';

    const size = Math.random() * 10 + 6;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    // Fire colors
    const colors = [
        'linear-gradient(to top, #FF4500, #FF6B35, #FFE066)',
        'linear-gradient(to top, #FF6B35, #FF9500, #FFD700)',
        'linear-gradient(to top, #FF9500, #FFD700, #FFFACD)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    fire.style.cssText = `
        left: ${x + offsetX}px;
        top: ${y + offsetY}px;
        width: ${size}px;
        height: ${size * 1.5}px;
        background: ${color};
        box-shadow: 0 0 ${size}px #FF9500,
                    0 0 ${size * 2}px rgba(255, 107, 53, 0.5);
        filter: blur(1px);
    `;

    document.body.appendChild(fire);
    setTimeout(() => fire.remove(), 600);
}

function createTouchBurst(x, y) {
    const burstCount = 12;

    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const angle = (360 / burstCount) * i;
            const distance = 20 + Math.random() * 15;
            const rad = angle * (Math.PI / 180);
            const targetX = x + Math.cos(rad) * distance;
            const targetY = y + Math.sin(rad) * distance;

            if (Math.random() > 0.5) {
                createTouchStar(targetX, targetY);
            } else {
                createTouchFire(targetX, targetY);
            }
        }, i * 20);
    }
}

// ===== Greeting Card Hover Effect =====
function initCardEffect() {
    const card = document.querySelector('.greeting-card');

    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
}

// ===== Dynamic Background Color Shift =====
function initBackgroundShift() {
    let hue = 270; // Start with purple

    setInterval(() => {
        hue = (hue + 0.1) % 360;
        const color1 = `hsl(${hue}, 80%, 10%)`;
        const color2 = `hsl(${hue + 20}, 60%, 20%)`;
        const color3 = `hsl(${hue + 40}, 70%, 15%)`;

        document.body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
    }, 100);
}

// ===== Initialize All Effects =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initParallax();
    initSparkles();
    initCardEffect();
    // Uncomment below for subtle background color animation
    // initBackgroundShift();

    // Add entrance animations with delays
    const elements = document.querySelectorAll('.candle');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';

        setTimeout(() => {
            el.style.transition = 'all 0.6s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 1200 + (index * 200));
    });
});

// ===== Console Easter Egg =====
console.log('%c✦ Cejna Rojîyên Êzî Pîroz Be! ✦',
    'color: #FFD700; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px #800020;');
console.log('%cMay the light of wisdom guide your path.',
    'color: #FFF8E7; font-size: 14px;');
