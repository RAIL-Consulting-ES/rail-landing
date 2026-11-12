// Sitemap generado en build a partir del índice de páginas: siempre con el
// dominio canónico (www) y con la fecha de última revisión de cada página.
import type { APIRoute } from "astro";
import { allPages } from "../lib/pages";
import { abs } from "../data/site";

const LEGAL = [
	{ path: "/aviso-legal/", updated: "2026-06-10" },
	{ path: "/privacidad/", updated: "2026-06-10" },
];

export const GET: APIRoute = async () => {
	const pages = [...(await allPages()), ...LEGAL];
	const urls = pages
		.map(
			(p) =>
				`  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${p.updated}</lastmod>\n  </url>`,
		)
		.join("\n");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	return new Response(xml, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
};
