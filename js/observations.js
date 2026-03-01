/* =============================================================
   ADAPTATION ISLAND — Observation / Phenology Log
   Bearing Witness page — filterable journal entries
   ============================================================= */

(function () {
  'use strict';

  const entriesEl = document.getElementById('obs-entries');
  if (!entriesEl) return; // Not on bearing-witness page

  /* ── Seed observations ──────────────────────────────────────
     These represent the kind of phenological notes the property
     tending community would record. Rich, specific, honest.
  ─────────────────────────────────────────────────────────── */
  const OBSERVATIONS = [
    {
      date: '2024-09-14',
      month: 'September',
      year: '2024',
      season: 'fall',
      title: 'Late chanterelles still fruiting at the forest edge',
      body: 'Unexpected flush of chanterelles in the balsam fir understory south of Arcadia Meadow, despite the dry August. Likely triggered by the rain of Sept 8–10. Gathered perhaps 2 litres. The fruiting is at least two weeks later than the 2022 season — unclear if this is climate-related or simply year-to-year variation. Worth tracking.',
    },
    {
      date: '2024-08-03',
      month: 'August',
      year: '2024',
      season: 'summer',
      title: 'Blueberry peak — best in three years',
      body: 'Arcadia Meadow and the south-facing barrens above the Headland Spur: exceptional blueberry abundance. The crowberry mats are thick with ripe fruit. Spent four hours picking and barely made a dent. Three bald eagles overhead in the afternoon, likely feeding on the seabird colonies at the outer ledges. The berries are notably smaller than last year — possibly drought stress in July compressing fruit size despite good numbers.',
    },
    {
      date: '2024-06-18',
      month: 'June',
      year: '2024',
      season: 'spring',
      title: 'First osprey egg hatch confirmed',
      body: 'Chick visible in the osprey nest on the old telephone pole at the north end of the property (approx 80m from the main trail). One adult present and actively bringing fish. The nest has been occupied for the third consecutive year by what appears to be the same pair (the female has a distinctive pale head). Water temperature in the channel still cold — 10°C — but the mackerel are appearing inshore.',
    },
    {
      date: '2024-05-12',
      month: 'May',
      year: '2024',
      season: 'spring',
      title: 'Peak warbler migration — remarkable diversity',
      body: 'Spent the morning on the Ends of the Earth Meadow headland. Counted 14 warbler species in four hours, including a Cape May warbler (uncommon here), a bay-breasted, and at least 6 blackpoll warblers. The spruce at the headland edge was alive with movement. This spot is outstanding for migration — a trap that funnels birds along the coast and concentrates them at the headland point. Need to be here every May.',
    },
    {
      date: '2024-04-28',
      month: 'April',
      year: '2024',
      season: 'spring',
      title: 'Frost damage to early growth after April 22 cold snap',
      body: 'The early-emerging bunchberry shoots and some of the fresh balsam fir growth at the meadow edges were caught by the -7°C overnight of April 22. Visible frost damage on perhaps 20% of the early growth in exposed areas. The sheltered forest interior was unaffected. This kind of late frost event — common here historically — is one of the reasons the island\'s phenological record matters: as winters warm, species that have adapted to these late frost events may begin to emerge too early and suffer systematically.',
    },
    {
      date: '2023-11-05',
      month: 'November',
      year: '2023',
      season: 'fall',
      title: 'Storm erosion: beach moved approximately 4m in October',
      body: 'The north beach (accessible at low tide from the Horseshoe Beach trail) shows approximately 4 metres of retreat on the western end compared to the July 2023 survey stake. Two nor\'easters in October — Oct 6 and Oct 19 — caused significant wave action. The dune grass line has retreated with the beach. No obvious new sand source. Worth monitoring for long-term trend against the 2019, 2020, 2021, and 2022 measurements.',
    },
    {
      date: '2023-09-22',
      month: 'September',
      year: '2023',
      season: 'fall',
      title: 'Grey seal haul-out — estimate 200+ animals on outer ledge',
      body: 'The grey seal autumn haul-out on the southern outer ledges is underway. Estimated 200+ individuals visible from the Ends of the Earth Meadow headland with binoculars. The colony has grown noticeably in the past five years. Possible increase linked to improved foraging as mackerel and herring populations shift northward with warming water. Or simply recovering from historical hunting pressure. Or both.',
    },
    {
      date: '2023-06-28',
      month: 'June',
      year: '2023',
      season: 'summer',
      title: 'Wildfire smoke from Shelburne County fires clearly visible',
      body: 'The smoke from the Barrington Lake fire is visible from the south shore headlands — a grey-brown column to the northwest. The smell reached the island intermittently throughout the day: wood smoke, acrid, unmistakable. The fire is approximately 25km at its nearest point. The island is surrounded by water and the prevailing wind is southeast, so direct fire risk is minimal, but the psychological and ecological reality of a fire of this scale this close is significant. The island\'s Acadian forest is not fire-adapted. This is not background information anymore.',
    },
    {
      date: '2023-03-14',
      month: 'March',
      year: '2023',
      season: 'winter',
      title: 'Ice forming in the channel — first in five years',
      body: 'Thin frazil ice forming along the sheltered channel margin near the north landing — the first significant ice formation in five years. Recorded air temperatures: -14°C overnight on March 12, -12°C on March 13. Historically this channel iced over regularly in cold winters; the last five winters have been notably mild. One of the local lobster fishers mentioned that "the channel doesn\'t ice anymore the way it used to." This deserves to be in the record.',
    },
    {
      date: '2022-10-09',
      month: 'October',
      year: '2022',
      season: 'fall',
      title: 'Post-tropical Fiona — storm surge and erosion assessment',
      body: 'Surveyed the property coastline two days after the remnants of Hurricane Fiona passed. The outer headlands showed wave-wrack marks approximately 3m above the normal high tide line — indicating the surge height. The granite ledges are intact but a large section of bank at the southern property edge has slumped into the intertidal zone. Estimated 8–10 tonnes of material. The forest behind the bank shows exposed root systems. This kind of storm is the new baseline, not the exception.',
    },
    {
      date: '2022-08-14',
      month: 'August',
      year: '2022',
      season: 'summer',
      title: 'Water temperature in the channel: 18.4°C — new record',
      body: 'Surface water temperature in the channel measured at 18.4°C on Aug 14 — the highest recorded in our 6-year monitoring period. Previous high: 17.1°C in August 2020. Lobster activity appears high in the channel — traps being hauled daily by two local boats. The fishers report good catches but note that the lobsters are molting earlier than the historical pattern. Worth watching.',
    },
    {
      date: '2022-05-29',
      month: 'May',
      year: '2022',
      season: 'spring',
      title: 'Pitcher plants beginning to bloom — two weeks early',
      body: 'The bog pitcher plants (Sarracenia purpurea) are beginning to bloom — based on previous observations, this is approximately 12–14 days earlier than the 2018–2020 average. The sphagnum around them is green and lush after a wet spring. The cranberry shoots are visible but haven\'t leafed out yet. The bog is one of the most sensitive phenological clocks on the property — worth systematic monitoring.',
    },
  ];

  /* ── Render functions ──────────────────────────────────────── */
  function createEntry(obs) {
    const div = document.createElement('div');
    div.className = 'obs-entry';
    div.dataset.season = obs.season;

    div.innerHTML = `
      <div class="obs-date">
        <strong>${obs.month}</strong>
        ${obs.year}
        <br>
        <span class="obs-season-tag ${obs.season}">${capitalize(obs.season)}</span>
      </div>
      <div class="obs-body">
        <h4>${obs.title}</h4>
        <p>${obs.body}</p>
      </div>
    `;
    return div;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function renderEntries(season) {
    entriesEl.innerHTML = '';
    const filtered = season === 'all'
      ? OBSERVATIONS
      : OBSERVATIONS.filter(o => o.season === season);

    if (filtered.length === 0) {
      entriesEl.innerHTML = '<p style="padding:1.5rem; color:var(--text-muted); font-size:0.9rem;">No observations recorded for this season yet. Be the first to add one.</p>';
      return;
    }

    filtered.forEach(obs => {
      entriesEl.appendChild(createEntry(obs));
    });
  }

  /* ── Filter buttons ──────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.obs-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEntries(btn.dataset.season);
    });
  });

  /* ── Observation form (local only — no backend) ──────────── */
  const form = document.getElementById('obs-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const date  = document.getElementById('obs-date').value;
      const season = document.getElementById('obs-season').value;
      const title = document.getElementById('obs-title').value;
      const body  = document.getElementById('obs-body').value;

      if (!date || !title || !body) return;

      const dateObj = new Date(date + 'T12:00:00');
      const month   = dateObj.toLocaleString('en-CA', { month: 'long' });
      const year    = dateObj.getFullYear().toString();

      // Add to top of observations array
      OBSERVATIONS.unshift({ date, month, year, season, title, body });

      // Re-render with current filter
      const activeSeason = document.querySelector('.obs-filter-btn.active')?.dataset.season || 'all';
      renderEntries(activeSeason);

      // Reset form
      form.reset();

      // Show confirmation
      const confirm = document.createElement('div');
      confirm.style.cssText = 'padding:1rem 1.25rem; background:var(--seaglass-pale); border-radius:6px; color:var(--teal-dark); font-size:0.9rem; margin-top:1rem; animation:fadeSlide 0.3s ease;';
      confirm.textContent = 'Observation added to the log. Thank you for bearing witness.';
      form.appendChild(confirm);
      setTimeout(() => confirm.remove(), 4000);
    });
  }

  /* ── Init ──────────────────────────────────────────────────── */
  renderEntries('all');

})();
