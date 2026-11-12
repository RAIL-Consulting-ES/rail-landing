import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const faq = z
	.array(z.object({ question: z.string(), answer: z.string() }))
	.default([]);

// Páginas de servicio, sector y ámbito local. La ruta sale del nombre del
// archivo: `consultoria-ia.md` → /consultoria-ia/, `sectores/x.md` → /sectores/x/.
const paginas = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/paginas" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		h1: z.string(),
		eyebrow: z.string(),
		lead: z.string(),
		// Respuesta directa a "¿qué es / qué hacéis?": el párrafo que citan
		// buscadores y asistentes de IA.
		answer: z.string(),
		kind: z.enum(["servicio", "sector", "local"]),
		// Nombre corto para tarjetas, migas y listados.
		short: z.string(),
		serviceType: z.string(),
		areaServed: z.string().optional(),
		updated: z.string(),
		order: z.number().default(50),
		faq,
		related: z.array(z.string()).default([]),
	}),
});

const guias = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/guias" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		h1: z.string(),
		lead: z.string(),
		answer: z.string(),
		short: z.string(),
		published: z.string(),
		updated: z.string(),
		author: z.enum(["mario-pantoja", "david-gutierrez"]),
		keywords: z.array(z.string()).default([]),
		order: z.number().default(50),
		faq,
		related: z.array(z.string()).default([]),
	}),
});

export const collections = { paginas, guias };
