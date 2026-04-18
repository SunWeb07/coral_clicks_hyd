
// ============================
// PORTFOLIO FILTER
// ============================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.style.opacity = show ? '1' : '0.2';
      item.style.pointerEvents = show ? 'all' : 'none';
      item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
      item.style.transition = 'all 0.4s ease';
    });
  });
});

// ============================
// LIGHTBOX
// ============================
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lbImg = document.getElementById('lightboxImg');
const lbCap = document.getElementById('lightboxCaption');
let currentLightboxIdx = 0;

// Build items array from portfolio background-image style + caption text
const items = Array.from(portfolioItems).map(item => {
  const imgEl = item.querySelector('.portfolio-img');
  let src = '';
  if (imgEl) {
    // Try data-bg first, fall back to parsing inline background-image style
    src = imgEl.getAttribute('data-bg') || '';
    if (!src) {
      const bg = imgEl.style.backgroundImage || '';
      const match = bg.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (match) src = match[1];
    }
  }
  const caption = (item.querySelector('.portfolio-name') || item.querySelector('.portfolio-cat') || {textContent: ''}).textContent;
  return { src, caption };
});

function openLightbox(idx) {
  currentLightboxIdx = ((idx % items.length) + items.length) % items.length;
  lbImg.src = items[currentLightboxIdx].src;
  lbImg.alt = items[currentLightboxIdx].caption;
  if (lbCap) lbCap.textContent = items[currentLightboxIdx].caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

portfolioItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.getElementById('lightboxPrev').addEventListener('click', (e) => {
  e.stopPropagation();
  openLightbox(currentLightboxIdx - 1);
});
document.getElementById('lightboxNext').addEventListener('click', (e) => {
  e.stopPropagation();
  openLightbox(currentLightboxIdx + 1);
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') openLightbox(currentLightboxIdx - 1);
  if (e.key === 'ArrowRight') openLightbox(currentLightboxIdx + 1);
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}
