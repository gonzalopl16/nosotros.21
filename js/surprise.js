/* ==========================================================================
   Surprise - Logica del modal de sorpresa y corazones flotantes
   ========================================================================== */

/**
 * Muestra el modal de sorpresa con corazones y confetti
 */
var savedScrollPosition = 0;

function showSurprise() {
    const modal = document.getElementById('surpriseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    // Cargar contenido desde data.js
    modalTitle.textContent = valentineMessage.title;
    modalMessage.innerHTML = valentineMessage.content;
    
    // Bloquear scroll del body (guardar posición para restaurar después)
    savedScrollPosition = window.scrollY;
    document.body.classList.add('modal-open');
    document.body.style.top = '-' + savedScrollPosition + 'px';
    
    modal.style.display = 'block';
    createHearts();
    createConfetti();  // Añadir confetti al abrir
    stopSlideshow();
}

/**
 * Cierra el modal de sorpresa
 */
function closeSurprise() {
    document.getElementById('surpriseModal').style.display = 'none';
    document.getElementById('hearts').innerHTML = '';
    
    // Restaurar scroll del body
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, savedScrollPosition);
    
    startSlideshow();
}

/**
 * Crea corazones flotantes animados
 */
function createHearts() {
    var heartsContainer = document.getElementById('hearts');
    var symbols = surpriseConfig.heartSymbols;
    var count = surpriseConfig.heartCount;
    var delay = surpriseConfig.heartDelay;
    var lifetime = surpriseConfig.heartLifetime;

    for (var i = 0; i < count; i++) {
        (function (index) {
            setTimeout(function () {
                var heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 2 + 's';
                heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
                heartsContainer.appendChild(heart);

                setTimeout(function () {
                    heart.remove();
                }, lifetime);
            }, index * delay);
        })(i);
    }
}

/**
 * Inicializa los event listeners de la sorpresa
 */
function initSurprise() {
    // Boton de sorpresa
    var surpriseBtn = document.getElementById('surpriseBtn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', showSurprise);
    }

    // Boton de cerrar modal
    var closeBtn = document.getElementById('closeBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSurprise);
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function (event) {
        var modal = document.getElementById('surpriseModal');
        if (event.target === modal) {
            closeSurprise();
        }
    });
}
