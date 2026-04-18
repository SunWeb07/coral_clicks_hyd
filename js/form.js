
// ============================
// FORM SUBMIT
// ============================
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = '✓ Message Sent! We\'ll be in touch soon.';
  btn.style.background = '#25D366';
  setTimeout(() => {
    btn.textContent = 'Send Enquiry ✦';
    btn.style.background = '';
    e.target.reset();
  }, 4000);
}

// ============================
// SMOOTH PARALLAX ON HERO
// ============================
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if(heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.7);
  }
});