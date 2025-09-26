# Consolidado: Logo visible + Rotador en hero + mantiene mejoras

- Asegura que el **logo** se vea en el navbar usando `img/logo.png?v=1` y muestra un **fallback de texto** si el archivo no existe/ruta distinta.
- Añade el **rotador de palabras clave** en el hero (fade in/out), respetando `prefers-reduced-motion`.
- Conserva todas las mejoras previas (tarjetas iguales y hover, navbar glassy, reveal, botón “Arriba”, parallax, dark-mode, alto contraste móvil).
- Form de contacto sigue con `_next` → `https://claisico.com/gracias.html`.

### Qué tocar
- `index.html` → reemplazar por el incluido o integrar el bloque de navbar + hero.
- `styles.css` → pegar estilos del PR (logo, alto contraste, rotador).
- `app.js` → pegar script del PR (enhancements + rotador).

> Si tu logo no está en `img/logo.png`, cambia la ruta en el `<img>`. El fallback **CLAISICO** evita que desaparezca el branding si hay un 404. Tras el merge, fuerza recarga o usa `?v=1` para cache.

— ChatGPT
