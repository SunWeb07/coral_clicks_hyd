
// ============================
// NAV SCROLL
// ============================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ============================
// MOBILE MENU
// ============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ============================
// THEME TOGGLE
// ============================
const themeToggle = document.getElementById('themeToggle');
let isDark = true;
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀' : '☾';
});

// ============================
// HERO SLIDER
// ============================
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
function nextSlide() {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
setInterval(nextSlide, 4500);
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = i;
    slides[i].classList.add('active');
    dots[i].classList.add('active');
  });
});

// ============================
// SCROLL REVEAL
// ============================
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => observer.observe(el));

// ============================
// VIDEO MODAL
// ============================
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');

function openVideoModal(src) {
  if (!videoModal || !modalVideo) return;
  videoModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalVideo.innerHTML = '';
  const source = document.createElement('source');
  source.src = src;
  source.type = 'video/mp4';
  modalVideo.appendChild(source);
  modalVideo.load();
  modalVideo.play().catch(() => {});
}

function closeVideoModal() {
  if (!videoModal || !modalVideo) return;
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.removeAttribute('src');
  modalVideo.innerHTML = '';
  modalVideo.load();
  videoModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('open')) {
      closeVideoModal();
    }
  });
}
