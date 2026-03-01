/* =============================================================
   ADAPTATION ISLAND — Sea Level Rise Slider
   Bearing Witness page interactive visualization
   ============================================================= */

(function () {
  'use strict';

  const slider  = document.getElementById('sl-slider');
  if (!slider) return; // Not on bearing-witness page

  const labels  = document.querySelectorAll('.sl-label');
  const infoEls = document.querySelectorAll('.sl-scenario-info');

  // SVG overlay elements
  const overlay2050  = document.getElementById('overlay-2050');
  const overlay2100  = document.getElementById('overlay-2100');
  const overlayBeyond= document.getElementById('overlay-beyond');
  const line2050     = document.getElementById('sea-line-2050');
  const line2100     = document.getElementById('sea-line-2100');
  const lineBeyond   = document.getElementById('sea-line-beyond');

  // Scenarios: [index] => { overlayOpacity, overlayVisible, lineVisible }
  const scenarios = [
    { label: 'current', overlay2050: 0, overlay2100: 0, overlayBeyond: 0, line2050: 0, line2100: 0, lineBeyond: 0 },
    { label: '2050',    overlay2050: 1, overlay2100: 0, overlayBeyond: 0, line2050: 1, line2100: 0, lineBeyond: 0 },
    { label: '2100',    overlay2050: 1, overlay2100: 1, overlayBeyond: 0, line2050: 1, line2100: 1, lineBeyond: 0 },
    { label: 'beyond',  overlay2050: 1, overlay2100: 1, overlayBeyond: 1, line2050: 0, line2100: 0, lineBeyond: 1 },
  ];

  function updateVisualization(step) {
    const s = scenarios[step];

    // Update SVG overlays
    if (overlay2050)   setOpacity(overlay2050,   s.overlay2050 * 0.55);
    if (overlay2100)   setOpacity(overlay2100,   s.overlay2100 * 0.65);
    if (overlayBeyond) setOpacity(overlayBeyond, s.overlayBeyond * 0.75);

    // Update sea level lines
    if (line2050)    setOpacity(line2050,    s.line2050);
    if (line2100)    setOpacity(line2100,    s.line2100);
    if (lineBeyond)  setOpacity(lineBeyond,  s.lineBeyond);

    // Update labels
    labels.forEach((label, i) => {
      label.classList.toggle('active', i === step);
    });

    // Update info panels
    infoEls.forEach((el, i) => {
      el.classList.toggle('active', i === step);
    });

    // Update island label text
    const islandLabel = document.getElementById('island-label');
    if (islandLabel) {
      const messages = [
        'Island interior remains above water',
        'Coastal areas begin to shift',
        'Significant coastal inundation — interior remains',
        'Island persists, transformed',
      ];
      islandLabel.textContent = messages[step];
      islandLabel.style.opacity = step > 0 ? '0.9' : '0.6';
    }
  }

  function setOpacity(el, val) {
    el.style.transition = 'opacity 0.5s ease';
    el.style.opacity = val;
  }

  // Slider input event
  slider.addEventListener('input', () => {
    updateVisualization(parseInt(slider.value, 10));
  });

  // Label click events
  labels.forEach((label, i) => {
    label.addEventListener('click', () => {
      slider.value = i;
      updateVisualization(i);
    });
  });

  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    const step = parseInt(slider.value, 10);
    if (e.key === 'ArrowRight' && step < 3) {
      slider.value = step + 1;
      updateVisualization(step + 1);
    }
    if (e.key === 'ArrowLeft' && step > 0) {
      slider.value = step - 1;
      updateVisualization(step - 1);
    }
  });

  // Init
  updateVisualization(0);

})();
