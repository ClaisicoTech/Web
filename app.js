// Año dinámico
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initialize scroll animations
  initScrollReveal();

  // Initialize navbar scroll effect
  initNavbarScroll();

  // Initialize mobile menu
  // (Functions are global for onclick handlers in HTML, but we can also attach listeners here if preferred)
});

// Mobile Menu Logic
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  }
}
window.toggleMobileMenu = toggleMobileMenu;

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.getElementById('myNavbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// Scroll Reveal Animation
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up').forEach(el => {
    observer.observe(el);
  });
}

// Case Modal Logic
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');

function openCase(caseId) {
  const sourceContent = document.getElementById(caseId);
  if (sourceContent && modalOverlay && modalContent) {
    modalContent.innerHTML = sourceContent.innerHTML;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.closeModal = closeModal;

// Attach click listeners to "Ver caso" buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('open-case')) {
    const caseId = e.target.dataset.case;
    openCase(caseId);
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Filter Logic for Cases
const filterBtns = document.querySelectorAll('.filter-btn');
const caseWrappers = document.querySelectorAll('.case-card-wrapper');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    caseWrappers.forEach(wrapper => {
      if (filter === 'all' || wrapper.dataset.cat === filter) {
        wrapper.style.display = 'block';
        // Trigger reflow for animation if needed
      } else {
        wrapper.style.display = 'none';
      }
    });
  });
});

// Back to Top
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  }, { passive: true });
}
