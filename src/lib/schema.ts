// Constructores de datos estructurados (schema.org / JSON-LD).
// Todas las páginas comparten un mismo grafo: Organization y WebSite se
// declaran una vez (Layout) y el resto de nodos los referencian por @id.
import { SITE, FOUNDERS, founderUrl, abs } from "../data/site";

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export type Crumb = { name: string; path: string };
export type Faq = { question: string; answer: string };

export const personNode = (f: (typeof FOUNDERS)[number]) => ({
	"@type": "Person",
	"@id": founderUrl(f.id),
	name: f.name,
	jobTitle: f.jobTitle,
	description: f.bio,
	url: founderUrl(f.id),
	worksFor: { "@id": ORG_ID },
	alumniOf: { "@type": "CollegeOrUniversity", name: f.education },
	knowsAbout: f.focus,
	sameAs: [f.linkedin],
});

export const organizationNode = () => ({
	"@type": "Organization",
	"@id": ORG_ID,
	name: SITE.name,
	alternateName: [SITE.shortName, "Rail Consulting"],
	url: `${SITE.url}/`,
	logo: {
		"@type": "ImageObject",
		"@id": `${SITE.url}/#logo`,
		url: abs("/logo.png"),
		width: 512,
		height: 512,
	},
	image: abs("/og-image.png"),
	description: SITE.description,
	slogan: SITE.tagline,
	email: SITE.email,
	address: {
		"@type": "PostalAddress",
		addressLocality: SITE.city,
		addressRegion: SITE.region,
		addressCountry: SITE.country,
	},
	areaServed: { "@type": "Country", name: "España" },
	knowsAbout: SITE.knowsAbout,
	knowsLanguage: "es",
	// Con nombre y perfil en línea: así el nodo se sostiene solo en las páginas
	// que no incluyen el Person completo (mismo @id, se fusionan donde sí está).
	founder: FOUNDERS.map((f) => ({
		"@type": "Person",
		"@id": founderUrl(f.id),
		name: f.name,
		jobTitle: f.jobTitle,
		sameAs: [f.linkedin],
	})),
	contactPoint: {
		"@type": "ContactPoint",
		contactType: "sales",
		email: SITE.email,
		url: abs("/contacto/"),
		availableLanguage: "es",
		areaServed: "ES",
	},
	sameAs: [...SITE.sameAs, ...FOUNDERS.map((f) => f.linkedin)],
});

/** Fecha `YYYY-MM-DD` con hora y zona: Google la da por inválida sin ellas. */
export const isoDate = (day: string) => `${day}T00:00:00+01:00`;

export const websiteNode = () => ({
	"@type": "WebSite",
	"@id": WEBSITE_ID,
	url: `${SITE.url}/`,
	name: SITE.name,
	alternateName: SITE.shortName,
	description: SITE.description,
	inLanguage: SITE.locale,
	publisher: { "@id": ORG_ID },
});

export const breadcrumbNode = (url: string, crumbs: Crumb[]) => ({
	"@type": "BreadcrumbList",
	"@id": `${url}#breadcrumb`,
	itemListElement: [{ name: "Inicio", path: "/" }, ...crumbs].map((c, i) => ({
		"@type": "ListItem",
		position: i + 1,
		name: c.name,
		item: abs(c.path),
	})),
});

export const webPageNode = (opts: {
	url: string;
	type?: string;
	title: string;
	description: string;
	hasBreadcrumb: boolean;
	modified?: string;
	published?: string;
}) => ({
	"@type": opts.type ?? "WebPage",
	"@id": `${opts.url}#webpage`,
	url: opts.url,
	name: opts.title,
	description: opts.description,
	inLanguage: SITE.locale,
	isPartOf: { "@id": WEBSITE_ID },
	about: { "@id": ORG_ID },
	...(opts.hasBreadcrumb
		? { breadcrumb: { "@id": `${opts.url}#breadcrumb` } }
		: {}),
	...(opts.published ? { datePublished: isoDate(opts.published) } : {}),
	...(opts.modified ? { dateModified: isoDate(opts.modified) } : {}),
});

export const serviceNode = (opts: {
	url: string;
	name: string;
	serviceType: string;
	description: string;
	areaServed?: string;
}) => ({
	"@type": "Service",
	"@id": `${opts.url}#service`,
	name: opts.name,
	serviceType: opts.serviceType,
	description: opts.description,
	provider: { "@id": ORG_ID },
	areaServed: opts.areaServed
		? { "@type": "City", name: opts.areaServed }
		: { "@type": "Country", name: "España" },
	availableLanguage: "es",
	url: opts.url,
});

export const faqNode = (url: string, faq: Faq[]) => ({
	"@type": "FAQPage",
	"@id": `${url}#faq`,
	mainEntity: faq.map((f) => ({
		"@type": "Question",
		name: f.question,
		acceptedAnswer: { "@type": "Answer", text: f.answer },
	})),
});

export const articleNode = (opts: {
	url: string;
	headline: string;
	description: string;
	published: string;
	modified: string;
	authorId: string;
	keywords?: string[];
}) => ({
	"@type": "Article",
	"@id": `${opts.url}#article`,
	headline: opts.headline,
	description: opts.description,
	inLanguage: SITE.locale,
	datePublished: isoDate(opts.published),
	dateModified: isoDate(opts.modified),
	author: { "@id": founderUrl(opts.authorId) },
	publisher: { "@id": ORG_ID },
	mainEntityOfPage: { "@id": `${opts.url}#webpage` },
	image: abs("/og-image.png"),
	...(opts.keywords?.length ? { keywords: opts.keywords.join(", ") } : {}),
});

export const graph = (nodes: object[]) =>
	JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
