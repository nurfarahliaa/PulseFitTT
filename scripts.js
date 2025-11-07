document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('trialForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Let browser run built-in constraints first
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Additional custom checks (example: phone length)
    const phone = document.getElementById('phone');
    if (phone && phone.value.replace(/\D/g, '').length < 7) {
      phone.classList.add('is-invalid');
      phone.focus();
      return;
    } else if (phone) {
      phone.classList.remove('is-invalid');
    }

    // All validation passed — show Bootstrap modal success
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    // Optionally: clear the form (but keep was-validated off)
    form.reset();
    form.classList.remove('was-validated');
  }, false);
});