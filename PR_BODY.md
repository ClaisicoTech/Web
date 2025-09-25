# Fix: formulario envía por POST a FormSubmit

Este PR asegura que el formulario **hace POST** (no GET) a FormSubmit:

- En `index.html` el `<form>` lleva `method="POST"` y el botón de envío está **dentro** del `<form>` con `type="submit"`.
- En `app.js` se elimina cualquier `preventDefault()` que bloquee el envío (mantenemos POST tradicional).

### Bloque de formulario (referencia rápida)
```html
<form action="https://formsubmit.co/info@claisico.com" method="POST" id="contactForm">
  <input type="text" name="_honey" style="display:none">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_subject" value="Nuevo contacto desde claisico.com">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_next" value="gracias.html">

  <p><input class="w3-input w3-border" type="text" placeholder="Nombre" required name="name"></p>
  <p><input class="w3-input w3-border" type="email" placeholder="Correo" required name="email"></p>
  <p><input class="w3-input w3-border" type="text" placeholder="Empresa" name="company"></p>
  <p><textarea class="w3-input w3-border" rows="3" placeholder="¿Qué te gustaría automatizar?" name="message"></textarea></p>
  <p>
    <button class="w3-button w3-black" type="submit" formmethod="post">
      <i class="fa fa-paper-plane"></i> Enviar
    </button>
  </p>
</form>
```

> Revisa en **Settings → Pages** que estás publicando desde la rama que recibirá este PR. Tras el merge, prueba el envío y verifica que en la pestaña *Network* la request a `formsubmit.co/...` sea **Method: POST**.
