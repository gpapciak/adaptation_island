/* =============================================================
   ADAPTATION ISLAND — Map Interactions
   Property and Island SVG map hover tooltips
   ============================================================= */

(function () {
  'use strict';

  /* ── Tooltip helper ─────────────────────────────────────────
     Works with any map container that has .map-landmark elements
     and a .map-tooltip element.
  ─────────────────────────────────────────────────────────── */
  function initTooltipsForContainer(containerEl, tooltipEl) {
    if (!containerEl || !tooltipEl) return;

    const landmarks = containerEl.querySelectorAll('.map-landmark');

    landmarks.forEach(landmark => {
      landmark.addEventListener('mouseenter', (e) => {
        const name = landmark.dataset.name || '';
        const desc = landmark.dataset.desc || '';
        tooltipEl.innerHTML = `<h5>${name}</h5>${desc ? `<p>${desc}</p>` : ''}`;
        tooltipEl.style.display = 'block';
        positionTooltip(e, tooltipEl, containerEl);
      });

      landmark.addEventListener('mousemove', (e) => {
        positionTooltip(e, tooltipEl, containerEl);
      });

      landmark.addEventListener('mouseleave', () => {
        tooltipEl.style.display = 'none';
      });

      // Touch support
      landmark.addEventListener('click', (e) => {
        const isVisible = tooltipEl.style.display === 'block';
        tooltipEl.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
          const name = landmark.dataset.name || '';
          const desc = landmark.dataset.desc || '';
          tooltipEl.innerHTML = `<h5>${name}</h5>${desc ? `<p>${desc}</p>` : ''}`;
          positionTooltip(e, tooltipEl, containerEl);
        }
        e.stopPropagation();
      });
    });

    // Click outside to close tooltip on touch
    document.addEventListener('click', () => {
      tooltipEl.style.display = 'none';
    });
  }

  function positionTooltip(e, tooltipEl, containerEl) {
    const rect = containerEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tipW = tooltipEl.offsetWidth || 200;
    const tipH = tooltipEl.offsetHeight || 80;
    const margin = 12;

    let left = x + margin;
    let top  = y - tipH - margin;

    // Prevent overflow right
    if (left + tipW > rect.width) left = x - tipW - margin;
    // Prevent overflow top
    if (top < 0) top = y + margin;
    // Prevent overflow bottom
    if (top + tipH > rect.height) top = rect.height - tipH - margin;

    tooltipEl.style.left = `${left}px`;
    tooltipEl.style.top  = `${top}px`;
  }

  /* ── Initialize all map containers ────────────────────────── */
  function initMapTooltips() {
    // Property map on the-property.html
    const propContainer = document.getElementById('property-map-container');
    const propTooltip   = document.getElementById('property-tooltip');
    if (propContainer) initTooltipsForContainer(propContainer, propTooltip);

    // Island overview map on the-map.html
    const islandContainer = document.getElementById('island-map-container');
    const islandTooltip   = document.getElementById('island-tooltip');
    if (islandContainer) initTooltipsForContainer(islandContainer, islandTooltip);

    // Property map on the-map.html (second instance)
    const propContainer2 = document.getElementById('property-map-container-2');
    const propTooltip2   = document.getElementById('property-tooltip-2');
    if (propContainer2) initTooltipsForContainer(propContainer2, propTooltip2);
  }

  // Export for use in the-map.html tab switching
  window.initMapTooltips = initMapTooltips;

  document.addEventListener('DOMContentLoaded', () => {
    // Small delay to allow nav injection to complete
    requestAnimationFrame(() => initMapTooltips());
  });

})();
