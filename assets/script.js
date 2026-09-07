// Mobile nav toggle
const burger = document.getElementById('burger');
const panel = document.getElementById('mobilePanel');

// Register the service worker so the site can be installed as an app
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

if (burger && panel) {
  burger.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      panel.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form validation + submit
const form = document.getElementById('contactForm');
if (form) {
  const status = document.getElementById('formStatus');

  const showError = (fieldId, message) => {
    const el = document.querySelector(`[data-error-for="${fieldId}"]`);
    if (el) el.textContent = message || '';
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    showError('name', '');
    showError('email', '');
    showError('message', '');

    if (name.length < 2) {
      showError('name', 'Digite seu nome.');
      valid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError('email', 'Digite um e-mail válido.');
      valid = false;
    }
    if (message.length < 5) {
      showError('message', 'Conta pra gente o que você precisa.');
      valid = false;
    }

    if (!valid) {
      status.textContent = 'Revise os campos destacados.';
      status.className = 'form-status error';
      return;
    }

    // NOTE: this demo has no backend. To actually receive these messages,
    // connect this form to a service like Formspree, EmailJS or Netlify Forms
    // (see the comment in contact.html for the exact spot to plug it in).
    status.textContent = 'Mensagem enviada! Em breve entramos em contato.';
    status.className = 'form-status success';
    form.reset();
  });
}
