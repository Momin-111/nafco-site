/* ========================================
   NAFCO Aluminium — home page scripts
   Hero text rotation, partner logo fallback.
   (World map is a static local SVG: images/world-map.svg)
   ======================================== */

(function () {
    var texts = document.querySelectorAll('.hero-text');
    var bars = document.querySelectorAll('.hero-progress-bar');
    var progressWrap = document.querySelector('.hero-progress');
    var total = texts.length;
    var current = 0;
    var timer = null;

    function showHeroSlide(i) {
        texts.forEach(function (t, idx) { t.classList.toggle('active', idx === i); });
        bars.forEach(function (b, idx) {
            b.classList.toggle('passed', idx < i);
            b.classList.toggle('active', idx === i);
            if (idx === i) {
                var fill = b.querySelector('.hero-progress-fill');
                if (fill) {
                    fill.style.animation = 'none';
                    void fill.offsetWidth;
                    fill.style.animation = '';
                }
            }
        });
        current = i;
    }

    function nextHeroSlide() { showHeroSlide((current + 1) % total); }
    function prevHeroSlide() { showHeroSlide((current - 1 + total) % total); }

    function startHeroTimer() {
        clearInterval(timer);
        timer = setInterval(nextHeroSlide, 5000);
    }

    bars.forEach(function (bar, i) {
        bar.addEventListener('click', function () {
            showHeroSlide(i);
            startHeroTimer();
        });
    });

    document.addEventListener('keydown', function (e) {
        if (!total) return;
        var isRtl = document.documentElement.dir === 'rtl';
        if (e.key === 'ArrowRight') { (isRtl ? nextHeroSlide : prevHeroSlide)(); startHeroTimer(); }
        if (e.key === 'ArrowLeft') { (isRtl ? prevHeroSlide : nextHeroSlide)(); startHeroTimer(); }
    });

    if (progressWrap) {
        progressWrap.addEventListener('mouseenter', function () { clearInterval(timer); });
        progressWrap.addEventListener('mouseleave', function () { startHeroTimer(); });
    }

    if (total > 0) startHeroTimer();
})();

(function () {
    document.querySelectorAll('.partner-logo-wrap img').forEach(function (img) {
        function showFallback() {
            img.style.display = 'none';
            if (img.nextElementSibling) img.nextElementSibling.style.display = 'flex';
        }
        if (img.complete && img.naturalWidth === 0) {
            showFallback();
        } else {
            img.addEventListener('error', showFallback);
        }
    });
})();
