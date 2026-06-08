export type Solution = {
	slug: string;
	title: string;
	copy: string;
	icon: string;
};

// Base catalogue shared by the /solutions overview and each /solutions/[slug]
// detail page. Rich SEO content per solution lives in ./solutions-content.json,
// keyed by slug.
export const solutions: Solution[] = [
	{
		slug: "erp",
		title: "ERP",
		copy: "Operaciones, finanzas y datos unificados.",
		icon: `<rect x="6" y="10" width="68" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
			<line x1="6" y1="22" x2="74" y2="22" stroke="currentColor" stroke-width="1.2"/>
			<line x1="28" y1="10" x2="28" y2="50" stroke="currentColor" stroke-width="1.2"/>
			<line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" stroke-width="1.2"/>
			<line x1="6" y1="36" x2="74" y2="36" stroke="currentColor" stroke-width="1.2"/>`,
	},
	{
		slug: "crm",
		title: "CRM",
		copy: "Relaciones, ventas y soporte a escala.",
		icon: `<circle cx="40" cy="22" r="9" fill="currentColor"/>
			<path d="M22 52 Q22 40 40 40 Q58 40 58 52 L58 56 L22 56 Z" fill="currentColor"/>`,
	},
	{
		slug: "automation",
		title: "Automatización",
		copy: "Workflows orquestados sin fricción.",
		icon: `<circle cx="28" cy="30" r="11" fill="none" stroke="currentColor" stroke-width="2"/>
			<circle cx="28" cy="30" r="3" fill="currentColor"/>
			<circle cx="54" cy="38" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
			<circle cx="54" cy="38" r="2" fill="currentColor"/>
			<line x1="28" y1="14" x2="28" y2="18" stroke="currentColor" stroke-width="2"/>
			<line x1="28" y1="42" x2="28" y2="46" stroke="currentColor" stroke-width="2"/>
			<line x1="12" y1="30" x2="16" y2="30" stroke="currentColor" stroke-width="2"/>
			<line x1="40" y1="30" x2="44" y2="30" stroke="currentColor" stroke-width="2"/>`,
	},
	{
		slug: "process",
		title: "Procesos",
		copy: "Throughput, calidad y trazabilidad.",
		icon: `<rect x="4" y="22" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>
			<rect x="32" y="22" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>
			<rect x="60" y="22" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>
			<line x1="24" y1="30" x2="32" y2="30" stroke="currentColor" stroke-width="1.4"/>
			<line x1="52" y1="30" x2="60" y2="30" stroke="currentColor" stroke-width="1.4"/>`,
	},
	{
		slug: "ai",
		title: "IA",
		copy: "Modelos integrados con guardrails.",
		icon: `<circle cx="14" cy="18" r="3" fill="currentColor"/>
			<circle cx="14" cy="42" r="3" fill="currentColor"/>
			<circle cx="40" cy="12" r="3" fill="currentColor"/>
			<circle cx="40" cy="30" r="3" fill="currentColor"/>
			<circle cx="40" cy="48" r="3" fill="currentColor"/>
			<circle cx="66" cy="30" r="3" fill="currentColor"/>
			<line x1="14" y1="18" x2="40" y2="12" stroke="currentColor" stroke-width="1"/>
			<line x1="14" y1="18" x2="40" y2="30" stroke="currentColor" stroke-width="1"/>
			<line x1="14" y1="42" x2="40" y2="30" stroke="currentColor" stroke-width="1"/>
			<line x1="14" y1="42" x2="40" y2="48" stroke="currentColor" stroke-width="1"/>
			<line x1="40" y1="12" x2="66" y2="30" stroke="currentColor" stroke-width="1"/>
			<line x1="40" y1="30" x2="66" y2="30" stroke="currentColor" stroke-width="1"/>
			<line x1="40" y1="48" x2="66" y2="30" stroke="currentColor" stroke-width="1"/>`,
	},
	{
		slug: "api",
		title: "API Gateway",
		copy: "Integración segura y observable.",
		icon: `<path d="M14 10 L8 30 L14 50" stroke="currentColor" fill="none" stroke-width="1.8" stroke-linecap="round"/>
			<path d="M66 10 L72 30 L66 50" stroke="currentColor" fill="none" stroke-width="1.8" stroke-linecap="round"/>
			<circle cx="28" cy="30" r="3" fill="currentColor"/>
			<circle cx="40" cy="30" r="3" fill="currentColor"/>
			<circle cx="52" cy="30" r="3" fill="currentColor"/>`,
	},
	{
		slug: "dashboards",
		title: "Dashboards",
		copy: "Decisiones en tiempo real.",
		icon: `<polyline points="8,50 24,30 40,38 56,16 72,28" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			<line x1="8" y1="54" x2="74" y2="54" stroke="currentColor" stroke-width="1"/>
			<circle cx="56" cy="16" r="2" fill="currentColor"/>`,
	},
	{
		slug: "data",
		title: "Análisis de Datos",
		copy: "Pipelines y analítica avanzada.",
		icon: `<line x1="8" y1="54" x2="74" y2="54" stroke="currentColor" stroke-width="1"/>
			<line x1="8" y1="54" x2="8" y2="8" stroke="currentColor" stroke-width="1"/>
			<circle cx="16" cy="46" r="2.5" fill="currentColor"/>
			<circle cx="24" cy="34" r="2.5" fill="currentColor"/>
			<circle cx="34" cy="40" r="2.5" fill="currentColor"/>
			<circle cx="44" cy="22" r="2.5" fill="currentColor"/>
			<circle cx="56" cy="32" r="2.5" fill="currentColor"/>
			<circle cx="66" cy="14" r="2.5" fill="currentColor"/>`,
	},
	{
		slug: "cloud",
		title: "Cloud Native",
		copy: "Arquitecturas elásticas multi-región.",
		icon: `<rect x="14" y="40" width="22" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>
			<rect x="44" y="40" width="22" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>
			<rect x="14" y="24" width="22" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>
			<rect x="44" y="24" width="22" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>
			<rect x="29" y="8" width="22" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/>`,
	},
	{
		slug: "cyber",
		title: "Ciberseguridad",
		copy: "Identidad, datos e infraestructura.",
		icon: `<path d="M40 8 L66 18 L66 36 Q66 50 40 58 Q14 50 14 36 L14 18 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
			<path d="M30 32 L38 40 L52 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`,
	},
	{
		slug: "consulting",
		title: "Consultoría",
		copy: "Acompañamiento end-to-end.",
		icon: `<circle cx="40" cy="16" r="6" fill="currentColor"/>
			<rect x="33" y="26" width="14" height="22" rx="2" fill="currentColor"/>
			<line x1="20" y1="34" x2="33" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			<line x1="60" y1="34" x2="47" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
	},
];

export const solutionsBySlug: Record<string, Solution> = Object.fromEntries(
	solutions.map((s) => [s.slug, s]),
);
