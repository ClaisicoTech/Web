// === HERO: Rotador de palabras clave ===
(() => {
  const rot = document.querySelector('.kw-rotator');
  if (!rot) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Palabras clave del negocio (ajústalas si quieres)
  const WORDS = [
    'automatización de procesos',
    'chatbots conversacionales',
    'llamadas en frío con IA',
    'reporting y BI',
    'integraciones y RPA'
  ];

  // Inicialización
  let i = 0;
  const show = (text) => {
    rot.classList.remove('in');
    // pequeña espera para que se aplique el fade-out
    setTimeout(() => {
      rot.textContent = text;
      rot.classList.add('in');
    }, 140);
  };

  // Primer render
  rot.textContent = WORDS[0];
  rot.classList.add('in');
  i = 1;

  if (prefersReduced) {
    // En reduced motion, dejamos la primera palabra fija
    return;
  }

  // Bucle
  setInterval(() => {
    show(WORDS[i]);
    i = (i + 1) % WORDS.length;
  }, 2200);
})();
