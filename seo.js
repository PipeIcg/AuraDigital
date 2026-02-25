/**
 * CASVA DIGITAL - SEO Page Script
 * Lógica adicional específica de la landing SEO
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===== FORMULARIO SEO =====
    const seoForm = document.getElementById('seoContactForm');
    const seoFormMessage = document.getElementById('seoFormMessage');
    const seoSubmitBtn = document.getElementById('seoSubmitBtn');

    if (seoForm) {
        seoForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalText = seoSubmitBtn.innerHTML;
            seoSubmitBtn.innerHTML = 'Enviando... <span class="btn-arrow">⏳</span>';
            seoSubmitBtn.disabled = true;
            seoSubmitBtn.style.opacity = '0.7';

            const formData = new FormData(seoForm);
            const data = {
                nombre: formData.get('nombre'),
                empresa: formData.get('empresa'),
                email: formData.get('email'),
                telefono: formData.get('telefono') || 'No indicado',
                web: formData.get('web'),
                plan: formData.get('plan') || 'No especificado',
                mensaje: formData.get('mensaje'),
                origen: 'Landing SEO - Casva Digital',
                fecha: new Date().toISOString(),
            };

            try {
                const WEBHOOK_URL = 'https://auradigitalcl.app.n8n.cloud/webhook/7ee56726-c897-4e20-8577-1ec52f18dfe1';

                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok || response.status === 200 || response.status === 204) {
                    seoFormMessage.className = 'form-message success';
                    seoFormMessage.textContent = '✅ ¡Solicitud recibida! Te contactaremos en menos de 24 horas para preparar tu diagnóstico SEO.';
                    seoForm.reset();
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            } catch (error) {
                seoFormMessage.className = 'form-message error';
                seoFormMessage.textContent = '❌ Hubo un problema al enviar. Por favor escríbenos directamente a hola@casvadigital.com';
            } finally {
                seoSubmitBtn.innerHTML = originalText;
                seoSubmitBtn.disabled = false;
                seoSubmitBtn.style.opacity = '1';

                seoFormMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                setTimeout(() => {
                    seoFormMessage.className = 'form-message';
                    seoFormMessage.textContent = '';
                }, 8000);
            }
        });
    }

    // ===== ANIMACIÓN DE BARRAS DEL CHART =====
    const animateChartBars = () => {
        const bars = document.querySelectorAll('.chart-bar, .mini-bar');
        bars.forEach((bar, i) => {
            bar.style.transition = `height 1s ease ${i * 0.1}s`;
        });
    };

    // Intersection Observer para animar elementos al entrar en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Animar chart bars al ver el mockup
                if (entry.target.classList.contains('google-mockup') ||
                    entry.target.classList.contains('metricas-dashboard')) {
                    animateChartBars();
                }

                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos animables
    const animatableElements = document.querySelectorAll(
        '.problema-card, .fase-card, .plan-card, .metrica-item, .solucion-stat, .google-mockup, .metricas-dashboard'
    );

    animatableElements.forEach(el => {
        animationObserver.observe(el);
    });

    // ===== SCROLL SUAVE PARA LINKS INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });

                // Cerrar menú móvil si está abierto
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu?.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
});
