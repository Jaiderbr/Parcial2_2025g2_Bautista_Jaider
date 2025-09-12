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
    });
})()
