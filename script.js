// ===================================
// NAVIGATION & MOBILE MENU
// ===================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

function setActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===================================
// ROTATING ROLE ANIMATION
// ===================================

const roles = [
    'ML Engineer',
    'Software Developer',
    'Full-Stack Developer',
    'Problem Solver'
];

let currentRoleIndex = 0;
const rotatingRole = document.getElementById('rotating-role');

function typeWriter(text, element, delay = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }
    
    type();
}

function deleteText(element, delay = 50) {
    const text = element.textContent;
    let i = text.length;
    
    function deleteChar() {
        if (i > 0) {
            element.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(deleteChar, delay);
        } else {
            // Move to next role
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(() => typeWriter(roles[currentRoleIndex], rotatingRole, 100), 500);
        }
    }
    
    deleteChar();
}

function startRoleRotation() {
    typeWriter(roles[0], rotatingRole, 100);
    
    setInterval(() => {
        setTimeout(() => deleteText(rotatingRole, 50), 2000);
    }, 5000);
}

// Start rotation on page load
if (rotatingRole) {
    startRoleRotation();
}


// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SKILLS ANIMATION
// ===================================

const skillProgressBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillProgressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && !bar.classList.contains('animate')) {
            bar.style.setProperty('--progress-width', `${progress}%`);
            bar.style.width = `${progress}%`;
            bar.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===================================
// PARALLAX SCROLLING EFFECT
// ===================================

const heroShapes = document.querySelectorAll('.hero-shape');

function parallaxScroll() {
    const scrolled = window.pageYOffset;
    
    heroShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

window.addEventListener('scroll', debounce(parallaxScroll, 5));

// ===================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll(
    '.project-card, .cert-card, .skill-category, .highlight-card, .about-stats, .timeline-item'
);

animatedElements.forEach(el => observer.observe(el));

// ===================================
// CONTACT FORM VALIDATION & SUBMISSION
// ===================================

const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    return emailRegex.test(email.trim());
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    formGroup.classList.add('error');
    errorMessage.textContent = message;
}

// Clear error
function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
}

// Validate input on blur
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters');
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        clearError(emailInput);
    }
});

subjectInput.addEventListener('blur', () => {
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters');
    } else {
        clearError(subjectInput);
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters');
    } else {
        clearError(messageInput);
    }
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear all errors
    formGroups.forEach(group => group.classList.remove('error'));
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters');
        isValid = false;
    }
    
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.btn-submit');
    const formStatus = contactForm.querySelector('.form-status');
    
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Show success message
        formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
        formStatus.classList.add('success');
        formStatus.classList.remove('error');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.classList.remove('success');
        }, 5000);
    }, 2000);
});

// ===================================
// DOWNLOAD RESUME
// ===================================

const downloadResumeBtn = document.getElementById('download-resume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Open Jinee's resume in a new tab
    window.open('https://drive.google.com/file/d/1pUNu7v1PPphApADoZgRTqtsG4HhD1YZF/view?usp=sharing', '_blank');
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// TYPING EFFECT FOR HERO SECTION (OPTIONAL)
// ===================================

// Uncomment below if you want a typing effect for the hero role
/*
const roles = [
    'Frontend Developer',
    'Full-Stack Engineer',
    'ML Enthusiast',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroRole = document.querySelector('.hero-role');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        heroRole.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroRole.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let timeout = isDeleting ? deletingSpeed : typingSpeed;
    
    if (!isDeleting && charIndex === currentRole.length) {
        timeout = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    
    setTimeout(typeRole, timeout);
}

// Uncomment to start typing effect
// setTimeout(typeRole, 1000);
*/

// ===================================
// PROJECT CARDS HOVER EFFECT
// ===================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (target < 100 ? '+' : '%');
        }
    }
    
    updateCounter();
}

// Observe stat items
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const targetValue = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetValue);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statObserver.observe(stat);
});

// ===================================
// DARK MODE TOGGLE (OPTIONAL ENHANCEMENT)
// ===================================

// Uncomment below to add dark mode functionality
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.classList.add('dark-mode-toggle');
darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}
*/

// ===================================
// LAZY LOADING IMAGES (WHEN USING REAL IMAGES)
// ===================================

// Uncomment when you add real images
/*
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));
*/

// ===================================
// CONSOLE MESSAGE (EASTER EGG)
// ===================================

console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; color: #4a90e2; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'font-size: 14px; color: #50c878;');
console.log('%c📧 jineesingh1015@gmail.com', 'font-size: 12px; color: #666;');

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    setActiveNav();
    animateSkills();
}, 10));

// ===================================
// STAGGER ANIMATIONS FOR CARDS
// ===================================

function addStaggerAnimation() {
    const cards = document.querySelectorAll('.project-card, .cert-card, .skill-category');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===================================
// SMOOTH REVEAL ON SCROLL
// ===================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .about-text, .contact-info');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', debounce(revealOnScroll, 10));

// ===================================
// CURSOR TRAIL EFFECT (PREMIUM)
// ===================================

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

function createCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
        transition: transform 0.15s ease;
    `;
    document.body.appendChild(trail);
    return trail;
}

const cursorTrail = createCursorTrail();

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursorTrail.style.left = cursorX + 'px';
    cursorTrail.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Portfolio Loaded Successfully!', 'font-size: 16px; color: #667eea; font-weight: bold;');
    
    // Trigger initial animations
    animateSkills();
    setActiveNav();
    addStaggerAnimation();
    revealOnScroll();
    
    // Add loaded class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Preload animations
    const animatedSections = document.querySelectorAll('section');
    animatedSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.classList.add('skip-link');
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #4a90e2;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ===================================
// FORM AUTO-SAVE (OPTIONAL)
// ===================================

// Save form data to localStorage to prevent data loss
const formInputs = [nameInput, emailInput, subjectInput, messageInput];

formInputs.forEach(input => {
    // Load saved data
    const savedValue = localStorage.getItem(`contact-${input.id}`);
    if (savedValue) {
        input.value = savedValue;
    }
    
    // Save data on input
    input.addEventListener('input', () => {
        localStorage.setItem(`contact-${input.id}`, input.value);
    });
});

// Clear saved data on successful submission
contactForm.addEventListener('submit', () => {
    formInputs.forEach(input => {
        localStorage.removeItem(`contact-${input.id}`);
    });
});

// ===================================
// END OF SCRIPT
// ===================================
