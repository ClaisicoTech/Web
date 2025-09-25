# UI: Añadir logo.png en navbar + asegurar contraste en móvil

Este PR:
- Inserta el **logo** en la parte superior izquierda del navbar usando `img/logo.png`.
- Añade estilos para **asegurar contraste en móvil** (navbar oscuro; el logo PNG se invierte con `filter`).

### Cambios
- `index.html` → reemplazar el bloque del **navbar** por `navbar_fragment.html`.
- `styles.css` → añadir al final el contenido de `styles_addition.css`.

> Nota: Este PR asume que ya subiste el archivo **`img/logo.png`** a la rama fuente (Pages).  
> Si el logo está en otra ruta, cambia `src="img/logo.png"` en el fragmento.

— ChatGPT
