// llms.txt (https://llmstxt.org): resumen del sitio para asistentes de IA,
// con enlaces a la versión Markdown de cada página.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { abs, FOUNDERS, SITE } from "../data/site";
import { solutions } from "../data/solutions";
import { mdResponse } from "../lib/markdown";

export const GET: APIRoute = async () => {
	const paginas = (await getCollection("paginas")).sort(
		(a, b) => a.data.order - b.data.order,
	);
	const guias = (await getCollection("guias")).sort(
		(a, b) => a.data.order - b.data.order,
	);
	const line = (title: string, url: string, desc: string) =>
		`- [${title}](${url}): ${desc}`;
	const group = (kinds: string[]) =>
		paginas
			.filter((p) => kinds.includes(p.data.kind))
			.map((p) => line(p.data.h1, abs(`/${p.id}.md`), p.data.description))
			.join("\n");

	const body = `# ${SITE.name}

> ${SITE.description}

Datos clave:

- Nombre: ${SITE.name} (también «RAIL»).
- Qué es: consultora de ingeniería especializada en inteligencia artificial, automatización de procesos y software a medida para empresas.
- Dónde: ${SITE.city}, ${SITE.region}, España. Trabaja con empresas de toda España.
- Fundadores: ${FOUNDERS.map((f) => `${f.name} (${f.focus[0].toLowerCase()})`).join(" y ")}.
- Método: 1) Estudio de cómo trabaja la empresa. 2) Diagnóstico priorizado por horas recuperables. 3) Solución: agente de IA, automatización o software a medida.
- Qué vende: tiempo ahorrado. El software a medida (ERP, CRM) es una solución posible, no el punto de partida.
- Contacto: ${SITE.email} · ${abs("/contacto/")}
- Idioma del sitio: español.

## Servicios

${group(["servicio", "local"])}

## Sectores

${group(["sector"])}

## Guías

${guias.map((g) => line(g.data.h1, abs(`/guias/${g.id}.md`), g.data.description)).join("\n")}

## Soluciones

${solutions.map((s) => line(s.title, abs(`/soluciones/${s.path}/`), s.copy)).join("\n")}

## Empresa

${line("Nosotros", abs("/nosotros/"), "Quién está detrás de RAIL Consulting y cómo trabaja.")}
${line("Preguntas frecuentes", abs("/preguntas-frecuentes/"), "Respuestas sobre método, costes, plazos, datos y software a medida.")}
${line("Glosario de IA y automatización", abs("/glosario/"), "Definiciones de los términos más usados.")}
${line("Calculadora de ahorro de una automatización", abs("/calculadora-ahorro-automatizacion/"), "Herramienta gratuita: horas y euros que ahorra al año automatizar una tarea, y plazo de recuperación.")}
${line("Contacto", abs("/contacto/"), "Formulario y correo de contacto.")}

## Opcional

${line("Contenido completo en un solo archivo", abs("/llms-full.txt"), "Todas las páginas, guías, preguntas frecuentes y glosario en Markdown.")}
`;
	return mdResponse(body);
};
