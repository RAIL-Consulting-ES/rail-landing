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
| Rendimiento móvil de la home (Lighthouse) | 68/100, 4 s de bloqueo |

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
- **Rendimiento**: fuentes servidas desde el propio dominio (sin petición
  bloqueante a Google Fonts), imágenes optimizadas, caché larga para estáticos.
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
7. **Que el contenido sea honesto.** Las páginas dicen cuándo *no* hace falta IA
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

## 8. Cómo medir

| Qué | Dónde | Cuándo |
| --- | --- | --- |
| Páginas indexadas | Search Console → Indexación → Páginas | Semanal |
| Impresiones y consultas no de marca | Search Console → Rendimiento | Semanal |
| Posición por «consultoría ia sevilla» y las guías | Search Console → Rendimiento, filtro por consulta | Quincenal |
| Rendimiento | PageSpeed Insights sobre la home | Tras cada cambio de diseño |
| Citas en asistentes | Preguntar a ChatGPT, Perplexity y Gemini «consultoras de IA en Sevilla» y «qué es RAIL Consulting» | Mensual |
| Tráfico desde asistentes | Vercel Analytics → Referrers (chatgpt.com, perplexity.ai…) | Mensual |

Expectativa realista: la indexación de las páginas nuevas, en días o pocas
semanas; las primeras impresiones no de marca, en dos a seis semanas; posiciones
estables, en tres a seis meses y dependiendo sobre todo del punto 7.
