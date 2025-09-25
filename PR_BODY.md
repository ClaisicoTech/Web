# Consolidación: restaurar mejoras UI/UX + fix contacto con _next absoluto

Este PR **reconcilia** cambios para que no se pierdan mejoras anteriores y además mantiene el envío del formulario:

- Restaura mejoras de UI/UX: tarjetas de servicios iguales, hover, gradiente en CTAs, títulos con acento, scroll reveal, navbar glassy, botón “Arriba”, parallax y dark-mode.
- Mantiene el contacto:
  - Email visible: `info@claisico.com`
  - FormSubmit con `method="POST"` y `_next` a **URL absoluta** `https://claisico.com/gracias.html`
- Incluye `gracias.html` en la raíz.

> Posible causa de pérdida: merge desde una rama/commit antiguo o subida de un `index.html` previo. Este PR parte del estado actual y aplica el conjunto completo.

Archivos:
- `index.html`, `styles.css`, `app.js`, `gracias.html`

— ChatGPT
