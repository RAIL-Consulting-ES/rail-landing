# Estrategia SEO y GEO de RAIL Consulting

Última revisión: 12 de noviembre de 2026.

SEO es aparecer en Google y Bing. GEO (*generative engine optimization*) es que
ChatGPT, Perplexity, Gemini, Copilot o los resúmenes de IA de Google **citen a
RAIL** cuando alguien pregunta por consultoría de IA o automatización. Las dos
cosas se ganan casi con lo mismo: páginas que responden bien a una pregunta
concreta, una identidad de marca inequívoca y que otros sitios hablen de ti.

## 1. Punto de partida (Search Console, 10 ago – 9 nov 2026)

| Indicador | Valor |
| --- | --- |
| Clics en 3 meses | 3 |
| Impresiones | 220 |
| Consultas con impresiones | 6, todas de marca («rail consulting») |
| Posición por «rail consulting» | 6,0 |
| Páginas indexadas | 7 |
| Páginas sin indexar | 19 |
| Rendimiento móvil de la home (Lighthouse) | 99/100, primer pintado a 1,7 s |

Línea base en asistentes de IA (Perplexity, 12 nov 2026):

| Pregunta | Respuesta |
| --- | --- |
| «¿Qué es RAIL Consulting, la consultora de Sevilla?» | La identifica, pero con el posicionamiento antiguo: «ingeniería de software a medida e integración de IA» |
| «¿Qué consultoras de IA y automatización hay en Sevilla para pymes?» | No menciona a RAIL |

Diagnóstico:

1. **El sitemap apuntaba al dominio sin `www`**, que redirige. Google veía 17
   URL «con redirección» y no indexaba las páginas de solución.
2. **La home no tenía texto**: un H1 que decía solo «RAIL» y tres párrafos. No
   había nada por lo que posicionar.
3. **Ninguna página respondía a lo que la gente busca.** El sitio describía
   soluciones técnicas (API Gateway, Cloud Native), no los problemas que busca
   un empresario («qué procesos se pueden automatizar», «cuánto cuesta
   implementar IA»).
4. **La marca es ambigua.** «Rail consulting» compite con consultoras
   ferroviarias y con una empresa homónima de México. Ni el sitio ni los datos
   estructurados decían con claridad «consultora de IA, Sevilla».
5. **Sin señales para asistentes de IA**: ni `llms.txt`, ni autoría, ni fechas,
   ni fuentes.

## 2. Posicionamiento

> RAIL Consulting es una consultora de ingeniería de Sevilla que estudia cómo
> trabaja una empresa, detecta dónde se pierde tiempo y lo recupera con
> inteligencia artificial, automatización y software a medida.

Esa frase (en `src/data/site.ts`) se repite, idéntica, en metadatos, datos
estructurados, `llms.txt`, pie y página «Nosotros». La repetición es deliberada:
es lo que permite a un buscador o a un modelo de lenguaje asociar la marca a una
categoría y a un lugar.

Reglas de marca:

- Nombre completo **RAIL Consulting** en títulos, schema y texto; «RAIL» como
  forma corta y en el logotipo.
- Siempre con **Sevilla** cerca, para desambiguar.
- Se vende **tiempo ahorrado**. ERP y CRM son una solución posible, no el foco.

## 3. Palabras clave y arquitectura

No competimos por «ERP a medida» (saturado) ni por «inteligencia artificial»
(imposible). Competimos por búsquedas con intención y cola larga, donde un
sitio nuevo puede entrar.

| Grupo | Búsquedas objetivo | Página |
| --- | --- | --- |
| Servicio principal | consultoría inteligencia artificial, consultoría IA para empresas / pymes | `/consultoria-ia/` |
| Oferta de entrada | estudio de procesos, auditoría de procesos, diagnóstico IA | `/estudio-de-procesos/` |
| Producto | agentes de IA para empresas, qué es un agente de IA | `/agentes-de-ia/` |
| Local | consultoría IA Sevilla, automatización procesos Sevilla | `/consultoria-ia-sevilla/` |
| Sectores | IA para gestorías / despachos de abogados / inmobiliarias / fábricas / distribución / instaladores | `/sectores/*` |
| Informativas | qué procesos se pueden automatizar, cuánto cuesta implementar IA, cómo implementar IA en una empresa, automatizar facturas, automatizar atención al cliente, RPA vs IA, n8n vs Make vs Zapier, software a medida vs estándar | `/guias/*` |
| Herramienta | calculadora ROI automatización, calcular ahorro automatización | `/calculadora-ahorro-automatizacion/` |
| Definiciones | qué es RPA, RAG, LLM, agente de IA… | `/glosario/` |
| Marca | rail consulting, RAIL Consulting Sevilla | `/`, `/nosotros/`, `/preguntas-frecuentes/` |
| Soluciones | automatización de procesos, ERP a medida, CRM a medida… | `/soluciones/*` |

Las guías captan a quien todavía se está informando y enlazan a los servicios.
Los servicios enlazan al contacto. Cada página tiene enlaces «Sigue leyendo» a
las relacionadas y el pie enlaza todas las páginas clave, así que nada queda a
más de dos clics de la home.

En la home, el contenido pensado para buscadores (definición y preguntas
frecuentes) va **después del CTA**: el recorrido animado, el hero y la cabecera
no se tocan.

Las URL pasan a español (`/soluciones/`, `/nosotros/`, `/contacto/`) con
redirección permanente desde las antiguas (`vercel.json`).

## 4. SEO técnico aplicado

- **Dominio canónico** `https://www.railconsulting.es` en canonical, sitemap,
  robots y schema.
- **Sitemap generado en build** (`src/pages/sitemap.xml.ts`) a partir del índice
  de páginas (`src/lib/pages.ts`), con `lastmod`.
- **Datos estructurados** en un único grafo por página (`src/lib/schema.ts`):
  `Organization` (con sede, fundadores, `sameAs`), `WebSite`, `WebPage`,
  `BreadcrumbList` y, según la página, `Service`, `FAQPage`, `Article`,
  `Person`, `ItemList` o `DefinedTermSet`.
- **Título y descripción únicos** por página; H1 con la búsqueda objetivo.
- **Rendimiento**: ya era bueno; se quita la petición bloqueante a Google
  Fonts (fuentes servidas desde el propio dominio), se optimizan las fotos y se
  da caché larga a los estáticos.
- **Migas de pan** visibles y en schema.

## 5. GEO aplicado

Lo que hace que un asistente de IA cite una página:

1. **Que pueda leerla.** Todo el contenido está en el HTML, sin depender de
   JavaScript. `robots.txt` permite de forma explícita a GPTBot, OAI-SearchBot,
   ClaudeBot, PerplexityBot, Google-Extended y demás.
2. **Que encuentre la respuesta entera en un párrafo.** Cada página abre con un
   bloque «En pocas palabras / Respuesta corta» que se sostiene solo y nombra a
   RAIL Consulting. Es el fragmento pensado para ser citado.
3. **Que la estructura coincida con la pregunta.** Encabezados en forma de
   pregunta, tablas comparativas, listas numeradas y preguntas frecuentes con
   `FAQPage`.
4. **Que sea verificable.** Autor con nombre y perfil, fecha de publicación y de
   revisión, y cifras con fuente oficial enlazada (INE, EUR-Lex).
5. **Que sea fácil de ingerir.** `/llms.txt` resume el sitio, `/llms-full.txt`
   lo contiene entero y cada página tiene versión Markdown (`/consultoria-ia.md`).
6. **Que la entidad esté clara.** Misma definición, mismo nombre y misma ciudad
   en todas partes.
7. **Que un asistente pueda usar la web, no solo leerla.** El formulario de
   contacto y la calculadora se exponen como herramientas WebMCP
   (`send-contact-message` y `calculate_automation_savings`). Hoy solo lo
   entiende Chromium en vista previa; el resto de navegadores lo ignora. El
   contacto nunca se envía solo: el navegador se detiene para que la persona
   revise.
8. **Que el contenido sea honesto.** Las páginas dicen cuándo *no* hace falta IA
   y no inventan cifras ni clientes. Los modelos premian las fuentes que no
   parecen publicidad, y un dato inventado que se cite es un problema.

## 6. Normas de contenido

- **Nada inventado.** Ni clientes, ni resultados, ni precios de RAIL. Las cifras
  de ejemplo se marcan como ejemplo; las de mercado, como orientativas.
- **Cifras externas, con fuente oficial y fecha.**
- **Respuesta primero**, desarrollo después.
- **Una página, una pregunta.**
- **Fecha de revisión real.** Al cambiar una página, actualizar `updated`.

Para añadir una guía: crear un `.md` en `src/content/guias/` con el mismo
frontmatter que las existentes. El sitemap, `llms.txt`, el listado de guías y el
schema se actualizan solos.

## 7. Lo que no se puede hacer desde el código (pendiente del equipo)

Por orden de impacto:

1. **Perfil de empresa en LinkedIn** para RAIL Consulting, y añadir su URL a
   `sameAs` en `src/data/site.ts`. Hoy solo constan los perfiles personales.
2. **Google Business Profile** (ficha de Google Maps). Es lo que más pesa en
   búsquedas locales como «consultoría IA Sevilla». Requiere verificar una
   dirección; puede configurarse como negocio que atiende a domicilio sin
   mostrarla.
3. **Bing Webmaster Tools**: dar de alta el sitio (se puede importar desde
   Search Console). ChatGPT y Copilot se apoyan en el índice de Bing.
4. **Enlaces desde trabajos reales.** El crédito «Desarrollado por Rail
   Consulting» en webs de clientes (como el previsto en la web del CSIC) es el
   mejor enlace posible. Pedirlo siempre, apuntando a `https://www.railconsulting.es/`.
5. **Casos reales.** Cuando haya un cliente que autorice contarlo, publicar el
   caso con cifras (horas ahorradas). Es el contenido que más convierte y el que
   más citan los asistentes.
6. **Directorios y menciones**: Clutch, Sortlist, directorios de empresas
   tecnológicas andaluzas, cámara de comercio, asociaciones sectoriales.
7. **Publicar con constancia**: una guía nueva al mes, y cada publicación de
   LinkedIn de los fundadores enlazando a una guía.
8. **Datos de la SL** cuando esté constituida: razón social en `legalName` del
   schema y en el aviso legal.

## 8. Después de cada despliegue a producción

1. `npm run indexnow` — avisa a Bing (y con él a ChatGPT y Copilot) de las URL
   del sitemap.
2. Search Console → **Sitemaps**: comprobar que `sitemap.xml` se ha leído y el
   número de páginas descubiertas coincide.
3. Search Console → **Inspección de URLs** → «Solicitar indexación» para las
   páginas nuevas o cambiadas (hay un cupo diario de unas diez).
4. [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results)
   sobre una página de cada tipo si se ha tocado el schema.

## 9. Cómo medir

| Qué | Dónde | Cuándo |
| --- | --- | --- |
| Páginas indexadas | Search Console → Indexación → Páginas | Semanal |
| Impresiones y consultas no de marca | Search Console → Rendimiento | Semanal |
| Posición por «consultoría ia sevilla» y las guías | Search Console → Rendimiento, filtro por consulta | Quincenal |
| Rendimiento | PageSpeed Insights sobre la home | Tras cada cambio de diseño |
| Citas en asistentes | Preguntar a ChatGPT, Perplexity y Gemini «consultoras de IA en Sevilla» y «qué es RAIL Consulting» | Mensual |
| Tráfico desde asistentes | Vercel Analytics → Referrers (chatgpt.com, perplexity.ai…) | Mensual |

### Registro

**12 nov 2026 — primer despliegue de la estrategia.**

- Producción verificada: las 41 URL del sitemap responden 200, las URL antiguas
  redirigen (308) a las nuevas y Lighthouse da 95–100 en rendimiento y 100 en
  SEO y accesibilidad sobre la home, un servicio y una guía.
- Search Console: sitemap reenviado y leído el mismo día, **41 páginas
  descubiertas** (antes 17).
- Indexación solicitada a mano para 10 URL: `/`, `/consultoria-ia/`,
  `/consultoria-ia-sevilla/`, `/estudio-de-procesos/`, `/agentes-de-ia/`,
  `/guias/`, las guías de coste y de procesos automatizables, `/soluciones/` y
  `/nosotros/`. El resto entra por el sitemap; si en dos semanas alguna sigue
  «descubierta, sin indexar», solicitarla también.
- IndexNow: 41 URL enviadas, aceptadas (HTTP 202).
- Prueba de resultados enriquecidos sobre una guía: artículo, migas de pan y
  organización válidos. Google ya no muestra el resultado enriquecido de
  preguntas frecuentes salvo en webs oficiales y de salud; el `FAQPage` se
  mantiene porque lo leen los asistentes de IA.

Próxima medición: semana del 23 nov 2026 (páginas indexadas y primeras
impresiones no de marca).

Expectativa realista: la indexación de las páginas nuevas, en días o pocas
semanas; las primeras impresiones no de marca, en dos a seis semanas; posiciones
estables, en tres a seis meses y dependiendo sobre todo del punto 7.
