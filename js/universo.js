// Configuración inicial del Canvas
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

// Ajustar tamaño del canvas
const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars(); // Reiniciar estrellas al cambiar tamaño
};

// Clase Estrella
class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5; // Movimiento lento aleatorio
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.brightness = Math.random();
        this.twinkleFactor = (Math.random() - 0.5) * 0.02; // Velocidad de parpadeo
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebotar en bordes (o aparecer por el otro lado)
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Parpadeo
        this.brightness += this.twinkleFactor;
        if (this.brightness > 1 || this.brightness < 0.2) {
            this.twinkleFactor = -this.twinkleFactor;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Inicializar estrellas
const initStars = () => {
    stars = [];
    const starCount = Math.floor((width * height) / 3000); // Densidad basada en pantalla
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
};

// Loop de animación
const animate = () => {
    ctx.clearRect(0, 0, width, height);

    // Fondo degradado sutil
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#000000");
    gradient.addColorStop(1, "#0a0a2a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
};

// Listeners
window.addEventListener('resize', resizeCanvas);

// Iniciar
resizeCanvas();
animate();
