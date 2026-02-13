/* ==========================================================================
   Main - Inicializacion y event listeners globales
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar slideshow
    initSlideshow();

    // Inicializar sorpresa
    initSurprise();

    // Inicializar efectos Valentine
    initEffects();

    // Inicializar funciones Valentine (hug, moon easter egg, owl)
    initValentine();

    // Navegacion con teclado
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (event.key === 'ArrowRight') {
            changeSlide(1);
        } else if (event.key === 'Escape') {
            closeSurprise();
            // Cerrar también hug animation si está abierta
            const hugContainer = document.getElementById('hugContainer');
            if (hugContainer && hugContainer.classList.contains('active')) {
                toggleHugAnimation();
            }
        }
    });

    // Navegacion prev/next con botones
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            changeSlide(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            changeSlide(1);
        });
    }
});
