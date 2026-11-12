// Datos de identidad de la marca. Fuente única para metadatos, datos
// estructurados (JSON-LD), llms.txt y sitemap: lo que diga aquí es lo que leen
// buscadores y asistentes de IA, así que debe ser exacto y coherente.
export const SITE = {
	url: "https://www.railconsulting.es",
	name: "RAIL Consulting",
	shortName: "RAIL",
	tagline: "Ingeniería del futuro",
	// Frase de identidad: quién es, qué hace, para quién y dónde.
	description:
		"RAIL Consulting es una consultora de ingeniería de Sevilla que estudia cómo trabaja una empresa, detecta dónde se pierde tiempo y lo recupera con inteligencia artificial, automatización y software a medida.",
	email: "contacto@railconsulting.es",
	locale: "es-ES",
	city: "Sevilla",
	region: "Andalucía",
	country: "ES",
	sameAs: ["https://github.com/RAIL-Consulting-ES"],
	knowsAbout: [
		"Inteligencia artificial aplicada a empresas",
		"Automatización de procesos de negocio",
		"Agentes de IA",
		"Análisis y optimización de procesos",
		"Software a medida",
		"ERP a medida",
		"CRM a medida",
		"Integración de sistemas mediante API",
		"Análisis de datos",
		"Cuadros de mando",
	],
} as const;

export type Founder = {
	id: string;
	name: string;
	role: string;
	jobTitle: string;
	bio: string;
	focus: string[];
	education: string;
	linkedin: string;
	photo: string;
};

export const FOUNDERS: Founder[] = [
	{
		id: "mario-pantoja",
		name: "Mario Pantoja Castro",
		role: "Co-CEO y cofundador · IA y ciencia de datos",
		jobTitle: "Co-CEO y cofundador",
		bio: "Matemático y estadístico por la Universidad de Sevilla (doble grado), especializado en inteligencia artificial y ciencia de datos. En RAIL diseña los modelos, los agentes de IA y el análisis de datos de cada proyecto.",
		focus: ["Inteligencia artificial", "Ciencia de datos", "Estadística"],
		education: "Universidad de Sevilla",
		linkedin: "https://www.linkedin.com/in/mario-pantoja-castro/",
		photo: "mario",
	},
	{
		id: "david-gutierrez",
		name: "David Gutiérrez",
		role: "Co-CEO y cofundador · Software y business analytics",
		jobTitle: "Co-CEO y cofundador",
		bio: "Desarrollador de software full stack, formado en Data & Business Analytics en la Universidad Loyola. En RAIL estudia los procesos de cada empresa y construye las automatizaciones y el software que los resuelven.",
		focus: ["Desarrollo de software", "Automatización", "Business analytics"],
		education: "Universidad Loyola",
		linkedin: "https://www.linkedin.com/in/davidgutierreez/",
		photo: "david",
	},
];

export const founderUrl = (id: string) => `${SITE.url}/nosotros/#${id}`;

/** URL absoluta a partir de una ruta interna ("/soluciones/"). */
export const abs = (path: string) => new URL(path, SITE.url).href;
