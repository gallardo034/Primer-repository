# Sebastian Weisz Arquitectura

Sitio profesional estatico con backend serverless para Vercel.

## Que incluye

- Landing page responsive en `index.html`.
- Estilos en `styles.css`.
- Interacciones y envio del formulario en `script.js`.
- Backend de contacto en `api/contact.js`.
- SEO tecnico: title, description, canonical, Open Graph, Twitter Card y JSON-LD.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` y favicon SVG.
- Configuracion de Vercel en `vercel.json`.

## Como verlo en local

La web visual se puede abrir directo con doble clic en:

```txt
index.html
```

Para probar tambien el backend `/api/contact`, conviene usar Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Despues abrir:

```txt
http://localhost:3000
```

## Variables de entorno

El formulario usa Resend para mandar emails desde Vercel.

Crear estas variables en Vercel, dentro del proyecto:

```txt
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=sebastianweisz@gmail.com
CONTACT_FROM_EMAIL=Sebastian Weisz Arquitectura <consultas@tudominio.com>
```

Tambien hay una copia de ejemplo en `.env.example`.

Importante: para que Resend envie desde `consultas@tudominio.com`, primero hay que verificar el dominio en Resend. Mientras tanto se puede usar un remitente de prueba autorizado por Resend.

## Como subirlo con GitHub y Vercel

1. Crear un repositorio nuevo en GitHub.
2. Subir todos estos archivos al repo.
3. Entrar a Vercel y elegir `Add New Project`.
4. Importar el repo desde GitHub.
5. Framework preset: `Other`.
6. Build command: dejar vacio.
7. Output directory: dejar vacio.
8. Agregar las variables de entorno.
9. Deploy.

## Cambios necesarios antes de publicar con dominio real

Reemplazar `https://sebastian-weisz-arquitectura.vercel.app/` por el dominio final en:

- `index.html`
- `robots.txt`
- `sitemap.xml`

Cuando el cliente tenga dominio propio, por ejemplo `sebastianweisz.com`, esos archivos deberian usar:

```txt
https://sebastianweisz.com/
```

## Como reemplazar imagenes

Ahora la web usa imagenes temporales de Unsplash con URLs externas, para que se vean en Vercel aunque todavia no tengamos fotos propias.

Cuando lleguen las fotos reales del cliente, guardarlas dentro de `assets/` y cambiar los `src` en `index.html`.

Ejemplo:

```html
<img src="assets/casa-nunez.jpg" alt="Casa contemporanea en Nunez" />
```

## Checklist profesional pendiente

- Reemplazar imagenes generadas por fotos reales de obra.
- Agregar ubicacion, ano, superficie y alcance a cada proyecto.
- Definir dominio final.
- Verificar dominio en Resend.
- Conectar Google Search Console cuando el sitio este publicado.
- Crear perfil de Google Business si el estudio quiere captar busquedas locales.
