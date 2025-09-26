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

// Manejo del formulario (POST tradicional con FormSubmit)
const form = document.getElementById('contactForm');
if (form) {
  // Sin preventDefault; el navegador hará el POST al action.
}

// ==== Casos de éxito: filtros (con "Todos") + carrusel ====
(() => {
  const grid = document.getElementById('casesGrid');
  const buttons = document.querySelectorAll('.filter-btn');
  if (!grid || !buttons.length) return;

  function applyFilter(cat) {
    const cards = grid.querySelectorAll('.case-card');
    cards.forEach(card => {
      const show = (cat === 'all') || (card.dataset.cat === cat);
      card.style.display = show ? '' : 'none';
    });
    // Tras filtrar, vuelve al inicio del carrusel
    grid.scrollTo({ left: 0, behavior: 'smooth' });
  }

  // Default: "Todos"
  applyFilter('all');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // Navegación del carrusel (prev/next)
  const prev = document.querySelector('.cases-prev');
  const next = document.querySelector('.cases-next');
  const SCROLL_STEP = 360; // píxeles aproximados de una tarjeta

  function scrollByStep(dir = 1) {
    grid.scrollBy({ left: dir * SCROLL_STEP, behavior: 'smooth' });
  }
  if (prev) prev.addEventListener('click', () => scrollByStep(-1));
  if (next) next.addEventListener('click', () => scrollByStep(1));

  // Permitir teclas ← → cuando el carrusel tiene foco
  grid.setAttribute('tabindex', '0');
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') scrollByStep(1);
    if (e.key === 'ArrowLeft')  scrollByStep(-1);
  });
})();


// ==== Casos de éxito: modal ====
(() => {
  const modal = document.getElementById('caseModal');
  const title = document.getElementById('caseModalTitle');
  const eyebrow = document.getElementById('caseModalEyebrow');
  const body = document.getElementById('caseModalBody');

  function openCase(id) {
    const detail = document.getElementById(id);
    if (!detail) return;
    // Extrae partes del detalle para cabecera
    const eyebrowEl = detail.querySelector('.eyebrow');
    const titleEl = detail.querySelector('h3');
    const content = detail.querySelector('.detail').cloneNode(true);

    title.textContent = titleEl ? titleEl.textContent : 'Caso';
    eyebrow.textContent = eyebrowEl ? eyebrowEl.textContent : '';
    // Quita título y eyebrow duplicados dentro del body
    const firstEyebrow = content.querySelector('.eyebrow'); if (firstEyebrow) firstEyebrow.remove();
    const firstH3 = content.querySelector('h3'); if (firstH3) firstH3.remove();

    body.innerHTML = '';
    body.appendChild(content);

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
  }

  window.closeCaseModal = function() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  // Abrir modal desde botones
  document.querySelectorAll('.open-case').forEach(btn => {
    btn.addEventListener('click', () => openCase(btn.dataset.case));
  });

  // Cerrar al clicar fuera
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeCaseModal();
    });
  }
})();
