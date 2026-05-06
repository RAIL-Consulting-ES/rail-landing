# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

---

## Sobre RAIL Consulting

**RAIL Consulting** es una consultora tecnológica fundada por **Mario** y **David**. Aprovechamos el auge de la IA y el bajo coste actual de desarrollar software para entregar soluciones a medida a **startups y pymes**.

**Servicios:**
- Páginas web a medida
- ERPs y CRMs personalizados
- Automatización de procesos (con o sin IA)
- Consultoría tecnológica

En general: resolver fricciones y procesos a través de la tecnología.

## Sobre `rail-landing` (este repo)

Landing de captación dirigida a **clientes potenciales** (startups y pymes que evalúan partners tecnológicos). Su trabajo: comunicar de un vistazo qué hace RAIL y transmitir **seriedad, profesionalidad y confianza**.

**Decisiones de producto:**
- **Idioma:** copy principal en español. Se permiten subtítulos/taglines en inglés ocasionales como acento (ej. *"Integrating Artificial Intelligence"* ya presente en el Hero).
- **Sin case studies públicos.** Existe trabajo previo, pero no se mostrará. La confianza se construye por concreción (servicios, proceso, stack), no por validación externa.
- **Arquitectura: Red de Raíles** (ver sección abajo). La landing no es scroll-lineal, es navegación por una red.
- **URL única.** Toda la experiencia vive en `/`. La página `/about` queda **disuelta** en la red (se eliminará cuando el ramal "Sobre RAIL" esté listo).
- **Deep-linking por ramal** vía `pushState` cuando los ramales estén implementados.
- **Header:** sus anclas (`#expertise`, `#solutions`, `#case-studies`) son provisionales y se redefinirán cuando la red esté madura.

## Arquitectura — La Red de Raíles

La landing es una **red de raíles**: tras el Hero, un trencito desciende por un raíl vertical hasta un **nodo central de bifurcación**. El nodo presenta 3 destinos al usuario; al elegir, el tren recorre ese ramal, el usuario consume el contenido haciendo scroll dentro del ramal, y al final del ramal vuelve al nodo central.

**Modelo de navegación: Versión B (híbrida).**
- En cada nodo, el usuario **elige** destino haciendo click — no hay scroll lineal entre secciones.
- **Dentro de un ramal sí hay scroll vertical** (el tren avanza con el scroll del usuario).
- Al final de cada ramal: botón para volver al nodo central.

**Topología (decidida 2026-05-06):**

```
        [Hero]
           ↓
      [Nodo central]
       ╱    │    ╲
   Servicios Sobre RAIL Contacto
   (4 paradas)
```

- **Servicios:** ramal lineal con 4 estaciones internas (Web, ERP/CRM, Automatización, Consultoría) antes de volver al nodo.
- **Sobre RAIL:** ramal con presentación de Mario, David y la empresa.
- **Contacto:** ramal con formulario / CTA para empezar un proyecto.

**Tren:** SVG estilo **tren bala** (Shinkansen/AVE). Plano gráficamente, reconocible al instante. No realista detallado, no abstracto.

**Mobile:** misma metáfora — árbol vertical con tren bajando. No se sustituye por menú clásico.

**Estado de implementación:**
- ✓ Hero
- ✓ **Fase 1:** tren global, descenso entre A/I del Hero, nodo central, 3 botones-destino
- ✓ **Fase 2:** ramal Servicios (4 estaciones, tren horizontal scroll-driven, botón Volver)
- ◯ Fase 3: ramal Sobre RAIL
- ◯ Fase 4: ramal Contacto
- ◯ Fase 5: pulido, mobile, deep-linking, accesibilidad

**Mecánica actual de la red:**
- El tren global (`Train.astro`, position: fixed) anima vertical durante Hero+Network — entra entre A/I, llega al nodo.
- Click en cualquier botón con `data-destino="servicios"` (header o nodo) llama a `openBranch("servicios")` en `branch.ts`: oculta el tren global, hace `removeAttribute("hidden")` al ramal y scroll suave.
- Dentro del ramal Servicios, su propio tren (horizontal, SVG inline en `Services.astro`) cruza las 4 estaciones con scroll-driven animation. La descripción activa cambia con `data-active-station`.
- Click en `[data-back]` en el ramal: fade-out → ocultar ramal → scroll a Network → mostrar tren global.
- Los destinos `sobre` y `contacto` muestran un `console.log` placeholder.

## Filosofía visual y de interacción

La landing **no debe parecerse a una landing al uso**. Recorrerla tiene que ser una **experiencia**, no un scroll por bloques predecibles.

- **Geometría:** predominio de **líneas rectas**. La geometría dura comunica precisión y autoridad (alineado con la personalidad *"The Architect of the Future"* del `DESIGN.md`).
- **Animaciones scroll-driven:** la narrativa avanza con el scroll del usuario. El Hero ya consume 300vh con un `.hero__inner` sticky y una timeline GSAP — las siguientes secciones deben pensarse en esa misma línea.
- **Stack de animación:** **GSAP + ScrollTrigger**. David empezó con esto en `src/scripts/hero.ts` y es el patrón a seguir. Toda animación debe:
  - Respetar `prefers-reduced-motion` vía `gsap.matchMedia()` (ver patrón en `hero.ts`)
  - Estar inicializada en un script TS bajo `src/scripts/`, importado desde la página
  - Funcionar bien con las transiciones de Barba (las páginas se reinician al navegar)
- **Metáfora de marca — el "rail":** la marca se llama RAIL. El header ya tiene un elemento `rail__glow` que se ancla a las secciones al hacer scroll. La metáfora del raíl/vía debe explotarse de forma coherente a lo largo de la landing (no decorativa: estructural).

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
