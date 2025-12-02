document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll Animations (Fade In)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add fade-in class to elements we want to animate
  const animatedElements = document.querySelectorAll('.bento-item, .section-header, .hero-title, .hero-sub, .hero-actions');
  animatedElements.forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
  });

  // Horizontal Scroll Logic (Optional: Add drag to scroll)
  const slider = document.querySelector('.work-scroller');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }
});

// Add CSS for fade-in animation dynamically or ensure it's in styles.css
// We'll add a small helper here just in case, though ideally it's in CSS.
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .fade-in-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    will-change: opacity, visibility;
  }
  .fade-in-section.visible {
    opacity: 1;
    transform: none;
  }
  .work-scroller.active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
  }
`;
document.head.appendChild(styleSheet);
