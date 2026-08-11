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

/* ========================================
   Featured project modal (home page)
   ======================================== */

(function () {
    var modal = document.getElementById('project-modal');
    var tiles = document.querySelectorAll('.project-tile[data-project]');
    if (!modal || !tiles.length) return;

    var img = document.getElementById('pm-img');
    var city = document.getElementById('pm-city');
    var cat = document.getElementById('pm-cat');
    var title = document.getElementById('pm-title');
    var desc = document.getElementById('pm-desc');
    var specs = document.getElementById('pm-specs');
    var labels = (modal.getAttribute('data-labels') || 'Location|Sector|Scope').split('|');
    var lastFocus = null;

    function specRow(label, value) {
        if (!value) return '';
        return '<div class="pm-spec"><span class="pm-spec-l">' + label +
               '</span><span class="pm-spec-v">' + value + '</span></div>';
    }

    function openModal(tile) {
        lastFocus = tile;
        img.src = tile.getAttribute('data-img');
        img.alt = tile.getAttribute('data-title') || '';
        city.textContent = tile.getAttribute('data-city') || '';
        cat.textContent = tile.getAttribute('data-cat') || '';
        title.textContent = tile.getAttribute('data-title') || '';
        desc.textContent = tile.getAttribute('data-desc') || '';
        specs.innerHTML =
            specRow(labels[0], tile.getAttribute('data-city')) +
            specRow(labels[1], tile.getAttribute('data-sector')) +
            specRow(labels[2], tile.getAttribute('data-scope'));
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        var closeBtn = modal.querySelector('.pm-close');
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }

    tiles.forEach(function (tile) {
        tile.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(tile);
        });
    });

    modal.querySelectorAll('[data-pm-close]').forEach(function (el) {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
})();
