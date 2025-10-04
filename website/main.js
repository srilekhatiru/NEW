// Smooth scroll for internal anchors
(document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const el = document.querySelector(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
}));

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

// Form handling (basic client-side validation & demo submit)
const form = document.getElementById('lead-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'consent'];
    const invalid = [];

    requiredFields.forEach((name) => {
      const field = form.querySelector(`[name="${name}"]`);
      if (field) {
        if ((field instanceof HTMLInputElement) && field.type === 'checkbox') {
          if (!field.checked) invalid.push(name);
        } else if (!field.value) {
          invalid.push(name);
        }
      }
    });

    if (invalid.length) {
      alert('Please complete required fields: ' + invalid.join(', '));
      return;
    }

    // Demo: log the payload instead of real submission
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    console.log('Lead submission', payload);

    // Fake submission UX
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.textContent = 'Submitting...';
    }

    await new Promise((r) => setTimeout(r, 900));

    if (submitBtn) {
      submitBtn.removeAttribute('disabled');
      submitBtn.textContent = 'Start Your Application';
    }

    form.reset();
    alert('Thanks! We will reach out shortly.');
  });
}
