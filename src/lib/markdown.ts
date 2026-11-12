// Versiones en Markdown del contenido, para asistentes de IA (llms.txt,
// llms-full.txt y los .md de cada página). Mismo texto que el HTML, sin diseño.
import type { CollectionEntry } from "astro:content";
import { abs, SITE } from "../data/site";
import type { Faq } from "./schema";
import { guidePath, pagePath } from "./pages";

/** Convierte los enlaces internos del Markdown en URL absolutas. */
const absLinks = (md: string) =>
	md.replace(/\]\((\/[^)]*)\)/g, (_, p) => `](${abs(p)})`);

const faqMd = (faq: Faq[]) =>
	faq.length
		? `\n## Preguntas frecuentes\n\n${faq
				.map((f) => `### ${f.question}\n\n${f.answer}`)
				.join("\n\n")}\n`
		: "";

export function paginaMd(e: CollectionEntry<"paginas">): string {
	const d = e.data;
	return [
		`# ${d.h1}`,
		`> ${d.answer}`,
		`Fuente: ${abs(pagePath(e.id))} · ${SITE.name} · Última revisión: ${d.updated}`,
		d.lead,
		absLinks(e.body ?? "").trim(),
		faqMd(d.faq).trim(),
	]
		.filter(Boolean)
		.join("\n\n")
		.concat("\n");
}

export function guiaMd(e: CollectionEntry<"guias">, author: string): string {
	const d = e.data;
	return [
		`# ${d.h1}`,
		`> ${d.answer}`,
		`Fuente: ${abs(guidePath(e.id))} · Por ${author}, ${SITE.name} · Publicado: ${d.published} · Actualizado: ${d.updated}`,
		d.lead,
		absLinks(e.body ?? "").trim(),
		faqMd(d.faq).trim(),
	]
		.filter(Boolean)
		.join("\n\n")
		.concat("\n");
}

export const mdResponse = (body: string) =>
	new Response(body, {
		headers: { "Content-Type": "text/markdown; charset=utf-8" },
	});
