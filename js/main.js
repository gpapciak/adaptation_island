/* =============================================================
   ADAPTATION ISLAND — Shared JavaScript
   Navigation, scroll effects, fade-in animations, accordions
   ============================================================= */

/* ── Navigation HTML ────────────────────────────────────────── */
const NAV_HTML = `
<nav class="site-nav" id="site-nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-brand">
      <span class="nav-brand-name">Adaptation Island</span>
      <span class="nav-brand-sub">A property on McNutt's Island, Nova Scotia</span>
    </a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="nav-links" role="list">
      <li><a href="index.html">Home</a></li>
      <li><a href="the-island.html">The Island</a></li>
      <li><a href="the-property.html">The Property</a></li>
      <li><a href="flora-fauna.html">Flora &amp; Fauna</a></li>
      <li><a href="come-tend.html">Come &amp; Tend</a></li>
      <li><a href="bearing-witness.html">Bearing Witness</a></li>
      <li><a href="activities.html">Activities</a></li>
      <li><a href="the-map.html">The Map</a></li>
      <li class="nav-external"><a href="https://mcnuttsisland.org" target="_blank" rel="noopener">The Island ↗</a></li>
    </ul>
  </div>
</nav>
`;

/* ── Footer HTML ─────────────────────────────────────────────── */
const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-witness">
      <p>"We tend this island in full knowledge of what is coming."</p>
      <p>To witness is to love. To love is to act.</p>
    </div>
    <div class="footer-grid">
      <div class="footer-col">
        <h4>The Place</h4>
        <ul>
          <li><a href="the-island.html">The Island</a></li>
          <li><a href="the-property.html">The Property</a></li>
          <li><a href="flora-fauna.html">Flora &amp; Fauna</a></li>
          <li><a href="the-map.html">The Map</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>The Work</h4>
        <ul>
          <li><a href="come-tend.html">Come &amp; Tend</a></li>
          <li><a href="bearing-witness.html">Bearing Witness</a></li>
          <li><a href="activities.html">Activities</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>The Island</h4>
        <ul>
          <li><a href="the-island.html#mikmaq">Mi'kmaq Heritage</a></li>
          <li><a href="the-island.html#loyalist">Black Loyalist History</a></li>
          <li><a href="the-island.html#working">Working Character</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-alliance">
      <p>Full island history, ecology, activities, and visitor information at <a href="https://mcnuttsisland.org" target="_blank" rel="noopener">mcnuttsisland.org →</a></p>
    </div>
    <div class="footer-bottom">
      <span>McNutt's Island, Nova Scotia — 43°N, 65°W — Southwest Nova Biosphere Reserve</span>
      <span>A proving ground for new ways of living with land.</span>
    </div>
  </div>
</footer>
`;

/* ── Inject nav and footer ───────────────────────────────────── */
function injectShared() {
  const navEl = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  if (navEl) navEl.innerHTML = NAV_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
}

/* ── Mark active nav link ────────────────────────────────────── */
function markActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Mobile hamburger menu ───────────────────────────────────── */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  const nav    = document.getElementById('site-nav');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  });

  // Close on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.classList.remove('no-scroll');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.classList.remove('no-scroll');
    }
  });
}

/* ── Scroll: nav background + hero style ────────────────────── */
function initScrollNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const hero = document.querySelector('.hero, .page-hero');
  if (hero) nav.classList.add('nav--hero');

  function onScroll() {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('scrolled', scrolled);
    if (hero) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      nav.classList.toggle('nav--hero', heroBottom > 60);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Fade-in on scroll ───────────────────────────────────────── */
function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ── Accordions ──────────────────────────────────────────────── */
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(el => {
        el.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ── Smooth scroll for anchor links ─────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('site-nav')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Init ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectShared();
  // Allow DOM to settle after injection
  requestAnimationFrame(() => {
    markActiveLink();
    initMobileNav();
    initScrollNav();
    initFadeIn();
    initAccordions();
    initSmoothScroll();
  });
});
