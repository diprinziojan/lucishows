# Publicación en Cloudflare

La estructura de public está corregida y el proyecto compila con OpenNext.

1. Sustituir el contenido del repositorio por el contenido de esta carpeta, conservando public y src como carpetas. No subir el ZIP como archivo al repositorio.
2. Crear una aplicación Workers conectada al repositorio lucishows y rama main. La aplicación Pages configurada para HTML no ejecuta este proyecto Next.js.
3. Comando de construcción: npm run build:cloudflare
4. Comando de despliegue: npx wrangler deploy
5. Directorio raíz: raíz del repositorio.
6. Añadir el dominio lucianalopez.es al Worker cuando el despliegue esté listo.

Los formularios requieren el secreto RESEND_API_KEY. El código actual envía las solicitudes a pedroansiofuentes@gmail.com y utiliza management@lucishows.com como dirección de contacto. Estas direcciones se han conservado; conviene confirmar su vigencia antes de activar el formulario.

Validación: compilación de Next.js y OpenNext completada; comprobación wrangler deploy --dry-run completada. No se ha realizado una publicación real.
