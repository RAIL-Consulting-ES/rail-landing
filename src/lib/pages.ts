// Índice de todas las páginas enlazables del sitio. Lo usan las tarjetas de
// "relacionado", el sitemap y llms.txt, para que los tres salgan del mismo sitio.
import { getCollection } from "astro:content";
import { solutions } from "../data/solutions";

export type PageRef = {
	path: string;
	title: string;
	description: string;
	group: "servicio" | "sector" | "local" | "solucion" | "guia" | "base";
	updated: string;
	order: number;
};

const SITE_UPDATED = "2026-11-12";

const base: PageRef[] = [
	{
		path: "/",
		title: "Inicio",
		description:
			"Consultoría de IA y automatización: estudiamos cómo trabaja tu empresa y recuperamos el tiempo que se pierde.",
		group: "base",
		updated: SITE_UPDATED,
		order: 0,
	},
	{
		path: "/soluciones/",
		title: "Soluciones",
		description:
			"Las once piezas con las que construimos: automatización, IA, datos, integraciones y software a medida.",
		group: "base",
		updated: SITE_UPDATED,
		order: 1,
	},
	{
		path: "/sectores/",
		title: "Sectores",
		description:
			"Dónde se pierde el tiempo en cada sector y qué se puede automatizar.",
		group: "base",
		updated: SITE_UPDATED,
		order: 2,
	},
	{
		path: "/guias/",
		title: "Guías",
		description:
			"Guías prácticas sobre IA y automatización de procesos para empresas.",
		group: "base",
		updated: SITE_UPDATED,
		order: 3,
	},
	{
		path: "/glosario/",
		title: "Glosario de IA y automatización",
		description:
			"Definiciones claras de los términos de IA y automatización que más se usan en la empresa.",
		group: "base",
		updated: SITE_UPDATED,
		order: 4,
	},
	{
		path: "/preguntas-frecuentes/",
		title: "Preguntas frecuentes",
		description:
			"Respuestas directas sobre cómo trabaja RAIL Consulting, plazos, costes y datos.",
		group: "base",
		updated: SITE_UPDATED,
		order: 5,
	},
	{
		path: "/nosotros/",
		title: "Nosotros",
		description: "Quién está detrás de RAIL Consulting.",
		group: "base",
		updated: SITE_UPDATED,
		order: 6,
	},
	{
		path: "/contacto/",
		title: "Contacto",
		description: "Cuéntanos cómo trabaja tu empresa.",
		group: "base",
		updated: SITE_UPDATED,
		order: 7,
	},
];

export const pagePath = (id: string) => `/${id}/`;
export const guidePath = (id: string) => `/guias/${id}/`;

export async function allPages(): Promise<PageRef[]> {
	const paginas = await getCollection("paginas");
	const guias = await getCollection("guias");
	return [
		...base,
		...paginas.map((p) => ({
			path: pagePath(p.id),
			title: p.data.short,
			description: p.data.description,
			group: p.data.kind,
			updated: p.data.updated,
			order: p.data.order,
		})),
		...solutions.map((s, i) => ({
			path: `/soluciones/${s.path}/`,
			title: s.title,
			description: s.copy,
			group: "solucion" as const,
			updated: SITE_UPDATED,
			order: i,
		})),
		...guias.map((g) => ({
			path: guidePath(g.id),
			title: g.data.short,
			description: g.data.description,
			group: "guia" as const,
			updated: g.data.updated,
			order: g.data.order,
		})),
	].sort((a, b) => a.order - b.order);
}

/** Resuelve rutas de `related` a tarjetas; falla en build si una ruta no existe. */
export async function resolveRelated(paths: string[]): Promise<PageRef[]> {
	const index = new Map((await allPages()).map((p) => [p.path, p]));
	return paths.map((p) => {
		const ref = index.get(p);
		if (!ref) throw new Error(`Ruta relacionada inexistente: ${p}`);
		return ref;
	});
}

const fmt = new Intl.DateTimeFormat("es-ES", {
	day: "numeric",
	month: "long",
	year: "numeric",
	timeZone: "UTC",
});
export const formatDate = (iso: string) => fmt.format(new Date(iso));
