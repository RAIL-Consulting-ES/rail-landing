// Versión Markdown de cada página de servicio/sector: /consultoria-ia.md
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { mdResponse, paginaMd } from "../lib/markdown";

export async function getStaticPaths() {
	return (await getCollection("paginas")).map((entry) => ({
		params: { page: entry.id },
		props: { entry },
	}));
}

export const GET: APIRoute = ({ props }) => mdResponse(paginaMd(props.entry));
