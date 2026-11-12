// Versión Markdown de cada guía: /guias/<slug>.md
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { FOUNDERS } from "../../data/site";
import { guiaMd, mdResponse } from "../../lib/markdown";

export async function getStaticPaths() {
	return (await getCollection("guias")).map((entry) => ({
		params: { slug: entry.id },
		props: { entry },
	}));
}

export const GET: APIRoute = ({ props }) => {
	const author = FOUNDERS.find((f) => f.id === props.entry.data.author)!;
	return mdResponse(guiaMd(props.entry, author.name));
};
