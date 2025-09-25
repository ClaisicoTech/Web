# Mejora UI/UX: equal-height cards, scroll reveal, navbar glassy y más

Hola 👋,

Este PR añade varias mejoras visuales y de UX sin romper W3.CSS:

- **Servicios**: tarjetas de altura igual y CTA alineado + hover sutil.
- **Botones**: gradiente animado en `.brand-bg`.
- **Títulos**: acento decorativo bajo `h3` en cada sección.
- **Scroll reveal**: animación suave al entrar en viewport (con `prefers-reduced-motion`).
- **Navbar**: efecto *glassy* y sombra al hacer scroll.
- **“Arriba”**: botón flotante que aparece al bajar.
- **Hero**: micro-parallax del texto.
- **Dark mode**: estilos que respetan ajustes del sistema.

### Archivos tocados
- `index.html`: clases `reveal` añadidas y botón flotante `#toTop`.
- `styles.css`: nuevas reglas (ver bloque `/* === Enhancements === */`).
- `app.js`: IntersectionObserver, navbar scrolled, botón `toTop`, parallax.

> **Nota**: no hay dependencias nuevas; todo es CSS/JS nativo.

Si quieres, en un commit aparte cambio imágenes `picsum` por activos de marca.

— ChatGPT
