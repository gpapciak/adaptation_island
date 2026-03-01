/* =============================================================
   ADAPTATION ISLAND — Activities Page JS
   Seasonal filter + seasonal guide tabs
   ============================================================= */

(function () {
  'use strict';

  /* ── Season filter for activity cards ─────────────────────── */
  const seasonBtns    = document.querySelectorAll('.season-btn');
  const activityCards = document.querySelectorAll('#activity-grid .activity-card');
  const featuredCard  = document.querySelector('.featured-activity[data-seasons]');

  function filterActivities(season) {
    // Filter the featured card
    if (featuredCard) {
      const seasons = featuredCard.dataset.seasons?.split(' ') || [];
      const show = season === 'all' || seasons.includes(season);
      featuredCard.style.display = show ? '' : 'none';
      featuredCard.style.marginBottom = show ? '' : '0';
    }

    // Filter activity cards
    activityCards.forEach(card => {
      const seasons = card.dataset.seasons?.split(' ') || [];
      const show = season === 'all' || seasons.includes(season);
      card.classList.toggle('hidden', !show);
    });
  }

  seasonBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      seasonBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterActivities(btn.dataset.season);
    });
  });

  /* ── Seasonal guide tabs ───────────────────────────────────── */
  const guideTabs     = document.querySelectorAll('.season-tab');
  const guideContents = document.querySelectorAll('.season-content');

  guideTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      guideTabs.forEach(t => t.classList.remove('active'));
      guideContents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('guide-' + tab.dataset.guide);
      if (target) target.classList.add('active');
    });
  });

  // Auto-advance seasonal guide to current season
  function getCurrentSeason() {
    const m = new Date().getMonth(); // 0-indexed
    if (m >= 2 && m <= 4)  return 'spring';
    if (m >= 5 && m <= 7)  return 'summer';
    if (m >= 8 && m <= 10) return 'fall';
    return 'winter';
  }

  const currentSeason = getCurrentSeason();
  const matchingTab = document.querySelector(`.season-tab[data-guide="${currentSeason}"]`);
  if (matchingTab) {
    guideTabs.forEach(t => t.classList.remove('active'));
    guideContents.forEach(c => c.classList.remove('active'));
    matchingTab.classList.add('active');
    const target = document.getElementById('guide-' + currentSeason);
    if (target) target.classList.add('active');
  }

})();
