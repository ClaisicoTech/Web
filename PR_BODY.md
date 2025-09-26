# UX: Rotador de palabras clave en el hero (fade-in/out)

Este PR añade un **rotador de términos** en la cabecera (hero) para destacar servicios clave del negocio con una animación suave (aparece/desaparece).

### Qué incluye
- `index.html` → actualización del bloque **HERO** para incluir `<span class="kw-rotator" aria-live="polite"></span>`.
- `styles.css` → estilos para el efecto (`.kw-rotator`), con subrayado y transición.
- `app.js` → script que rota entre: *automatización de procesos*, *chatbots conversacionales*, *llamadas en frío con IA*, *reporting y BI*, *integraciones y RPA*.
- Respeta **prefers-reduced-motion**: si el usuario prefiere menos movimiento, se muestra solo la primera palabra sin animación.

### Cómo aplicarlo
1. Sustituir el bloque del **hero** por el contenido de `hero_fragment.html`.
2. Añadir el contenido de `styles_addition.css` al final de `styles.css`.
3. Añadir el contenido de `app_patch.js` al final de `app.js` (o donde agrupes tus scripts de UI).
4. Commit en rama nueva → abrir PR → merge a la rama que publica Pages.

— ChatGPT
