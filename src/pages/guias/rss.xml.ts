// Feed RSS de las guías: para lectores, agregadores y rastreadores que
// descubren contenido nuevo por esta vía.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { abs, FOUNDERS, SITE } from "../../data/site";
import { guidePath } from "../../lib/pages";

const esc = (s: string) =>
	s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = async () => {
	const guias = (await getCollection("guias")).sort((a, b) =>
		b.data.published.localeCompare(a.data.published) || a.data.order - b.data.order,
	);
	const items = guias
		.map((g) => {
			const url = abs(guidePath(g.id));
			const author = FOUNDERS.find((f) => f.id === g.data.author)!.name;
			return `    <item>
      <title>${esc(g.data.h1)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(g.data.answer)}</description>
      <dc:creator>${esc(author)}</dc:creator>
      <pubDate>${new Date(g.data.published).toUTCString()}</pubDate>
    </item>`;
		})
		.join("\n");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Guías de IA y automatización — ${SITE.name}</title>
    <link>${abs("/guias/")}</link>
    <description>Guías prácticas sobre inteligencia artificial y automatización de procesos para empresas.</description>
    <language>es-ES</language>
    <atom:link href="${abs("/guias/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
};
