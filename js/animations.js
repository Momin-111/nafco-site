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