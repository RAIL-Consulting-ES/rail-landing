// llms-full.txt: todo el contenido del sitio en un único Markdown.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { abs, FOUNDERS, SITE } from "../data/site";
import { faqGroups } from "../data/faq";
import { glosario } from "../data/glosario";
import { solutions } from "../data/solutions";
import contentData from "../data/solutions-content.json";
import { guiaMd, mdResponse, paginaMd } from "../lib/markdown";

type SolutionContent = {
	h1: string;
	definition: string;
	problemHeading: string;
	problemBody: string;
	approachHeading: string;
	approach: { title: string; body: string }[];
	benefits: { title: string; body: string }[];
	faq: { question: string; answer: string }[];
};

export const GET: APIRoute = async () => {
	const paginas = (await getCollection("paginas")).sort(
		(a, b) => a.data.order - b.data.order,
	);
	const guias = (await getCollection("guias")).sort(
		(a, b) => a.data.order - b.data.order,
	);
	const content = contentData as unknown as Record<string, SolutionContent>;

	const solutionMd = solutions
		.filter((s) => content[s.slug])
		.map((s) => {
			const c = content[s.slug];
			return [
				`# ${c.h1}`,
				`> ${c.definition}`,
				`Fuente: ${abs(`/soluciones/${s.path}/`)} · ${SITE.name}`,
				`## ${c.problemHeading}\n\n${c.problemBody}`,
				`## ${c.approachHeading}\n\n${c.approach.map((a) => `- **${a.title}.** ${a.body}`).join("\n")}`,
				`## Beneficios\n\n${c.benefits.map((b) => `- **${b.title}.** ${b.body}`).join("\n")}`,
				`## Preguntas frecuentes\n\n${c.faq.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}`,
			].join("\n\n");
		});

	const faqMd = `# Preguntas frecuentes sobre ${SITE.name}\n\nFuente: ${abs("/preguntas-frecuentes/")}\n\n${faqGroups
		.map(
			(g) =>
				`## ${g.title}\n\n${g.items.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}`,
		)
		.join("\n\n")}`;

	const glosMd = `# Glosario de IA y automatización para empresas\n\nFuente: ${abs("/glosario/")}\n\n${glosario
		.map((t) => `- **${t.term}:** ${t.def}`)
		.join("\n")}`;

	const about = `# ${SITE.name}\n\n> ${SITE.description}\n\n- Web: ${SITE.url}/\n- Sede: ${SITE.city}, ${SITE.region}, España\n- Contacto: ${SITE.email}\n- Fundadores:\n${FOUNDERS.map((f) => `  - ${f.name}, ${f.role}. ${f.bio}`).join("\n")}`;

	const sections = [
		about,
		...paginas.map(paginaMd),
		...guias.map((g) =>
			guiaMd(g, FOUNDERS.find((f) => f.id === g.data.author)!.name),
		),
		...solutionMd,
		faqMd,
		glosMd,
	];
	return mdResponse(sections.map((s) => s.trim()).join("\n\n---\n\n") + "\n");
};
