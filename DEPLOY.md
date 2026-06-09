# Deploy en Vercel

Sitio estático Astro. La configuración vive en [`vercel.json`](./vercel.json):
framework Astro, `astro build` → `dist/`, `trailingSlash: true` (301 de `/ruta`
a `/ruta/`, coherente con los canónicos) y cabeceras de seguridad.

## Primera vez (una sola persona)

### Opción A — Dashboard (recomendada, deploys automáticos)

1. En [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo
   `RAIL-Consulting-ES/landing-RAIL`.
2. Framework: **Astro** (se autodetecta; `vercel.json` ya lo fija). No cambies
   build command ni output.
3. **Environment Variables** → añade:
   - `PUBLIC_WEB3FORMS_KEY` = _tu access key de [web3forms.com](https://web3forms.com)_
     (marca Production y Preview). Sin ella el formulario no envía.
4. **Deploy**. Cada push a `main` desplegará a producción y cada PR tendrá su
   preview.

### Opción B — CLI

```bash
vercel login
vercel link          # vincula este repo a un proyecto de Vercel
vercel env add PUBLIC_WEB3FORMS_KEY production   # pega la key
vercel --prod        # primer deploy a producción
```

## Dominio

En **Project → Settings → Domains** añade `railconsulting.es` (y `www` si se
quiere, redirigiendo a la raíz). Vercel indica los registros DNS:

- Apex `railconsulting.es` → registro `A` a `76.76.21.21` (o el que indique
  Vercel), o `ALIAS/ANAME` a `cname.vercel-dns.com`.
- `www` → `CNAME` a `cname.vercel-dns.com`.

El sitio ya genera `sitemap.xml`, `robots.txt` y una `404.html` propia que
Vercel sirve automáticamente. El `site` de Astro ya apunta a
`https://railconsulting.es`.
