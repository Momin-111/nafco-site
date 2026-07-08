/* ========================================
   NAFCO Aluminium — scroll reveal animation
   Auto-applies a fade/slide-in effect to common
   repeating elements as they enter the viewport.
   No HTML markup changes required.
   ======================================== */

(function () {
    var selectors = [
        '.card',
        '.product-tile',
        '.project-tile',
        '.partner-card',
        '.cap-card',
        '.svc-card',
        '.step',
        '.dev-item',
        '.pw-item',
        '.cert-card',
        '.info-card',
        '.dept-card',
        '.feat-project',
        '.vision-text-col',
        '.vision-map-col',
        '.qc-text-col',
        '.qc-img-col',
        '.about-img-wrap',
        '.stat-item',
        '.prod-stat'
    ];

    var targets = document.querySelectorAll(selectors.join(','));
    if (!targets.length) return;

    targets.forEach(function (el) {
        el.classList.add('reveal');
    });

    if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) { el.classList.add('reveal-visible'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
})();

/* ========================================
   Mobile navigation toggle
   ======================================== */

(function () {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav-toggle');
    if (!nav || !toggle) return;

    function setOpen(open) {
        nav.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        setOpen(!nav.classList.contains('nav-open'));
    });

    nav.querySelectorAll('.navlinks a').forEach(function (link) {
        link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('click', function (e) {
        if (nav.classList.contains('nav-open') && !nav.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });
})();