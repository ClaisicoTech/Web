// Año dinámico en footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Sidebar móvil
const mySidebar = document.getElementById("mySidebar");
function w3_open() {
  if (!mySidebar) return;
  mySidebar.style.display = (mySidebar.style.display === 'block') ? 'none' : 'block';
}
function w3_close() {
  if (!mySidebar) return;
  mySidebar.style.display = 'none';
}
window.w3_open = w3_open;
window.w3_close = w3_close;

// Modal de imágenes
function onClick(element) {
  const img = document.getElementById("img01");
  const modal = document.getElementById("modal01");
  const caption = document.getElementById("caption");
  if (!img || !modal || !caption) return;

  img.src = element.src;
  modal.style.display = "block";
  caption.textContent = element.alt || "";
}
window.onClick = onClick;

// Cerrar modal o sidebar con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById("modal01");
    if (modal) modal.style.display = "none";
    w3_close();
  }
});

// Manejo básico del formulario (demo)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias! Te contactaremos en breve.');
    form.reset();
  });
}
