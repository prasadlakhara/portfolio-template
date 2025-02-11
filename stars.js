const canvas = document.getElementById('dustCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 100;
const particleSpeed = 0.0000001;

// Cache canvas dimensions
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// Cache mouse position
let mouseX = canvasWidth / 2;
let mouseY = canvasHeight / 2;

// Throttle mousemove event
let ticking = false;
window.addEventListener('mousemove', (event) => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      ticking = false;
    });
    ticking = true;
  }
});

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = Math.random() * 2;
    this.xSpeed = (Math.random() - 0.5) * particleSpeed;
    this.ySpeed = (Math.random() - 0.5) * particleSpeed;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.life = Math.random() * 100 + 100;
  }

  update() {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.hypot(dx, dy); // More efficient than Math.sqrt

    const maxSpeed = 0.5;
    // Avoid division by zero
    if (distance > 0) {
      const moveX = (dx / distance) * maxSpeed;
      const moveY = (dy / distance) * maxSpeed;
      this.x += moveX;
      this.y += moveY;
    }

    this.life--;

    // Wrap around screen edges
    if (this.x < 0) this.x = canvasWidth;
    else if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    else if (this.y > canvasHeight) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

// Create particle pool
const particlePool = Array.from({ length: maxParticles }, () => new Particle());
let activeParticles = 0;

function createParticle() {
  if (activeParticles < maxParticles) {
    particlePool[activeParticles].reset();
    activeParticles++;
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = activeParticles - 1; i >= 0; i--) {
    const particle = particlePool[i];
    particle.update();
    particle.draw();

    if (particle.life <= 0) {
      // Move last active particle to this position
      activeParticles--;
      if (i < activeParticles) {
        particlePool[i] = particlePool[activeParticles];
      }
    }
  }

  createParticle();
  requestAnimationFrame(animateParticles);
}

// Handle resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
});

animateParticles();
