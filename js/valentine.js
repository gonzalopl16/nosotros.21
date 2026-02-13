/* ==========================================================================
   Valentine - Lógica de elementos interactivos de San Valentín
   ========================================================================== */

/**
 * Abrazo Virtual
 */
// Variable global para controlar el estado de la animación
var hugAnimationActive = false;

function toggleHugAnimation() {
    var hugContainer = document.getElementById('hugContainer');
    var hugBtn = document.getElementById('hugBtn');
    
    if (!hugContainer || !hugBtn) return;

    if (!hugAnimationActive) {
        // Activar animación
        showHugAnimation();
        hugBtn.innerHTML = 'Gracias mi pequeña ♥️';
        hugBtn.classList.add('active');
        hugAnimationActive = true;
    } else {
        // Desactivar animación
        closeHugAnimation();
        hugBtn.innerHTML = 'Un abrazo psicológico 🧣🌙';
        hugBtn.classList.remove('active');
        hugAnimationActive = false;
    }
}

function showHugAnimation() {
    var hugContainer = document.getElementById('hugContainer');
    if (!hugContainer) return;

    hugContainer.classList.add('active');
    
    // Hacer que los gatitos se acerquen
    var blackCat = document.querySelector('.decorative-cat');
    var whiteCat = document.querySelector('.decorative-white-cat');
    
    if (blackCat) {
        blackCat.style.transition = 'left 2s ease-out';
        blackCat.style.left = '60px';
    }
    if (whiteCat) {
        whiteCat.style.transition = 'left 2s ease-out';
        whiteCat.style.left = '70px';
    }

    // Confetti después de 2 segundos (cuando se abrazan)
    setTimeout(function() {
        createConfetti(hugContainer, 3000);
    }, 2000);

    // Pausar slideshow
    stopSlideshow();
}

function closeHugAnimation() {
    var hugContainer = document.getElementById('hugContainer');
    if (!hugContainer) return;

    hugContainer.classList.remove('active');

    // Regresar gatitos a posición original
    var blackCat = document.querySelector('.decorative-cat');
    var whiteCat = document.querySelector('.decorative-white-cat');
    
    if (blackCat) blackCat.style.left = '20px';
    if (whiteCat) whiteCat.style.left = '110px';

    // Reanudar slideshow
    startSlideshow();
}

/**
 * Easter Egg de la Luna 🌙
 */
var moonClickCount = 0;
var moonClickTimer = null;

function handleMoonClick() {
    moonClickCount++;

    if (moonClickTimer) clearTimeout(moonClickTimer);

    moonClickTimer = setTimeout(function() {
        moonClickCount = 0;
    }, 2000); // Reset después de 2 segundos sin clicks

    if (moonClickCount >= 3) {
        showMoonEasterEgg();
        moonClickCount = 0;
    }
}

function showMoonEasterEgg() {
    var moonEgg = document.getElementById('moonEasterEgg');
    if (!moonEgg) return;

    moonEgg.classList.add('active');
    
    // Crear fuegos artificiales de corazones
    setTimeout(function() {
        for (var i = 0; i < 5; i++) {
            setTimeout(function() {
                createFirework(moonEgg);
            }, i * 500);
        }
    }, 1000);

    // Agregar evento de click para crear fuegos artificiales donde se haga click
    moonEgg.addEventListener('click', handleFireworkClick);

    // Pausar slideshow
    stopSlideshow();
}

function closeMoonEasterEgg() {
    var moonEgg = document.getElementById('moonEasterEgg');
    if (!moonEgg) return;

    moonEgg.classList.remove('active');
    // Remover el event listener
    moonEgg.removeEventListener('click', handleFireworkClick);
    startSlideshow();
}

function handleFireworkClick(e) {
    // Crear fuegos artificiales en la posición del click
    createFireworkAt(e.clientX, e.clientY, e.currentTarget);
}

function createFirework(container) {
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;
    createFireworkAt(centerX, centerY, container);
}

function createFireworkAt(x, y, container) {
    var fireworkEmojis = ['✨', '💫', '⭐', '💚', '♥️'];

    for (var i = 0; i < 12; i++) {
        var particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.innerHTML = fireworkEmojis[Math.floor(Math.random() * fireworkEmojis.length)];
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = '20px';
        particle.style.pointerEvents = 'none';
        
        var angle = (i * 30) * Math.PI / 180;
        var distance = 100 + Math.random() * 100;
        var tx = Math.cos(angle) * distance;
        var ty = Math.sin(angle) * distance;
        
        particle.style.animation = 'fireworkExplode 1s ease-out forwards';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(particle);

        setTimeout(function(p) {
            p.remove();
        }, 1000, particle);
    }
}

// CSS para firework
var fireworkStyle = document.createElement('style');
fireworkStyle.textContent = `
    @keyframes fireworkExplode {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(0);
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(1);
        }
    }
`;
document.head.appendChild(fireworkStyle);

/**
 * Búho con mensaje
 */
function handleOwlClick() {
    var owl = document.querySelector('.decorative-owl');
    if (!owl) return;

    owl.classList.add('clicked');
    
    setTimeout(function() {
        owl.classList.remove('clicked');
    }, 3000);
}

/**
 * Título dinámico de la página
 */
function startDynamicTitle() {
    var titles = [
        'Feliz San Valentín',
        'Nosotros',
    ];
    var currentIndex = 0;

    setInterval(function() {
        currentIndex = (currentIndex + 1) % titles.length;
        document.title = titles[currentIndex];
    }, 3000);
}

/**
 * Detectar elementos con emoji 🌙 para el easter egg
 */
function setupMoonClickDetection() {
    // Detectar clicks en cualquier elemento que contenga 🌙
    document.addEventListener('click', function(e) {
        var text = e.target.textContent || e.target.innerText;
        if (text && text.includes('🌙')) {
            handleMoonClick();
        }
    });
}

/**
 * Inicializar interacciones de San Valentín
 */
function initValentine() {
    // Botón de abrazo virtual
    var hugBtn = document.getElementById('hugBtn');
    if (hugBtn) {
        hugBtn.addEventListener('click', toggleHugAnimation);
    }

    // Cerrar moon easter egg
    var moonClose = document.getElementById('moonClose');
    if (moonClose) {
        moonClose.addEventListener('click', closeMoonEasterEgg);
    }

    // Búho clickeable
    var owl = document.querySelector('.decorative-owl');
    if (owl) {
        owl.addEventListener('click', handleOwlClick);
    }

    // Setup moon click detection
    setupMoonClickDetection();

    // Título dinámico
    startDynamicTitle();
}
