// ===== LANGUAGE TOGGLE =====
let lang = 'en';

function toggleLang() {
  lang = lang === 'en' ? 'es' : 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.es;
  });
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.esPlaceholder;
  });
  document.getElementById('langBtn').textContent = lang === 'en' ? '🇲🇽 Español' : '🇺🇸 English';
  const langBtnMobile = document.getElementById('langBtnMobile');
  if (langBtnMobile) langBtnMobile.textContent = lang === 'en' ? '🇲🇽 Español' : '🇺🇸 English';
}

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ===== FORM HANDLER =====
// No backend is wired up, so this builds a pre-filled email to
// Andyturfcare@gmail.com and opens the visitor's mail app.
function handleForm(e) {
  e.preventDefault();

  const name = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const service = document.getElementById('fService').value;
  const message = document.getElementById('fMessage').value.trim();

  const subject = `New estimate request from ${name || 'website visitor'}`;
  const bodyLines = [
    `Name: ${name}`,
    `Phone: ${phone || '—'}`,
    `Email: ${email}`,
    `Service Needed: ${service}`,
    '',
    'Message:',
    message || '—'
  ];
  const mailto = `mailto:Andyturfcare@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

  window.location.href = mailto;

  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  success.textContent = lang === 'en'
    ? '✅ Opening your email app to send this to Jorge...'
    : '✅ Abriendo tu correo para enviar esto a Jorge...';

  e.target.reset();
  setTimeout(() => { success.style.display = 'none'; }, 6000);
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 60 ? 'rgba(20, 30, 16, 0.98)' : 'rgba(30, 46, 26, 0.9)';
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .gallery-item, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
