const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const profilePhoto = document.getElementById('profile-photo');
const photoFallback = document.getElementById('photo-fallback');
const contactForm = document.getElementById('contact-form');
const dynamicRole = document.getElementById('dynamic-role');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
  navLinks.forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light-theme');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  });
  if (document.body.classList.contains('light-theme')) {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

if (profilePhoto && photoFallback) {
  profilePhoto.addEventListener('error', () => {
    profilePhoto.style.display = 'none';
    photoFallback.style.display = 'grid';
  });
}

if (dynamicRole) {
  const roles = ['Software Developer', 'ML Engineer'];
  let roleIndex = 0;
  let isTyping = false;

  async function typeWriter(text, speed = 60) {
    dynamicRole.textContent = '';
    isTyping = true;
    for (let i = 0; i < text.length; i++) {
      dynamicRole.textContent += text[i];
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    isTyping = false;
  }

  async function deleteText(speed = 40) {
    isTyping = true;
    let text = dynamicRole.textContent;
    for (let i = text.length; i > 0; i--) {
      dynamicRole.textContent = text.substring(0, i - 1);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    isTyping = false;
  }

  async function cycleRoles() {
    while (true) {
      const currentRole = roles[roleIndex];
      await typeWriter(currentRole, 80);
      await new Promise(resolve => setTimeout(resolve, 2000));
      await deleteText(50);
      await new Promise(resolve => setTimeout(resolve, 300));
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  cycleRoles();
}

window.addEventListener('scroll', () => {
  const fromTop = window.scrollY + 90;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    const isActive = section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
    link.classList.toggle('active', isActive);
  });
});

const revealTargets = document.querySelectorAll('.skill-card, .card, .section-header, .about-highlights .highlight-card, .hero-grid > div');
revealTargets.forEach((element) => element.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((element) => revealObserver.observe(element));

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks for reaching out! I will get back to you soon.');
    contactForm.reset();
  });
}

const canvas = document.getElementById('particle-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
  let particles = [];
  let mouse = { x: null, y: null };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.min(110, Math.floor((canvas.width * canvas.height) / 17000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.7 + 0.5
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 120) {
          p.x += (dx / d) * 0.6;
          p.y += (dy / d) * 0.6;
        }
      }

      const isLight = document.body.classList.contains('light-theme');
      ctx.fillStyle = isLight ? 'rgba(47,107,255,0.5)' : 'rgba(141,178,255,0.55)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 95) {
          const a = (1 - dist / 95) * 0.18;
          ctx.strokeStyle = isLight ? `rgba(47,107,255,${a})` : `rgba(141,178,255,${a})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
}
