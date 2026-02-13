/* ==========================================================================
   Slideshow - Logica del carrusel de fotos
   ========================================================================== */

let currentSlide = 0;
let totalSlides = 0;
let slideInterval = null;

/**
 * Genera los slides dinamicamente desde slidesData (definido en data.js)
 */
function createSlides() {
    const slideshow = document.getElementById('slideshow');
    slideshow.innerHTML = '';

    slidesData.forEach(function (slide, index) {
        const slideEl = document.createElement('div');
        slideEl.className = 'slide' + (index === 0 ? ' active' : '');
        slideEl.style.backgroundImage = "url('" + slide.image + "')";

        slideEl.innerHTML =
            '<div class="slide-overlay">' +
                '<div class="slide-text">' + slide.quote + '</div>' +
                '<div class="slide-caption">' + slide.caption + '</div>' +
            '</div>';

        slideshow.appendChild(slideEl);
    });

    totalSlides = slidesData.length;
}

/**
 * Crea los dots de navegacion
 */
function createDots() {
    var dotsContainer = document.getElementById('dotsContainer');
    dotsContainer.innerHTML = '';

    for (var i = 0; i < totalSlides; i++) {
        var dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', function () {
            goToSlide(parseInt(this.getAttribute('data-index')));
        });
        dotsContainer.appendChild(dot);
    }
}

/**
 * Cambia al slide siguiente o anterior
 * @param {number} direction - 1 para siguiente, -1 para anterior
 */
function changeSlide(direction) {
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.dot');

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

/**
 * Va directamente a un slide especifico
 * @param {number} slideIndex - Indice del slide (0-based)
 */
function goToSlide(slideIndex) {
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.dot');

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = slideIndex;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

/**
 * Inicia el auto-play del slideshow
 */
function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(function () {
        changeSlide(1);
    }, slideshowConfig.autoPlayInterval);
}

/**
 * Detiene el auto-play del slideshow
 */
function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

/**
 * Inicializa el slideshow completo
 */
function initSlideshow() {
    createSlides();
    createDots();
    startSlideshow();

    // Pausar al hacer hover sobre la galeria
    var galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', stopSlideshow);
        galleryContainer.addEventListener('mouseleave', startSlideshow);
    }
}
