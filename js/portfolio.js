
// ============================
// PORTFOLIO FILTER + SHOW MORE
// ============================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.pm-item');
const showMoreBtn = document.getElementById('portfolioShowMore');
const initialVisibleCount = 12;
let portfolioExpanded = false;

function getActiveFilter() {
  const activeButton = document.querySelector('.filter-btn.active');
  return activeButton ? activeButton.dataset.filter : 'all';
}

function updatePortfolioVisibility() {
  const filter = getActiveFilter();
  let visibleCount = 0;
  let hiddenCount = 0;

  let matchedCount = 0;

  portfolioItems.forEach(item => {
    const matchesFilter = filter === 'all' || item.dataset.cat === filter;
    if (matchesFilter) {
      matchedCount += 1;
    }
    const shouldShow = matchesFilter && (portfolioExpanded || visibleCount < initialVisibleCount);

    if (matchesFilter && !shouldShow) {
      hiddenCount += 1;
    }

    if (shouldShow) {
      item.style.display = '';
      item.style.opacity = '1';
      item.style.pointerEvents = 'all';
      item.style.transform = 'scale(1)';
      item.style.transition = 'all 0.4s ease';
      visibleCount += 1;
    } else {
      item.style.display = 'none';
    }
  });

  if (showMoreBtn) {
    const shouldShowButton = matchedCount > initialVisibleCount || portfolioExpanded;
    if (shouldShowButton) {
      showMoreBtn.style.display = 'inline-flex';
      showMoreBtn.textContent = portfolioExpanded ? 'Show fewer images' : 'Show more images';
    } else {
      showMoreBtn.style.display = 'none';
    }
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    portfolioExpanded = false;
    updatePortfolioVisibility();
  });
});

if (showMoreBtn) {
  showMoreBtn.addEventListener('click', () => {
    portfolioExpanded = !portfolioExpanded;
    updatePortfolioVisibility();
  });
}

updatePortfolioVisibility();

// ============================
// LIGHTBOX
// ============================
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lbImg = document.getElementById('lightboxImg');
const lbCap = document.getElementById('lightboxCaption');
let currentLightboxIdx = 0;

// Build items array from portfolio image source + caption text
const items = Array.from(portfolioItems).map(item => {
  const imgEl = item.querySelector('img');
  let src = '';
  if (imgEl) {
    src = imgEl.src || imgEl.getAttribute('src') || '';
  }
  const caption = (item.querySelector('.portfolio-name') || item.querySelector('.portfolio-cat') || item.querySelector('.pm-overlay-name') || item.dataset.name || {textContent: ''}).textContent;
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
