/* ========================================
   NAFCO Aluminium — certificates lightbox
   ======================================== */

(function () {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var img = document.getElementById('lightbox-img');
    var captionEl = document.getElementById('lightbox-caption');
    var hint = document.documentElement.lang === 'ar'
        ? '  اضغط في أي مكان خارج الصورة للإغلاق'
        : '  Click anywhere outside to close';

    function openLightbox(src, caption) {
        img.src = src;
        captionEl.textContent = caption + hint;
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-lightbox-src]').forEach(function (el) {
        el.addEventListener('click', function () {
            openLightbox(el.getAttribute('data-lightbox-src'), el.getAttribute('data-lightbox-caption') || '');
        });
    });

    lb.addEventListener('click', function (e) {
        if (e.target !== img) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });
})();
