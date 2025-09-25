// Año dinámico y funciones base
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

// === Enhancements ===

// Scroll reveal con IntersectionObserver
(() => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
})();

// Navbar estilo "scrolled"
(() => {
  const w3Top = document.querySelector('.w3-top');
  if (!w3Top) return;
  const onScroll = () => {
    if (window.scrollY > 10) w3Top.classList.add('scrolled');
    else w3Top.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Botón flotante "Arriba"
(() => {
  const toTop = document.getElementById('toTop');
  if (!toTop) return;
  const toggleTop = () => {
    toTop.style.display = window.scrollY > 600 ? 'inline-block' : 'none';
  };
  toggleTop();
  window.addEventListener('scroll', toggleTop, { passive: true });
})();

// Micro-parallax del copy del hero
(() => {
  const heroCopy = document.querySelector('.hero-copy');
  if (!heroCopy) return;
  const onScrollHero = () => {
    const y = Math.min(window.scrollY, 200);
    heroCopy.style.transform = `translateY(${y * 0.1}px)`;
  };
  window.addEventListener('scroll', onScrollHero, { passive: true });
  onScrollHero();
})();
