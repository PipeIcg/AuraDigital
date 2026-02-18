// =====================================================
// AURA DIGITAL - JAVASCRIPT INTERACTIVO
// Partículas, animaciones, flip cards, scroll effects
// =====================================================

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initFlipCards();
    initSmoothScroll();
    initContactForm();
});

// ===== SISTEMA DE PARTÍCULAS =====
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth > 768 ? 50 : 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Delay y duración aleatorios
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';

        // Tamaño aleatorio
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particlesContainer.appendChild(particle);
    }
}

// ===== NAVBAR STICKY =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
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
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    const links = menu.querySelectorAll('.mobile-nav-link');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');

        // Animación del botón hamburguesa
        const spans = toggle.querySelectorAll('span');
        if (menu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Cerrar menú al hacer click en un link
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ===== SCROLL ANIMATIONS (INTERSECTION OBSERVER) =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que deben animarse al scroll
    const animatedElements = document.querySelectorAll('.glass-card, .portfolio-item, .skill-item');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ===== CONTADORES ANIMADOS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, observerOptions);

    if (counters.length > 0) {
        observer.observe(counters[0].parentElement.parentElement);
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// ===== FLIP CARDS (MOBILE: TAP PARA FLIP) =====
function initFlipCards() {
    if (window.innerWidth <= 767) {
        const flipCards = document.querySelectorAll('.service-card-flip');

        flipCards.forEach(card => {
            card.addEventListener('click', function (e) {
                // Evitar que el click se propague
                e.stopPropagation();

                // Toggle de la clase flipped
                this.classList.toggle('flipped');
            });
        });

        // Cerrar cards al hacer click fuera
        document.addEventListener('click', () => {
            const flipCards = document.querySelectorAll('.service-card-flip.flipped');
            flipCards.forEach(card => {
                card.classList.remove('flipped');
            });
        });
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ignorar links vacíos
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const offsetTop = target.offsetTop - 80; // Offset para el navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX SUAVE (OPCIONAL) =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.sphere-container');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== DEBOUNCE UTILITY =====
function debounce(func, wait) {
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

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Reiniciar flip cards en mobile
    if (window.innerWidth <= 767) {
        initFlipCards();
    }
}, 250));

// ===== PRELOAD IMAGES (OPCIONAL) =====
function preloadImages() {
    const images = [
        'images/logo.png',
        'images/hero_visual.png',
        'images/service_seo.png',
        'images/service_webdev.png',
        'images/service_wordpress.png',
        'images/service_api.png',
        'images/service_backend.png',
        'images/service_frontend.png'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ===== EASTER EGG: CURSOR PERSONALIZADO (OPCIONAL) =====
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #A855F7;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });

    // Agrandar cursor en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .glass-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// Descomentar para activar cursor personalizado
// initCustomCursor();

// ===== FORMULARIO DE CONTACTO =====
const WEBHOOK_URL = 'https://auradigitalcl.app.n8n.cloud/webhook/0e5e4277-6e2b-4993-84ee-30b3953c8803';

function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Recoger todos los campos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validación de campos obligatorios
        if (!data.nombre || !data.email || !data.servicio || !data.mensaje) {
            showFormMessage('Por favor completa todos los campos obligatorios.', 'error');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Por favor ingresa un email válido.', 'error');
            return;
        }

        // Validar aceptación de privacidad
        if (!data.privacidad) {
            showFormMessage('Debes aceptar la política de privacidad.', 'error');
            return;
        }

        // Deshabilitar botón mientras se envía
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = 'Enviando... ⏳';

        // Payload JSON con todos los campos + metadatos
        const payload = {
            nombre: data.nombre || '',
            empresa: data.empresa || '',
            email: data.email || '',
            telefono: data.telefono || '',
            servicio: data.servicio || '',
            mensaje: data.mensaje || '',
            privacidad: data.privacidad === 'on',
            origen: window.location.href,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            showFormMessage('¡Mensaje enviado correctamente! Te responderé pronto. 🎉', 'success');
            form.reset();
            console.log('📧 Datos enviados al webhook:', payload);

        } catch (error) {
            console.error('Error al enviar al webhook:', error);
            showFormMessage('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);

    // Scroll suave al mensaje
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

console.log('🚀 Aura Digital - Landing Page cargada correctamente');
console.log('💜 Desarrollado con amor y código limpio');
