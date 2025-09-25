# Contacto: cambia a info@claisico.com y envía formulario a ese correo

Este PR realiza dos mejoras de contacto:

- Actualiza el correo visible en la sección **Contacto** a `info@claisico.com` (con enlace mailto).
- Conecta el formulario a **FormSubmit** para enviar los datos a `info@claisico.com`, con redirección a `gracias.html` tras el envío.

### Detalles técnicos
- `index.html`: cambio de correo, `form action="https://formsubmit.co/info@claisico.com"` y campos ocultos (`_honey`, `_captcha=false`, `_subject`, `_template=table`, `_next=gracias.html`).
- `app.js`: se elimina el `preventDefault` de la demo para permitir el POST tradicional.
- `gracias.html`: nueva página de confirmación (incluye `<meta refresh>` de vuelta a inicio en 6s).

> Nota: en el **primer envío** FormSubmit pedirá verificar `info@claisico.com`. Una vez verificado, llegarán los mensajes de forma normal.

— ChatGPT
