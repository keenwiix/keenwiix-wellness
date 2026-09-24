// ============================================
// KEENWIIX WELLNESS — INTERACTIONS
// ============================================

(function () {
    'use strict';

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ==========================================
    // MOBILE MENU
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.style.overflow = isActive ? 'hidden' : '';
            hamburger.setAttribute('aria-expanded', isActive);
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ==========================================
    // SMOOTH SCROLL (anchor links)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href.length < 2) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // SCROLL PROGRESS
    // ==========================================
    const progressBtn = document.querySelector('.scroll-progress');
    if (progressBtn) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = maxHeight > 0 ? Math.round((scrolled / maxHeight) * 100) : 0;

            progressBtn.textContent = percentage + '%';
            progressBtn.classList.toggle('visible', scrolled > 500);
        }, { passive: true });

        progressBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // REVEAL ANIMATIONS ON SCROLL
    // ==========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const animatableSelectors = [
            '.ritual-card',
            '.practice-row',
            '.app-side-item',
            '.faq-item'
        ];

        const elements = document.querySelectorAll(animatableSelectors.join(','));

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, (index % 4) * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => revealObserver.observe(el));
    } else {
        document.querySelectorAll('.ritual-card, .practice-row, .app-side-item, .faq-item').forEach(el => {
            el.classList.add('animate');
        });
    }

    // ==========================================
    // NUMBER COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1800;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(target * eased);

            el.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    if (counters.length && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(el => counterObserver.observe(el));
    } else {
        counters.forEach(el => {
            el.textContent = el.getAttribute('data-count');
        });
    }

    // ==========================================
    // FAQ ACCORDION — закрываем другие
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // ==========================================
    // MEMBERSHIP TABS
    // ==========================================
    const membershipData = {
        free: {
            name: 'Free',
            price: 'Free',
            period: '',
            desc: 'Perfect for getting started with daily mindfulness.',
            features: [
                'Mood tracking',
                '5 guided meditations',
                'Basic habit tracking',
                'Daily check-ins',
                'Community access'
            ],
            cta: 'Get started',
            ctaLink: 'https://t.me/keenwiix',
            ctaClass: 'btn-outline'
        },
        premium: {
            name: 'Premium',
            price: '$9',
            period: '/mo',
            desc: 'For those who want the full Keenwiix experience.',
            features: [
                'Everything in Free',
                '200+ guided meditations',
                'Sleep insights',
                'Advanced habit tracking',
                'Priority support',
                'Offline access'
            ],
            cta: 'Choose Premium',
            ctaLink: 'https://t.me/keenwiix',
            ctaClass: 'btn-primary'
        },
        family: {
            name: 'Family',
            price: '$15',
            period: '/mo',
            desc: 'Up to 5 accounts. Share the calm with the people you love.',
            features: [
                'Everything in Premium',
                'Up to 5 accounts',
                'Family insights',
                'Shared habits',
                'Family meditations',
                'Dedicated support'
            ],
            cta: 'Contact us',
            ctaLink: 'https://t.me/keenwiix',
            ctaClass: 'btn-outline'
        }
    };

    const membershipPanel = document.getElementById('membership-panel');
    const membershipTabs = document.querySelectorAll('.mem-tab');

    const renderMembership = (planKey) => {
        const plan = membershipData[planKey];
        if (!plan || !membershipPanel) return;

        membershipPanel.innerHTML = `
            <div class="mem-info">
                <span class="mem-name">${plan.name}</span>
                <div class="mem-price">
                    <span class="mem-price-amount">${plan.price}</span>
                    ${plan.period ? `<span class="mem-price-period">${plan.period}</span>` : ''}
                </div>
                <p class="mem-desc">${plan.desc}</p>
                <div class="mem-action">
                    <a href="${plan.ctaLink}" target="_blank" rel="noopener" class="${plan.ctaClass}">
                        ${plan.cta}
                    </a>
                </div>
            </div>
            <ul class="mem-features">
                ${plan.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
            </ul>
        `;
    };

    if (membershipTabs.length && membershipPanel) {
        // Initial render
        renderMembership('premium');

        membershipTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                membershipTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderMembership(tab.dataset.plan);
            });
        });
    }

    // ==========================================
    // TESTIMONIAL SLIDER
    // ==========================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoRotateTimer = null;

    const showSlide = (index) => {
        if (index < 0) index = testimonialSlides.length - 1;
        if (index >= testimonialSlides.length) index = 0;

        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentSlide = index;
    };

    const startAutoRotate = () => {
        if (testimonialSlides.length < 2) return;
        autoRotateTimer = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 6000);
    };

    const resetAutoRotate = () => {
        if (autoRotateTimer) {
            clearInterval(autoRotateTimer);
            autoRotateTimer = null;
        }
        startAutoRotate();
    };

    if (testimonialSlides.length && testimonialDots.length) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoRotate();
            });
        });

        startAutoRotate();
    }

    // ==========================================
    // PHONE METRIC BARS ANIMATION
    // ==========================================
    const metricBars = document.querySelectorAll('.ph-metric-bar span');

    if (metricBars.length) {
        metricBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            bar.style.transition = 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
        });

        if ('IntersectionObserver' in window) {
            const phoneObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        metricBars.forEach((bar, i) => {
                            setTimeout(() => {
                                bar.style.width = bar.dataset.target || bar.style.width;
                            }, i * 150);
                        });
                        phoneObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            const phoneMockup = document.querySelector('.phone-mockup');
            if (phoneMockup) phoneObserver.observe(phoneMockup);
        }
    }

    // ==========================================
    // ACTIVE NAV LINK BASED ON SCROLL POSITION
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = Array.from(navLinks)
        .map(link => {
            const id = link.getAttribute('href');
            return { link, section: document.querySelector(id) };
        })
        .filter(item => item.section);

    if (sections.length) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 150;

            sections.forEach(({ link, section }) => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                if (scrollPos >= top && scrollPos < bottom) {
                    link.style.color = 'var(--text)';
                } else {
                    link.style.color = '';
                }
            });
        }, { passive: true });
    }

    // ==========================================
    // CONSOLE SIGNATURE
    // ==========================================
    console.log(
        '%cKeenwiix Wellness',
        'font-family: "Alex Brush", cursive; font-size: 28px; color: #F5F5F5; padding: 8px;'
    );
    console.log(
        '%cSlow down. Find your calm.',
        'font-family: Inter, sans-serif; font-size: 12px; color: #A0A0A0;'
    );

})();