# Publicación en Cloudflare

La estructura de public está corregida y el proyecto compila con OpenNext.

1. Sustituir el contenido del repositorio por el contenido de esta carpeta, conservando public y src como carpetas. No subir el ZIP como archivo al repositorio.
2. Crear una aplicación Workers conectada al repositorio lucishows y rama main. La aplicación Pages configurada para HTML no ejecuta este proyecto Next.js.
3. Comando de construcción: npm run build:cloudflare
4. Comando de despliegue: npx wrangler deploy
5. Directorio raíz: raíz del repositorio.
6. Añadir el dominio lucianalopez.es al Worker cuando el despliegue esté listo.

## Correo de los formularios

- Las solicitudes de agencia, colaboraciones y propuestas llegan a `lucianalopezfb@gmail.com`.
- En el Worker `lucishows`, configurar el secreto `RESEND_API_KEY` con una clave válida de Resend. No guardar claves en GitHub.
- Verificar un dominio remitente en Resend y configurar `CONTACT_FROM_EMAIL` con una dirección de ese dominio, por ejemplo `Luciana López <web@lucianalopez.es>` si ese dominio se ha verificado. La dirección de Gmail es el destinatario, no el remitente.
- Mientras no se configure un remitente de producción, se conserva `onboarding@resend.dev`, que tiene restricciones de prueba. Las confirmaciones al visitante solo se activan con `CONTACT_FROM_EMAIL`.
- Las confirmaciones del formulario de propuesta permiten responder a `lucianalopezfb@gmail.com`. Si una confirmación falla, una solicitud ya entregada sigue mostrándose como enviada.
- Todos los enlaces públicos de contacto utilizan `lucianalopezfb@gmail.com`.
- Si falla el envío, los formularios conservan los datos y ofrecen abrir una solicitud preparada en el cliente de correo del visitante. El visitante debe enviarla; no se muestra una confirmación falsa de entrega.

La configuración de Resend y la entrega real deben verificarse en la cuenta. Las pruebas locales utilizan un proveedor simulado y no envían correos reales.
