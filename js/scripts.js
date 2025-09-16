(function () {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })

    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        const splash = document.getElementById('splash');
        const part1Container = document.getElementById('splash-part1');
        const part2Container = document.getElementById('splash-part2');
        const splashText = document.getElementById('splash-text');
        const text1 = 'CoderHub.';
        const text2 = 'run';
        let index = 0;

        function writeText(text, container, delay, done) {
            let i = 0;
            const iv = setInterval(() => {
                if (i < text.length) {
                    const span = document.createElement('span');
                    span.className = 'letter';
                    span.textContent = text[i];
                    container.appendChild(span);
                    i++;
                } else {
                    clearInterval(iv);
                    if (done) done();
                }
            }, delay);
        }

        if (splash && part1Container && part2Container && splashText) {
            writeText(text1, part1Container, 150, () => {
                writeText(text2, part2Container, 150, () => {
                    setTimeout(() => {
                        splashText.classList.add('second-animation');
                        setTimeout(() => {
                            splash.classList.add('hide');
                            setTimeout(() => splash.style.display = 'none', 500);
                        }, 800);
                    }, 500);
                });
            });
        }

        if (document.getElementById('fullpage')) {
            let fullpageInstance;
            fullpageInstance = new fullpage('#fullpage', {
                licenseKey: 'YOUR_KEY_HERE',
                credits: { enabled: false, label: 'Made with fullPage.js', position: 'right' },
                navigation: true,
                navigationPosition: 'right',
                navigationTooltips: [],
                showActiveTooltip: false,

                scrollingSpeed: 700,
                autoScrolling: true,
                fitToSection: true,
                fitToSectionDelay: 1000,
                scrollBar: false,
                easing: 'easeInOutCubic',
                easingcss3: 'ease',

                keyboardScrolling: true,
                animateAnchor: true,
                recordHistory: true,

                verticalCentered: true,
                paddingTop: '80px',
                paddingBottom: '0',
                fixedElements: 'header',
                responsiveWidth: 768,
                responsiveHeight: 600,


                afterLoad: function (origin, destination, direction) {
                    console.log('Sección cargada:', destination.index + 1, '-', destination.anchor);

                    const section = destination.item;
                    const animatedElements = section.querySelectorAll('[data-aos]');
                    animatedElements.forEach(element => {
                        element.classList.add('aos-animate');
                    });
                },

                onLeave: function (origin, destination, direction) {
                    console.log('Saliendo de sección:', origin.index + 1, 'hacia:', destination.index + 1);
                },

                afterRender: function () {
                    console.log('fullPage.js renderizado correctamente');
                    const removeWatermark = () => {
                        const wm = document.querySelector('.fp-watermark, .fp-branding');
                        if (wm) {
                            wm.remove();
                        }
                    };
                    removeWatermark();
                    setTimeout(removeWatermark, 500);
                    setTimeout(removeWatermark, 1500);
                    setTimeout(removeWatermark, 3000);

                    // Animate visible elements immediately (first section on mobile)
                    if (typeof AOS !== 'undefined') {
                        animateVisibleAOS();
                        AOS.refreshHard && AOS.refreshHard();
                    }
                },

                afterResize: function (width, height) {
                    console.log('Resize completado:', width, 'x', height);
                },

                afterResponsive: function (isResponsive) {
                    console.log('Modo responsive:', isResponsive);
                    if (isResponsive && typeof AOS !== 'undefined') {
                        animateVisibleAOS();
                        AOS.refresh && AOS.refresh();
                    }
                }
            });

            window.goToSection = function (sectionIndex) {
                if (fullpageInstance) {
                    fullpageInstance.moveTo(sectionIndex + 1);
                }
            };

            document.addEventListener('click', function (e) {
                if (e.target.matches('a[href="#section1"]') || e.target.closest('a[href="#section1"]')) {
                    e.preventDefault();
                    window.goToSection(1);
                    return;
                }

                if (e.target.matches('a[href^="#section"]')) {
                    e.preventDefault();
                    const sectionId = e.target.getAttribute('href').replace('#section', '');
                    window.goToSection(parseInt(sectionId) - 1);
                }
            });
        }

        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: false,
                offset: 100
            });
        }

        // Helper: mark currently visible [data-aos] as animated
        function animateVisibleAOS() {
            const els = document.querySelectorAll('[data-aos]');
            const vh = window.innerHeight || document.documentElement.clientHeight;
            els.forEach(el => {
                const rect = el.getBoundingClientRect();
                // If at least 20% of the element is visible
                const visible = rect.top < vh * 0.9 && rect.bottom > vh * 0.1;
                if (visible) el.classList.add('aos-animate');
            });
        }

        // Run after DOM ready
        animateVisibleAOS();
        window.addEventListener('resize', () => {
            animateVisibleAOS();
        });

        try {
            const nav = document.querySelector('nav.navbar');
            if (nav) nav.classList.add('navbar-custom');

            const links = document.querySelectorAll('nav.navbar .nav-link');
            const current = window.location.pathname.split('/').pop();
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (!href) return;
                const hrefFile = href.split('/').pop();
                if (hrefFile === current || (current === '' && hrefFile === 'index.html')) {
                    link.classList.add('active');
                }
            });
        } catch (err) {
            console.warn('Error setting active nav item', err);
        }

        try {
            const teamCarouselEl = document.getElementById('teamCarousel');
            if (teamCarouselEl && typeof bootstrap !== 'undefined') {
                new bootstrap.Carousel(teamCarouselEl, { interval: 4500, ride: 'carousel' });
                console.log('teamCarousel explicitly initialized');
            }
        } catch (e) {
            console.warn('Could not init teamCarousel', e);
        }
        try {
            const teamCarouselEl = document.getElementById('teamCarousel');
            if (teamCarouselEl && typeof bootstrap !== 'undefined') {
                teamCarouselEl.addEventListener('slide.bs.carousel', function (ev) {
                    const from = ev.from;
                    const to = ev.to;
                    const items = teamCarouselEl.querySelectorAll('.carousel-item');
                    const outgoing = items[from] && items[from].querySelector('.team-card');
                    const incoming = items[to] && items[to].querySelector('.team-card');

                    const totalItems = items.length;
                    let goingRight = (to > from) || (from === totalItems - 1 && to === 0);
                    if (from === 0 && to === totalItems - 1) goingRight = false;

                    if (outgoing) {
                        outgoing.classList.remove('card-enter', 'card-enter-left', 'card-enter-right');
                        outgoing.classList.add(goingRight ? 'card-exit-right' : 'card-exit-left');
                    }
                    if (incoming) {
                        incoming.classList.remove('card-exit-left', 'card-exit-right');
                        setTimeout(() => {
                            incoming.classList.add(goingRight ? 'card-enter-right' : 'card-enter-left');
                        }, 280);
                    }
                });

                teamCarouselEl.addEventListener('slid.bs.carousel', function (ev) {
                    const items = teamCarouselEl.querySelectorAll('.carousel-item');
                    items.forEach(it => {
                        const card = it.querySelector('.team-card');
                        if (card) {
                            card.classList.remove('card-exit-left', 'card-exit-right',
                                'card-enter-left', 'card-enter-right');
                        }
                    });
                });
            }
        } catch (err) {
            console.warn('Carousel animation hooks not available', err);
        }
    });
})()


