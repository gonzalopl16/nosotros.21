/* ==========================================================================
   Data - Datos de slides y contenido configurable - San Valentín 💚🌙
   
   Para agregar una nueva foto:
   1. Coloca la imagen en la carpeta img/
   2. Agrega un nuevo objeto al array slidesData
   3. Listo! El slideshow se actualiza automaticamente
   ========================================================================== */

const slidesData = [
    {
        image: 'img/slide-1.jpg',
        quote: '"El amor no se mira, se siente"',
        caption: "Gracias por ser mi lugar seguro :'",
    },
    {
        image: 'img/slide-2.jpg',
        quote: '"Contigo, cada día es una aventura"',
        caption: 'Momentos de risas y complicidad',
    },
    {
        image: 'img/slide-3.png',
        quote: '"Bailando bajo las estrellas"',
        caption: 'Nuestras noches siempre son mágicas',
    },
    {
        image: 'img/slide-4.jpg',
        quote: '"Una sonrisa tuya es mi medicina para todo"',
        caption: 'Regalame tus sonrisas',
    },
    {
        image: 'img/slide-5.jpg',
        quote: '"5 años y toda una vida por delante"',
        caption: 'Un nuevo día nos aguarda :3',
    },
];

/* Mensaje de San Valentín */
const valentineMessage = {
    title: 'Para ti, Mishi 💚',
    content: `Ohayo Mishi! 🐈

Sé que hoy es un día especial y me hubiera encantado pasarlo contigo, comiendo algo rico, abrazándote y viendo tus ojitos brillar xd. Pero bueno, a veces la vida nos pone en situaciones donde no podemos estar juntos físicamente, y pues F xd🧣

Pero quiero que sepas algo importante: aunque yo esté lejos, cada pensamiento mío viaja hasta ti 💚. Imagínate que este sitio es como una carta digital que hice para ti, porque eres mui importante para mi 🌙

No sabía si tendríamos un San Valentín juntos, pero aquí estamos, celebrando nuestro primer 14 de febrero digital xd, hagamos como khe el 21 de Febrero es San valentin xd. 🐈‍⬛

Gracias por ser mi compañera, mi mejor amiga, mi cómplice de aventuras y la dueña de mi corazón 💚. Te mando todos mis abrazos psicológicos, todos los besos que no te puedo dar hoy, y todo mi amor desde donde estoy 🌺

Espérame tantito, que cuando regrese te wuacer mimos 🧣

Mientras tanto, Federico te va a cuidar por mí 🦉🌙

Con todo mi lof
Tu mishi nazi💚♥️

PD: Presiona a Fede tiene un histerec xd 🌙
PD2: Intenta hacer click 3 veces en cualquier 🌙 que veas... `,
    closeButton: 'Con todo mi love 💚'
};

/* Configuracion de la sorpresa */
const surpriseConfig = {
    heartSymbols: ['💕', '💖', '💗', '💝', '💘', '❤️', '💙', '💜'],
    heartCount: 30,           // Más corazones para San Valentín
    heartDelay: 150,          // ms entre cada corazon
    heartLifetime: 7000,      // ms que dura cada corazon
};

/* Configuracion del slideshow */
const slideshowConfig = {
    autoPlayInterval: 4000, // ms entre slides
};
