document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('trialForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Semak field wajib — kalau ada kosong, beri amaran
    const name = document.getElementById('name') ? document.getElementById('name').value.trim() : "";
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const classSelect = document.getElementById('classSelect') || document.getElementById('class');

    if (
      name === "" ||
      !emailField.value.trim() ||
      (phoneField && phoneField.value.trim() === "") ||
      (classSelect && classSelect.value.trim() === "")
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validasi asas browser
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Semakan nombor telefon minimum
    if (phoneField && phoneField.value.replace(/\D/g, '').length < 7) {
      phoneField.classList.add('is-invalid');
      phoneField.focus();
      return;
    } else if (phoneField) {
      phoneField.classList.remove('is-invalid');
    }

    // 🔹 Semakan emel (format + "pangkalan data")
    const email = emailField.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      emailField.focus();
      return;
    }

    // 🔹 Contoh data “pangkalan data”
    const allowedEmails = ["user1@gmail.com", "user2@yahoo.com", "fitmember@pulsefit.com"];
    if (!allowedEmails.includes(email)) {
      alert("Maklumat Anda Tiada Dalam Pangkalan Data Kami. Harap Maklum.");
      return;
    }

    // ✅ Semua lulus — tunjuk modal success
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    // Reset form selepas berjaya
    form.reset();
    form.classList.remove('was-validated');
  }, false);
});
