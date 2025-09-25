// Manejo del formulario (POST tradicional con FormSubmit)
// Asegúrate de no llamar e.preventDefault() en el submit.
const form = document.getElementById('contactForm');
if (form) {
  // Opcional: deshabilitar botón mientras envía
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
  });
}
