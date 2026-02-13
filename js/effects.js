/* ==========================================================================
   Effects - Efectos visuales (Confetti, lluvia de corazones, constelación)
   ========================================================================== */

/**
 * Lluvia de corazones continua de fondo
 */
function startHeartRain() {
    var heartsContainer = document.getElementById('hearts');
    if (!heartsContainer) return;

    var heartEmojis = ['💚', '♥️', '🌺', '🧣', '🌙', '🦉', '🍁'];
    var weights = [30, 30, 15, 5, 5, 5, 10]; // Probabilidades (💚 y ♥️ más comunes, 🍁 moderado)

    function getWeightedRandom() {
        var total = weights.reduce(function(a, b) { return a + b; }, 0);
        var random = Math.random() * total;
        var sum = 0;
        
        for (var i = 0; i < weights.length; i++) {
            sum += weights[i];
            if (random <= sum) return heartEmojis[i];
        }
        return heartEmojis[0];
    }

    function createFallingHeart() {
        var heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = getWeightedRandom();
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heart.style.opacity = Math.random() * 0.3 + 0.2; // Muy sutil
        heartsContainer.appendChild(heart);

        setTimeout(function() {
            heart.remove();
        }, 7000);
    }

    // Crear corazones continuamente
    setInterval(createFallingHeart, 800);
}

/**
 * Explosión de confetti (para el modal y abrazo virtual)
 */
function createConfetti(container, duration) {
    duration = duration || 3000;
    var confettiCount = 50;
    var confettiEmojis = ['💚', '♥️', '🌺', '🌙', '✨', '💫'];

    for (var i = 0; i < confettiCount; i++) {
        (function(index) {
            setTimeout(function() {
                var confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.innerHTML = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * 100 + '%';
                confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
                confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
                confetti.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
                confetti.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
                confetti.style.setProperty('--r', Math.random() * 720 + 'deg');
                
                container.appendChild(confetti);

                setTimeout(function() {
                    confetti.remove();
                }, 3000);
            }, index * 50);
        })(i);
    }
}

/**
 * Crear constelación de amor
 */
function createConstellation() {
    var header = document.querySelector('.header');
    if (!header) return;

    var constellation = document.createElement('div');
    constellation.className = 'love-constellation';

    // Crear estrellas
    for (var i = 0; i < 8; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        if (i === 3) { // Una estrella es una luna
            star.classList.add('moon-emoji');
            star.innerHTML = '🌙';
        }
        constellation.appendChild(star);
    }

    // Crear líneas conectando estrellas (formando un corazón)
    var lines = [
        {x1: 50, y1: 20, x2: 90, y2: 10, width: 45},
        {x1: 90, y1: 10, x2: 130, y2: 30, width: 50},
        {x1: 130, y1: 30, x2: 150, y2: 50, width: 30},
        {x1: 150, y1: 50, x2: 130, y2: 70, width: 30},
        {x1: 130, y1: 70, x2: 90, y2: 80, width: 50},
        {x1: 90, y1: 80, x2: 50, y2: 70, width: 50},
        {x1: 50, y1: 70, x2: 30, y2: 50, width: 30},
        {x1: 30, y1: 50, x2: 50, y2: 20, width: 30},
    ];

    lines.forEach(function(line, index) {
        var lineEl = document.createElement('div');
        lineEl.className = 'constellation-line';
        lineEl.style.left = line.x1 + 'px';
        lineEl.style.top = line.y1 + 'px';
        lineEl.style.width = line.width + 'px';
        
        var angle = Math.atan2(line.y2 - line.y1, line.x2 - line.x1) * 180 / Math.PI;
        lineEl.style.transform = 'rotate(' + angle + 'deg)';
        lineEl.style.animationDelay = (index * 0.2) + 's';
        
        constellation.appendChild(lineEl);
    });

    header.insertBefore(constellation, header.firstChild);
}

/**
 * Corazones flotando alrededor de los gatitos
 */
function addCatHearts() {
    var blackCat = document.querySelector('.decorative-cat');
    var whiteCat = document.querySelector('.decorative-white-cat');

    if (!blackCat || !whiteCat) return;

    function createFloatingHeart(parent, delay, emoji) {
        var heart = document.createElement('div');
        heart.className = 'floating-hearts-decoration';
        heart.innerHTML = emoji;
        heart.style.left = '50%';
        heart.style.bottom = '100%';
        heart.style.animationDelay = delay + 's';
        parent.appendChild(heart);

        setTimeout(function() {
            heart.remove();
        }, 3000);
    }

    // Corazones entre los gatitos
    setInterval(function() {
        createFloatingHeart(blackCat, 0, '♥️');      // Gato negro → corazón rojo
        createFloatingHeart(whiteCat, 0.5, '💚');   // Gato blanco → corazón verde
    }, 4000);
}

/**
 * Inicializar todos los efectos
 */
function initEffects() {
    startHeartRain();
    createConstellation();
    addCatHearts();
}

// CSS para falling hearts y confetti (se inyecta dinámicamente)
var effectsStyle = document.createElement('style');
effectsStyle.textContent = `
    .falling-heart {
        position: absolute;
        top: -50px;
        pointer-events: none;
        animation: fall linear forwards;
        z-index: 1;
    }

    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }

    .confetti-piece {
        position: absolute;
        pointer-events: none;
        animation: confettiFall ease-out forwards;
    }

    @keyframes confettiFall {
        0% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) rotate(var(--r));
        }
    }
`;
document.head.appendChild(effectsStyle);
