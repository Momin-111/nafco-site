/* ========================================
   NAFCO Aluminium — featured project modal
   Shared by the home page and the projects page.
   Any .project-tile[data-project] opens a detail
   dialog populated from its data-* attributes.
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
