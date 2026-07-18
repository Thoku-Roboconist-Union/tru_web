/**
 * TRU website interactions.
 * Each screen is a standalone HTML document.
 */

const ROUTES = {
  home: 'index.html',
  about: 'about.html',
  activities: 'activities.html',
  members: 'members.html',
  results: 'results.html',
  gallery: 'gallery.html',
  news: 'news/index.html',
  contact: 'contact.html',
};

const HERO_IMAGES = [
  'assets/images/5c2e58231359.jpg',
  'assets/images/1a801aa957c8.jpg',
  'assets/images/6ebfd6eeeeed.jpg',
  'assets/images/c4e67af34963.jpg',
  'assets/images/7608ad2b4ae3.jpg',
  'assets/images/c9ee0cd18545.jpg'
];

const GALLERY_IMAGES = [
  'assets/images/a066913fd2b9.jpg',
  'assets/images/85cb70232a23.jpg',
  'assets/images/17f1a35301c5.jpg',
  'assets/images/d6ed05dce717.jpg',
  'assets/images/813056169cb5.jpg',
  'assets/images/d698ab9c58c2.jpg',
  'assets/images/35601774a3a8.jpg',
  'assets/images/f9e481cfd016.jpg',
  'assets/images/53962bec2e8f.jpg',
  'assets/images/75904c4b1646.jpg'
];

const headerTemplate = `
<nav>
  <a class="nav-logo" href="index.html">
    <img src="assets/images/403d98c0ffa4.png" alt="TRU">
    <span><span class="nlm">TRU</span><span class="nls">Tohoku Roboconist Union</span></span>
  </a>
  <div class="nav-right">
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="activities.html">Activities</a></li>
      <li><a href="members.html">Members</a></li>
      <li><a href="results.html">Results</a></li>
      <li><a href="gallery.html">Gallery</a></li>
      <li><a href="news/index.html">News</a></li>
    </ul>
    <a class="nav-cta" href="contact.html">Contact</a>
    <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false">☾ Dark</button>
    <button class="hamburger" id="hbg" type="button" data-toggle-menu aria-label="メニュー">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-menu" id="mm">
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="activities.html">Activities</a>
  <a href="members.html">Members</a>
  <a href="results.html">Results</a>
  <a href="gallery.html">Gallery</a>
  <a href="news/index.html">News</a>
  <button class="theme-toggle mobile-theme-toggle" type="button" data-theme-toggle aria-pressed="false">☾ Dark</button>
  <a class="mm-cta" href="contact.html">Contact</a>
</div>
`;

const footerTemplate = `
<footer class="site-footer">
  <a class="footer-brand" href="index.html" aria-label="TRU Home"><img src="assets/images/403d98c0ffa4.png" alt="TRU"></a>
  <div class="ft-center"><p class="ft-name">Tohoku Roboconist Union</p><p class="ft-copy">© 2025 Tohoku Roboconist Union. All rights reserved.</p></div>
  <ul class="ft-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="news/index.html">News</a></li>
    <li><a href="https://x.com/Robocon_TRU" target="_blank" rel="noreferrer">X</a></li>
    <li><a href="https://www.instagram.com/tohoku_roboconist_union" target="_blank" rel="noreferrer">Instagram</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</footer>
`;

function renderSiteChrome() {
  document.querySelector('[data-site-header]').innerHTML = headerTemplate;
  document.querySelector('[data-site-footer]').innerHTML = footerTemplate;
  prefixSiteChromePaths();
}

function prefixSiteChromePaths() {
  const prefix = document.body.dataset.rootPrefix || '';
  if (!prefix) return;

  document.querySelectorAll('[data-site-header] a[href], [data-site-header] img[src], [data-site-footer] a[href], [data-site-footer] img[src]').forEach((element) => {
    const attribute = element.hasAttribute('href') ? 'href' : 'src';
    const value = element.getAttribute(attribute);
    if (!value || /^(?:[a-z]+:|\/|#)/i.test(value)) return;
    element.setAttribute(attribute, `${prefix}${value}`);
  });
}

function navigate(route) {
  window.location.href = ROUTES[route] || route;
}

function toggleMenu() {
  document.getElementById('hbg')?.classList.toggle('open');
  document.getElementById('mm')?.classList.toggle('open');
}

function closeMenu() {
  document.getElementById('hbg')?.classList.remove('open');
  document.getElementById('mm')?.classList.remove('open');
}

function getPreferredTheme() {
  const stored = localStorage.getItem('tru_theme');
  if (stored === 'fresh' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'fresh';
}

function updateThemeButtons(theme) {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    const dark = theme === 'dark';
    button.textContent = dark ? '☀ Light' : '☾ Dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'ライトテーマに切り替える' : 'ダークテーマに切り替える');
  });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('tru_theme', theme);
  updateThemeButtons(theme);
}

function toggleTheme() {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'fresh' : 'dark');
}

function buildSlides() {
  const wrapper = document.getElementById('slide-wrap');
  const dots = document.getElementById('slide-dots');
  if (!wrapper || !dots) return;

  // The first automatic transition must start from slide 0.
  window.truCurrentSlide = 0;

  HERO_IMAGES.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.className = `hero-slide${index === 0 ? ' active' : ''}`;
    const image = document.createElement('img');
    image.src = src;
    image.alt = 'TRU活動写真';
    slide.appendChild(image);
    wrapper.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = `dot${index === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.dataset.slide = String(index);
    dot.setAttribute('aria-label', `スライド${index + 1}`);
    dots.appendChild(dot);
  });

  window.truSlideTimer = window.setInterval(() => goSlide(window.truCurrentSlide + 1), 5500);
}

function goSlide(nextIndex) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length || !dots.length) return;

  const current = Number.isInteger(window.truCurrentSlide) ? window.truCurrentSlide : 0;
  slides[current]?.classList.remove('active');
  dots[current]?.classList.remove('active');
  const requested = Number.isInteger(nextIndex) ? nextIndex : current + 1;
  window.truCurrentSlide = (requested + HERO_IMAGES.length) % HERO_IMAGES.length;
  slides[window.truCurrentSlide]?.classList.add('active');
  dots[window.truCurrentSlide]?.classList.add('active');

  window.clearInterval(window.truSlideTimer);
  window.truSlideTimer = window.setInterval(() => goSlide(window.truCurrentSlide + 1), 5500);
}

function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;
      window.setTimeout(() => entry.target.classList.add('visible'), index * 80);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  targets.forEach((target) => observer.observe(target));
}

function initNewsFilters() {
  const filters = document.querySelectorAll('[data-news-filter]');
  const cards = document.querySelectorAll('[data-news-tags]');
  if (!filters.length || !cards.length) return;
  applyNewsFilter('all');
}

function applyNewsFilter(filter) {
  document.querySelectorAll('[data-news-filter]').forEach((button) => {
    const selected = button.dataset.newsFilter === filter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  document.querySelectorAll('[data-news-tags]').forEach((card) => {
    const tags = card.dataset.newsTags.split('|');
    card.hidden = filter !== 'all' && !tags.includes(filter);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById('lb');
  const image = document.getElementById('lb-img');
  if (!lightbox || !image) return;
  window.truGalleryIndex = index;
  image.src = GALLERY_IMAGES[index];
  lightbox.classList.add('open');
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  document.getElementById('lb')?.classList.remove('open');
  document.body.classList.remove('lightbox-open');
}

function moveLightbox(delta) {
  const next = (window.truGalleryIndex + delta + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  openLightbox(next);
}

/* Declarative interactions --------------------------------------------- */
function handleClick(event) {
  const target = event.target.closest(
    '[data-theme-toggle], [data-route], [data-toggle-menu], [data-lightbox], ' +
    '[data-lightbox-close], [data-lightbox-nav], [data-lightbox-overlay], ' +
    '[data-news-filter], .dot'
  );
  if (!target) return;

  if (target.hasAttribute('data-theme-toggle')) return toggleTheme();
  if (target.hasAttribute('data-news-filter')) return applyNewsFilter(target.dataset.newsFilter);
  if (target.hasAttribute('data-lightbox-overlay')) {
    if (event.target === target) closeLightbox();
    return;
  }
  if (target.dataset.route) return navigate(target.dataset.route);
  if (target.hasAttribute('data-toggle-menu')) return toggleMenu();
  if (target.dataset.lightbox !== undefined) return openLightbox(Number(target.dataset.lightbox));
  if (target.hasAttribute('data-lightbox-close')) return closeLightbox();
  if (target.dataset.lightboxNav) return moveLightbox(Number(target.dataset.lightboxNav));
  if (target.classList.contains('dot')) return goSlide(Number(target.dataset.slide));
}

function handleKeydown(event) {
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') moveLightbox(1);
  if (event.key === 'ArrowLeft') moveLightbox(-1);
}

function init() {
  renderSiteChrome();
  setTheme(getPreferredTheme());
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
  closeMenu();

  if (document.body.dataset.page === 'home') buildSlides();
  if (document.body.dataset.page === 'news') initNewsFilters();
  initReveal();
}

document.addEventListener('DOMContentLoaded', init);
