document.addEventListener('DOMContentLoaded', () => {
    // === REPRODUCTOR DE MÚSICA ===
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-pause-btn');
    const playIcon = playBtn.querySelector('span'); // El emoji o icono
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const musicTitle = document.querySelector('.music-title');

    let isPlaying = false;

    // Intentar reproducir automáticamente (los navegadores suelen bloquear esto sin interacción)
    // audio.play().catch(error => console.log("Autoplay bloqueado, esperando interacción."));

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playIcon.textContent = '🎵'; // Icono de nota (pausa/inactivo)
            musicTitle.textContent = "Haz clic para reproducir";
        } else {
            audio.play();
            playIcon.textContent = '⏸'; // Icono de pausa
            musicTitle.textContent = "Howl's Moving Castle"; // O el título real
        }
        isPlaying = !isPlaying;
    });

    // Actualizar barra de progreso
    audio.addEventListener('timeupdate', (e) => {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    });

    // Clic en la barra de progreso
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    // === ANIMACIONES ON SCROLL (REVEAL) ===
    const revealElements = document.querySelectorAll('.section, .hero-content');

    // Añadir clase inicial
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            } else {
                // Opcional: quitar la clase para que se anime cada vez
                // el.classList.remove('active'); 
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);

    // Disparar una vez al inicio para elementos ya visibles
    revealOnScroll();

    // Efecto Parallax muy sutil para las nubes al hacer scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const clouds1 = document.querySelector('.clouds-1');
        const clouds2 = document.querySelector('.clouds-2');

        if (clouds1) clouds1.style.transform = `translateX(${scrolled * 0.1}px)`;
        if (clouds2) clouds2.style.transform = `translateX(-${scrolled * 0.2}px)`;
    });

    // === CARRUSEL ===
    const track = document.querySelector('.carousel-track');
    // Verificar si existe el carrusel antes de añadir lógica
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        const dotsNav = document.querySelector('.carousel-nav');
        const dots = Array.from(dotsNav.children);

        const slideWidth = slides[0].getBoundingClientRect().width;

        // Alinear slides uno al lado del otro
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        const updateDots = (currentDot, targetDot) => {
            currentDot.classList.remove('current-slide');
            targetDot.classList.add('current-slide');
        };

        // Click next
        nextButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling || slides[0]; // Loop al inicio
            const currentDot = dotsNav.querySelector('.current-slide');
            const nextDot = currentDot.nextElementSibling || dots[0]; // Loop al inicio

            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        });

        // Click prev
        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1]; // Loop al final
            const currentDot = dotsNav.querySelector('.current-slide');
            const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];

            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
        });

        // Click dots
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');

            if (!targetDot) return;

            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(track, currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
        });

        // Auto-play opcional
        setInterval(() => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling || slides[0];
            const currentDot = dotsNav.querySelector('.current-slide');
            const nextDot = currentDot.nextElementSibling || dots[0];

            // Solo avanzar si el usuario no está interactuando (opcional, aquí avanza siempre)
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        }, 5000); // Cambio cada 5 segundos
    }
});
