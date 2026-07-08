/* ========================================
   NAFCO Aluminium — home page scripts
   World map, hero text rotation, partner logo fallback.
   ======================================== */

(function () {
    var svg = document.getElementById('world-map');
    if (!svg) return;
    var W = 1000, H = 460;
    function project(lon, lat) { return [(lon + 180) / 360 * W, (90 - lat) / 180 * H]; }
    function ringToD(ring) {
        return ring.map(function(pt, i) {
            var p = project(pt[0], pt[1]);
            return (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1);
        }).join(' ') + 'Z';
    }
    function geoToD(geometry) {
        if (!geometry) return '';
        var parts = [];
        if (geometry.type === 'Polygon') {
            geometry.coordinates.forEach(function(r) { parts.push(ringToD(r)); });
        } else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach(function(p) { p.forEach(function(r) { parts.push(ringToD(r)); }); });
        }
        return parts.join(' ');
    }
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            data.features.forEach(function(f) {
                var name = f.properties.ADMIN || f.properties.name || '';
                var d = geoToD(f.geometry);
                if (!d) return;
                var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', d);
                path.setAttribute('fill', name === 'Saudi Arabia' ? '#9b1c2e' : '#d7d9dc');
                path.setAttribute('stroke', '#f7f7f6');
                path.setAttribute('stroke-width', '0.4');
                svg.appendChild(path);
            });
        })
        .catch(function() {
            svg.innerHTML = '<rect width="1000" height="460" fill="#e8ecf0" rx="6"/>';
        });
})();

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
