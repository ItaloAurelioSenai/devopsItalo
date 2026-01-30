document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') body.classList.add('light');
  updateToggleIcon();

  toggle.addEventListener('click', () => {
    body.classList.toggle('light');
    const mode = body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
    updateToggleIcon();
  });

  function updateToggleIcon(){
    if(body.classList.contains('light')) toggle.textContent = '☀️';
    else toggle.textContent = '🌙';
  }

  // FAQ: details elements work natively; add keyboard support
  document.querySelectorAll('.faq-list details').forEach(d => {
    d.addEventListener('toggle', () => {
      // close others
      if (d.open) {
        document.querySelectorAll('.faq-list details').forEach(o => { if (o !== d) o.open = false });
      }
    });
  });

  // Smooth scroll for nav (ensure offset if fixed header needed)
  document.querySelectorAll('nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Contact form validation and toast
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name;
    const email = form.email;
    const message = form.message;
    let valid = true;
    [name, email, message].forEach(f => f.classList.remove('invalid'));

    if (!name.value.trim()){ name.classList.add('invalid'); valid = false }
    if (!validateEmail(email.value)){ email.classList.add('invalid'); valid = false }
    if (!message.value.trim()){ message.classList.add('invalid'); valid = false }

    if (!valid) return showToast('Preencha os campos corretamente');

    // Simulate send
    form.reset();
    showToast('Mensagem enviada com sucesso!');
  });

  function validateEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function showToast(msg, timeout = 3500){
    toast.hidden = false;
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(()=> toast.hidden = true, 300);
    }, timeout);
  }

  // WhatsApp floating button
  const wa = document.createElement('a');
  wa.href = 'https://api.whatsapp.com/send?phone=5532999200455&text=Olá!%20Gostaria%20de%20mais%20informações.';
  wa.target = '_blank';
  wa.className = 'whatsapp-float';
  wa.setAttribute('aria-label','WhatsApp');
  // Inline SVG icon to avoid dependency on icon fonts
  wa.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0012 0C5.373 0 .013 5.36 0 12c0 2.11.55 4.18 1.6 6.01L0 24l6.2-1.57A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.2-3.48-8.52z" fill="#25D366"/>
      <path d="M17.3 14.04c-.31-.16-1.82-.9-2.1-1-.28-.12-.48-.16-.68.16s-.78 1-.96 1.2c-.18.22-.36.25-.67.08-.31-.16-1.31-.48-2.5-1.55-.93-.82-1.56-1.83-1.74-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.2.05-.39-.02-.55-.08-.16-.68-1.62-.93-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.36-.01-.55-.01s-.52.08-.79.39c-.27.31-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.38 5.09 4.73 2.99 1.36 2.99.91 3.54.86.55-.06 1.82-.74 2.08-1.45.26-.7.26-1.3.18-1.44-.08-.14-.28-.22-.59-.38z" fill="#fff"/>
    </svg>
  `;
  document.body.appendChild(wa);
});
