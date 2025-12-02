document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll Animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section, .bento-item, .case-card-large, .magic-grid').forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
  });

  // === MAGIC: Magnetic Buttons ===
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    magnet.addEventListener('mouseleave', () => {
      magnet.style.transform = 'translate(0, 0)';
    });
  });

  // === MAGIC: Canvas Particles ===
  const canvas = document.getElementById('magicCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.alpha = Math.random() * 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // === TRANSLATIONS ===
  const translations = {
    es: {
      nav_services: "Servicios",
      nav_tech: "Tecnología",
      nav_cases: "Casos",
      nav_about: "Nosotros",
      nav_demo: "Demo",
      hero_label: "AUTOMATIZACIÓN END-TO-END",
      hero_title_1: "Transformamos datos",
      hero_title_2: "en información viva.",
      hero_sub: "Si una tarea se repite, no necesita manos. Si un dato existe, debe contar una historia.",
      hero_cta_primary: "Ver el futuro",
      hero_cta_secondary: "Explorar servicios",
      services_title: "Nuestro Stack",
      services_sub: "Diseñamos, implementamos y medimos.",
      svc_auto_title: "Automatización de Procesos",
      svc_auto_desc: "Integraciones con IA. SLA de disponibilidad y monitorización. Flujos multi-paso, validaciones y auditoría completa.",
      svc_bots_title: "Chatbots",
      svc_bots_desc: "Conversación natural. Web, WhatsApp y Telegram. Escalado a humano y medición de CSAT.",
      svc_reporting_title: "Reporting",
      svc_reporting_desc: "Dashboards en Power BI/Looker. Datos en tiempo real.",
      svc_esg_title: "ESG",
      svc_esg_desc: "Informes de sostenibilidad y normativas CSRD.",
      magic_title: "La Magia",
      magic_lead: "No es solo código. Es una arquitectura viva.",
      magic_item_1: "Algoritmos Propietarios",
      magic_item_2: "Redes Neuronales Adaptativas",
      magic_item_3: "Seguridad Cuántica",
      work_title: "Casos de Éxito",
      work_sub: "El futuro ya está aquí.",
      case1_title: "Global Logistics AI",
      case1_desc: "Optimización de rutas de envío globales utilizando algoritmos genéticos y predicción meteorológica en tiempo real.",
      metric_uptime: "Uptime",
      metric_costs: "Costes",
      case2_title: "FinTech Security Core",
      case2_desc: "Infraestructura bancaria de próxima generación con detección de anomalías basada en comportamiento.",
      metric_latency: "Latencia",
      metric_accuracy: "Precisión",
      case3_title: "Smart Grid Energy",
      case3_desc: "Red de distribución energética descentralizada que equilibra la carga automáticamente entre nodos urbanos.",
      metric_savings: "Ahorro",
      metric_balancing: "Balanceo",
      manifesto: "\"Menos capas, más impacto. Entregamos en <span class='highlight'>semanas</span>, medimos, iteramos y volvemos a entregar.\"",
      contact_title: "¿Listo para escalar?",
      contact_sub: "Cuéntanos tu reto. Te proponemos un piloto en 7–14 días.",
      form_name: "Nombre",
      form_email: "Email",
      form_message: "Mensaje",
      form_submit: "Enviar",
      popup_title: "¿Desea obtener más información?",
      popup_desc: "Déjanos tu correo y te enviaremos nuestro whitepaper sobre automatización.",
      popup_btn: "Enviar"
    },
    en: {
      nav_services: "Services",
      nav_tech: "Technology",
      nav_cases: "Work",
      nav_about: "About",
      nav_demo: "Demo",
      hero_label: "END-TO-END AUTOMATION",
      hero_title_1: "Transforming data",
      hero_title_2: "into living information.",
      hero_sub: "If a task repeats, it doesn't need hands. If data exists, it must tell a story.",
      hero_cta_primary: "See the Future",
      hero_cta_secondary: "Explore Services",
      services_title: "Our Stack",
      services_sub: "We design, implement, and measure.",
      svc_auto_title: "Process Automation",
      svc_auto_desc: "AI Integrations. Availability SLAs and monitoring. Multi-step flows, validations, and full audit.",
      svc_bots_title: "Chatbots",
      svc_bots_desc: "Natural conversation. Web, WhatsApp, and Telegram. Human handover and CSAT measurement.",
      svc_reporting_title: "Reporting",
      svc_reporting_desc: "Power BI/Looker Dashboards. Real-time data.",
      svc_esg_title: "ESG",
      svc_esg_desc: "Sustainability reports and CSRD compliance.",
      magic_title: "The Magic",
      magic_lead: "It's not just code. It's living architecture.",
      magic_item_1: "Proprietary Algorithms",
      magic_item_2: "Adaptive Neural Networks",
      magic_item_3: "Quantum Security",
      work_title: "Success Cases",
      work_sub: "The future is here.",
      case1_title: "Global Logistics AI",
      case1_desc: "Global shipping route optimization using genetic algorithms and real-time weather prediction.",
      metric_uptime: "Uptime",
      metric_costs: "Costs",
      case2_title: "FinTech Security Core",
      case2_desc: "Next-gen banking infrastructure with behavior-based anomaly detection.",
      metric_latency: "Latency",
      metric_accuracy: "Accuracy",
      case3_title: "Smart Grid Energy",
      case3_desc: "Decentralized energy distribution network that automatically balances load between urban nodes.",
      metric_savings: "Savings",
      metric_balancing: "Balancing",
      manifesto: "\"Fewer layers, more impact. We deliver in <span class='highlight'>weeks</span>, measure, iterate, and deliver again.\"",
      contact_title: "Ready to Scale?",
      contact_sub: "Tell us your challenge. We propose a pilot in 7–14 days.",
      form_name: "Name",
      form_email: "Email",
      form_message: "Message",
      form_submit: "Send",
      popup_title: "Want more information?",
      popup_desc: "Leave your email and we'll send you our automation whitepaper.",
      popup_btn: "Send"
    }
  };

  let currentLang = localStorage.getItem('lang') || 'es';
  const langToggle = document.getElementById('langToggle');

  function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    langToggle.textContent = lang === 'es' ? 'EN' : 'ES'; // Show the OTHER option

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          // For placeholders if needed, but we use labels. 
          // If using placeholders: el.placeholder = translations[lang][key];
        } else {
          el.innerHTML = translations[lang][key]; // Use innerHTML to keep spans like <span class='highlight'>
        }
      }
    });
  }

  // Init Language
  updateLanguage(currentLang);

  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    updateLanguage(newLang);
  });

  // === POPUP ===
  const popup = document.getElementById('infoPopup');
  const closePopup = document.getElementById('closePopup');
  const popupForm = document.querySelector('.popup-form');

  // Show after 5 seconds
  setTimeout(() => {
    if (!localStorage.getItem('popupShown')) {
      popup.classList.add('active');
    }
  }, 5000);

  closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
    localStorage.setItem('popupShown', 'true');
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('active');
      localStorage.setItem('popupShown', 'true');
    }
  });

  popupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate submission
    popup.classList.remove('active');
    localStorage.setItem('popupShown', 'true');
    alert(currentLang === 'es' ? '¡Gracias! Te contactaremos pronto.' : 'Thanks! We will contact you soon.');
  });
});
